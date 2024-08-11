import PeopleSmile from "/images/peoples_smile.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  return (
    <section className="px-5 lg:px-0">
      <div className="container mt-20">
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
        <div className="flex flex-col gap-10  bg-white rounded-md border-2 border-gray-200 items-center lg:flex-row lg:gap-32">
          <img
            src={PeopleSmile}
            className="lg:w-[500px]  lg:rounded-l-md"
            alt="Pessoas sorrindo"
          />
          <RegisterPage />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
