import { useState } from "react";
import LogoPurple from "/images/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLogin = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const user = useForm("name");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(user.value, password);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error("Usuário não encontrado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="bg-purpleContabilize flex justify-center rounded-md items-center p-4">
        <img src={LogoPurple} alt="" />
      </div>
      <Input
        placeholder="Usuário"
        style={"border-b-2 border-purpleContabilize px-5 w-full"}
        {...user}
      />
      <Input
        placeholder="Senha"
        style={"border-b-2 border-purpleContabilize px-5 w-full "}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <Button
        buttonText={loading ? <Loading /> : "Entrar"}
        type="submit"
        style={"text-white rounded-full w-full "}
      />
      <p>
        Ainda não tem uma conta na LuBank?{" "}
        <Link className="font-bold text-purpleContabilize" to={"/register"}>
          Cadastre-se agora!
        </Link>
      </p>
    </form>
  );
};

export default FormLogin;
