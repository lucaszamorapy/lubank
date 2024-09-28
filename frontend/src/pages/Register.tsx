import RegisterPage from "../components/register/RegisterPage";
import Head from "../helper/Head";

const Register = () => {
  return (
    <>
      <Head title="Cadastra-se" description="Cadastro da sua conta Lubank" />
      <section>
        <RegisterPage />
      </section>
    </>
  );
};

export default Register;
