import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/loading/Loading";
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex p-5 flex-col mt-20 gap-10 lg:px-5 lg:w-[423px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-purpleLubank text-2xl font-semibold lg:text-4xl">
          Bem vindo(a)
        </h1>
        <p className="text-sm text-gray-300 lg:text-lg">
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
          style={"px-5 w-full"}
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
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Ainda não tem uma conta?{" "}
          <Link className="font-bold text-purpleLubank" to={"/register"}>
            Cadastre-se agora!
          </Link>
        </p>
        <p className="text-sm">
          Esqueceu sua senha?{" "}
          <Link
            className="font-bold text-purpleLubank"
            to={"/request-forgot-password"}
          >
            Esqueci minha senha
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
