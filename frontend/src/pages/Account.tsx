import AccountPage from "../components/account/AccountPage";
import Header from "../components/header/Header";

const Account = () => {
  return (
    <>
      <Header />
      <section className="px-5 lg:px-0">
        <AccountPage />
      </section>
    </>
  );
};

export default Account;
