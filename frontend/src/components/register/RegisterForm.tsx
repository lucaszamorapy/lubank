import { useEffect, useState } from "react";
import LogoPurple from "/images/VetorizadoBrancoSemFundo.svg";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/Loading";
import { createUser, getRoles } from "../../functions";
import Select from "../../utils/Select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [roles, setRoles] = useState([]);
  const [select, setSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useForm("name");
  const email = useForm("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (err) {
        toast.error("Cargos não encontrados");
      }
    };

    fetchRoles();
  }, []);

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
      formData.append("role_name", select);

      if (file) {
        formData.append("avatar", file);
      }

      await createUser(formData);
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast.error("Ocorreu um erro ao cadastrar o usuário!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit}>
      <div className="bg-purpleContabilize flex justify-center rounded-md items-center w-full ">
        <img className="w-20" src={LogoPurple} alt="" />
      </div>
      <Input
        placeholder="Usuário"
        style={"px-5 w-full lg:w-[454px]"}
        {...user}
      />
      <Input
        placeholder="E-mail"
        style={"px-5 w-full lg:w-[454px]"}
        {...email}
      />
      <Input
        type="file"
        accept="image/*"
        style={"px-5 w-full lg:w-[454px]"}
        onChange={handleFileChange}
        className="px-5 w-full lg:w-[454px] py-3 border-2 border-gray-200 rounded-md outline-none"
      />
      <Select
        value={select}
        item={roles}
        style={"w-[454px]"}
        onChange={(e) => setSelect(e.target.value)}
      />
      <Input
        placeholder="Senha"
        style={"px-5 w-full lg:w-[454px]"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <Button
        buttonText={loading ? <Loading /> : "Cadastrar"}
        type="submit"
        disabled={loading}
        style={"text-white rounded-full w-full"}
      />
      <p>
        Já possui uma conta no Contabilze?{" "}
        <Link className="font-bold text-purpleContabilize" to={"/login"}>
          Entre agora!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
