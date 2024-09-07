import { toast, ToastContainer } from "react-toastify";
import Button from "../utils/Button";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import ExpenseModal from "./modals/ExpenseModal";
import { TbTextPlus } from "react-icons/tb";

interface GreetingsProps {
  home?: boolean;
}

const Greetings = ({ home }: GreetingsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, userAvatar } = useAuth();

  const modalIsOpen = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (user && home) {
      toast.success(`Seja bem-vindo de volta ${user}!`);
    }
  }, [user, home]);

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
    <div>
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
          <div className="flex justify-between gap-10 items-center">
            <img
              className="w-20 rounded-full"
              src={`http://localhost:8081/${userAvatar}`}
              alt=""
            />
            <div className="flex gap-2">
              <p className="text-lg">{getGreeting()},</p>
              <p className="text-xl font-semibold text-purpleContabilize">
                {user}
              </p>
            </div>
          </div>
          {home && (
            <>
              <div className="flex gap-10">
                <Button
                  onClick={modalIsOpen}
                  buttonText={<TbTextPlus size={40} />}
                  style={
                    "text-purpleContabilize bg-white hover:bg-white hover:text-purple-950"
                  }
                />
              </div>
              {modalOpen && (
                <ExpenseModal onClick={modalIsOpen} isOpen={modalOpen} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Greetings;
