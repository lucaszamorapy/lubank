import { useState } from "react";
import useForm from "../../../hooks/useForm";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import Loading from "../../../helper/loading/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRequestForgotPassword } from "../../../functions";

const RequestForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const email = useForm("email");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!email.value) {
        toast.error("Preencha os dados obrigatórios!");
        setLoading(false);
        return;
      }
      await createRequestForgotPassword({ email: email.value });
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error("E-mail inválido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex p-5 flex-col mt-20 gap-10 lg:px-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-purpleLubank text-2xl font-semibold lg:text-4xl">
          Esqueci minha senha
        </h1>
        <p className="text-sm text-gray-300 lg:text-lg">
          Preencha o campo abaixo com seu e-mail
        </p>
      </div>
      <Input
        label={"E-mail"}
        placeholder="Digite seu e-mail"
        style={"px-5 w-full"}
        {...email}
      />
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

export default RequestForgotPasswordForm;
