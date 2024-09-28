import { useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/loading/Loading";
import { createUser } from "../../composables/user/useUser";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useForm("name");
  const email = useForm("email");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!user.value || !email.value || !password) {
        toast.error("Preencha os dados obrigatórios!");
        setLoading(false);
        return;
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      let fileExtension = "";

      if (file) {
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
      formData.append("username", user.value);
      formData.append("email", email.value);
      formData.append("password", password);
      console.log(password);
      if (file) {
        formData.append("avatar", file);
      }
      await createUser(formData);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error: unknown) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <form
      className="flex p-5 flex-col mt-5 gap-5 lg:p-0 lg:w-[423px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-purpleLubank text-4xl font-semibold">
          Bem vindo(a)
        </h1>
        <p className="text-gray-300">
          Você não esta conectado, precisa fazer o registro para continuar
        </p>
      </div>
      <Input
        label={"Avatar"}
        type="file"
        accept="image/*"
        style={"px-5 w-full"}
        onChange={handleFileChange}
        className="px-5 w-full lg:w-[454px] py-3 border-2 border-gray-200 rounded-md outline-none"
      />
      <Input
        label={"Usuário"}
        placeholder="Digite seu usuário"
        style={"px-5 w-full "}
        {...user}
      />
      <Input
        label={"E-mail"}
        placeholder="Digite seu e-mail"
        style={"px-5 w-full "}
        {...email}
      />
      <div className="relative w-full">
        <Input
          label={"Senha"}
          placeholder="Digite sua senha"
          style={"px-5 w-full "}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={`${viewPassword ? "text" : "password"}`}
        />
        <Button
          buttonText={
            viewPassword ? (
              <Icon path={mdiEyeOffOutline} size={1} />
            ) : (
              <Icon path={mdiEyeOutline} size={1} />
            )
          }
          onClick={() => setViewPassword(!viewPassword)}
          type="button"
          style="absolute right-2 top-[58px] px-5 transform -translate-y-1/2 bg-transparent text-gray-500 hover:bg-transparent focus:outline-none"
        />
      </div>
      <Button
        buttonText={loading ? <Loading /> : "Cadastrar"}
        type="submit"
        disabled={loading}
        style={"text-white rounded-full w-full "}
      />
      <p>
        Já possui uma conta no Contabilze?{" "}
        <Link className="font-bold text-purpleLubank" to={"/login"}>
          Entre agora!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
