import React from "react";
import Greetings from "../Greetings";
import AccountForm from "./AccountForm";

const AccountPage = () => {
  return (
    <section>
      <div className="container">
        <Greetings />
        <AccountForm />
      </div>
    </section>
  );
};

export default AccountPage;
