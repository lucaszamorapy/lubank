import Head from "../helper/Head";
import ForgotPasswordPage from "../components/forgot-password/forgot/ForgotPasswordPage";

export const ForgotPassword = () => {
  return (
    <>
      <Head
        title="Redefinição de senha"
        description="Redefinição de senha da sua conta Lubank"
      />
      <section>
        <ForgotPasswordPage />
      </section>
    </>
  );
};
