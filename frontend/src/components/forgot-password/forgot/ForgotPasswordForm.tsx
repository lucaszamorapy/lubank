import { useEffect, useState } from "react";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import Loading from "../../../helper/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createForgotPassword } from "../../../functions";
import Icon from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";

export interface ForgotPasswordFormProps {
  token: string | undefined;
}

const ForgotPasswordForm = ({ token }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!password) {
        toast.error("Preencha os dados obrigatórios!");
        setLoading(false);
        return;
      }
      await createForgotPassword(token, { password });
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <form
      className="flex p-5 flex-col mt-20 gap-10 lg:px-5 lg:w-[423px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-purpleLubank text-2xl font-semibold lg:text-4xl">
          Redefinição senha
        </h1>
        <p className="text-sm text-gray-300 lg:text-lg">
          Preencha o campo abaixo com a sua nova senha
        </p>
      </div>
      <div className="relative w-full">
        <Input
          label={"Nova senha"}
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
        buttonText={loading ? <Loading /> : "Enviar"}
        type="submit"
        disabled={loading}
        style={"text-white rounded-full w-full "}
      />
      <p className="text-sm">
        Lembrou da sua senha na LuBank?{" "}
        <Link className="font-bold text-purpleLubank" to={"/login"}>
          Entrar agora!
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
