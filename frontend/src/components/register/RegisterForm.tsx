import { useEffect, useState } from "react";
import LogoPurple from "/images/logo.svg";
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
    try {
      setLoading(true);
      const userData = {
        username: user.value,
        email: email.value,
        password,
        avatar: file,
        role_name: select,
      };
      console.log(userData);
      await createUser(userData);
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error("O e-mail ou o usuário já possui uma conta!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit}>
      <div className="bg-purpleContabilize flex justify-center rounded-md items-center w-full p-4">
        <img src={LogoPurple} alt="" />
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
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        style="px-5 w-full lg:w-[454px]"
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
