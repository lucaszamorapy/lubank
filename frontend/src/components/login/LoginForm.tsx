import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const user = useForm("name");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!user.value || !password) {
        toast.error("Preencha os dados obrigatórios!");
        setLoading(false);
        return;
      }
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
    <form
      className="flex p-5 flex-col mt-20 gap-10 lg:px-0"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-purpleLubank text-4xl font-semibold">
          Bem vindo(a)
        </h1>
        <p className="text-gray-300">
          Você não está conectado, precisa fazer o login para continuar
        </p>
      </div>
      <Input
        label={"Usuário"}
        placeholder="Digite seu usuário"
        style={"px-5 w-full"}
        {...user}
      />
      <div className="relative w-full">
        <Input
          label={"Senha"}
          placeholder="Digite sua senha"
          style={"px-5 w-full"} // Ajuste o padding-right para deixar espaço para o ícone
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
        buttonText={loading ? <Loading /> : "Entrar"}
        type="submit"
        disabled={loading}
        style={"text-white rounded-full w-full "}
      />
      <p>
        Ainda não tem uma conta na LuBank?{" "}
        <Link className="font-bold text-purpleLubank" to={"/register"}>
          Cadastre-se agora!
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
