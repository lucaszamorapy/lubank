import { useState } from "react";
import PeopleSmile from "/images/peoples_smile.png";
import LogoPurple from "/images/logo2.svg";
import { useAuth } from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/Loading";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageLogin = () => {
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
    <section className="px-5 lg:px-0">
      <ToastContainer
        autoClose={5000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mt-20">
        <div className="flex flex-col gap-10  bg-white rounded-md border-2 border-gray-200 items-center lg:flex-row lg:gap-32">
          <img
            src={PeopleSmile}
            className="lg:w-[500px]  lg:rounded-l-md"
            alt="Pessoas sorrindo"
          />
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <img src={LogoPurple} alt="" />
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
              style={
                "text-white rounded-full w-full hover:bg-[#9E78B5] duration-300"
              }
            />
            <p>
              Ainda não tem uma conta no Contabilze?{" "}
              <Link
                className="font-bold text-purpleContabilize"
                to={"/register"}
              >
                Cadastre-se agora!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageLogin;
