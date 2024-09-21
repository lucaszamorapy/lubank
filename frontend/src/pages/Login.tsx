import LoginPage from "../components/login/LoginPage";
import Head from "../helper/Head";

const Login = () => {
  return (
    <>
      <Head title="Login" description="Login da sua conta Lubank" />
      <section className="animeLeft">
        <LoginPage />
      </section>
    </>
  );
};

export default Login;
