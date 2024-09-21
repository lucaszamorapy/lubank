import React, { useEffect, useState } from "react";
import Loading from "../../helper/loading/Loading";
import Input from "../../utils/Input";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../utils/Button";
import { updateUser } from "../../functions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AccountForm = () => {
  const [loading, setLoading] = useState<boolean>();
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File | null | undefined>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const name = useForm("name");
  const email = useForm("email");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  useEffect(() => {
    if (userInfo && isInitialLoad) {
      name.setValue(userInfo?.username);
      email.setValue(userInfo?.email);
      setIsInitialLoad(false);
    }
  }, [userInfo, name, email, isInitialLoad]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (password == "") {
      toast.error("Confirme a senha ou mude por favor");
      setLoading(false);
      return;
    }
    try {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      let fileExtension = "";

      if (file) {
        console.log(file);
        fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          toast.error(
            "Tipo de arquivo não permitido. Permita apenas arquivos .jpg, .jpeg, .png"
          );
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append("username", name.value);
      formData.append("email", email.value);
      formData.append("password", password);
      if (file) {
        formData.append("avatar", file);
      }
      await updateUser(userInfo?.id, formData);
      toast.success("Usuário alterado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast.error("Usuário ou e-mail já existe");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center gap-7 justify-center">
          <h1 className="text-purpleLubank text-2xl font-semibold">
            Configurações da sua conta
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex bg-white shadow-md rounded-md border-2 border-gray-200 px-10 py-5 flex-col gap-5">
              <Input
                label={"Avatar"}
                type="file"
                accept="image/*"
                style={"px-5 w-full lg:w-[454px]"}
                onChange={handleFileChange}
                className="px-5 w-full lg:w-[454px] py-3 border-2 border-gray-200 rounded-md outline-none"
              />
              <Input
                label={"Usuário"}
                placeholder="Digite seu usuário"
                style={"px-5 w-full"}
                {...name}
              />
              <Input
                label={"E-mail"}
                placeholder="Digite seu e-mail"
                style={"px-5 w-full lg:w-[454px]"}
                {...email}
              />
              <Input
                label={"Senha"}
                placeholder="Digite sua senha"
                style={"px-5 w-full "}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
              <Button
                type="submit"
                buttonText={loading ? <Loading /> : "Salvar alterações"}
                style={"text-white rounded-full w-full"}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountForm;
