import { useEffect, useState } from "react";
import PeopleSmile from "/images/peoples_smile.png";
import LogoPurple from "/images/logo2.svg";
import useForm from "../../hooks/useForm";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Loading from "../../helper/Loading";
import { createUser, getRoles } from "../../functions";
import Select from "../../utils/Select";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageRegister = () => {
  const [password, setPassword] = useState("");
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
        console.log(rolesData);
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
        role_name: select,
      };
      await createUser(userData);
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error("O e-mail já tem uma conta!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="container mt-20">
        <ToastContainer />
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
              style={
                "border-b-2 border-purpleContabilize px-5 w-full w-[454px]"
              }
              {...user}
            />
            <Input
              placeholder="E-mail"
              style={
                "border-b-2 border-purpleContabilize px-5 w-full w-[454px]"
              }
              {...email}
            />
            <Select
              value={select}
              item={roles}
              style={"w-[454px]"}
              onChange={(e) => setSelect(e.target.value)}
            />
            <Input
              placeholder="Senha"
              style={
                "border-b-2 border-purpleContabilize px-5 w-full w-[454px]"
              }
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <Button
              buttonText={loading ? <Loading /> : "Cadastrar"}
              type="submit"
              style={
                "text-white rounded-full w-full hover:bg-[#9E78B5] duration-300"
              }
            />
            <p>
              Já possui uma conta no Contabilze?{" "}
              <Link className="font-bold text-purpleContabilize" to={"/login"}>
                Entre agora!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageRegister;
