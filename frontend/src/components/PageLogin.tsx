import { useState } from "react";
import useForm from "../hooks/useForm";
import Input from "../utils/Input";
import PeopleSmile from "/images/peoples_smile.png";
import LogoPurple from "/images/logo2.svg";
import Button from "../utils/Button";
import Loading from "../helper/Loading";

const PageLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useForm("name");
  const email = useForm("email");
  return (
    <section className="px-5 lg:px-0">
      <div className="container mt-20">
        <div className="flex flex-col gap-10  bg-white rounded-md border-2 border-gray-200 items-center lg:flex-row lg:gap-32">
          <img
            src={PeopleSmile}
            className="lg:w-[500px] "
            alt="Pessoas sorrindo"
          />
          <form className="flex flex-col gap-10">
            <img src={LogoPurple} alt="" />
            <Input
              placeholder="Usuário"
              style={
                "border-b-2 border-purpleContabilize px-5 w-full lg:w-[400px]"
              }
              {...user}
            />
            <Input
              placeholder="E-mail"
              style={
                "border-b-2 border-purpleContabilize px-5 w-full lg:w-[400px]"
              }
              {...email}
            />
            <Input
              placeholder="Senha"
              style={
                "border-b-2 border-purpleContabilize px-5 w-full lg:w-[400px]"
              }
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageLogin;
