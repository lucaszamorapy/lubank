import { ToastContainer } from "react-toastify";
import { RiLogoutBoxLine } from "react-icons/ri";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const StatisticPage = () => {
  const { user, logout } = useAuth();

  const getGreeting = (): string => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Bom dia";
    } else if (currentHour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <>
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
      <div className="container">
        <div className="flex py-5 justify-between border-2 px-10 mb-10 bg-white rounded-md mt-36 border-gray-200 xl:mt-10">
          <div className="flex flex-col">
            <p className="text-lg">{getGreeting()},</p>
            <p className="text-xl font-semibold text-purpleContabilize">
              {user}
            </p>
          </div>

          <Button
            onClick={logout}
            buttonText={<RiLogoutBoxLine size={27} />}
            style={"text-white"}
          />
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
