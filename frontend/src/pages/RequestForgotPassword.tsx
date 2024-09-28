import RequestForgotPasswordPage from "../components/forgot-password/request/RequestForgotPasswordPage";
import Head from "../helper/Head";

const RequestForgotPassword = () => {
  return (
    <>
      <Head
        title="Esqueci minha senha"
        description="Requisição de redefinição da senha da conta Lubank"
      />
      <section>
        <RequestForgotPasswordPage />
      </section>
    </>
  );
};

export default RequestForgotPassword;
