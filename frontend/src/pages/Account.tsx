import AccountPage from "../components/account/AccountPage";
import Header from "../components/header/Header";
import Head from "../helper/Head";

const Account = () => {
  return (
    <>
      <Header />
      <Head
        title="Conta"
        description="Página para alterar os dados da sua conta Lubank"
      />
      <section className="px-5 lg:px-0">
        <AccountPage />
      </section>
    </>
  );
};

export default Account;
