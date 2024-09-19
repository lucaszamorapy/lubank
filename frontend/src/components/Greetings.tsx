import { toast, ToastContainer } from "react-toastify";
import Button from "../utils/Button";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import ExpenseModal from "./modals/ExpenseModal";
import { TbTextPlus } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import Icon from "@mdi/react";
import { mdiPlaylistPlus } from "@mdi/js";

interface GreetingsProps {
  home?: boolean;
}

const Greetings = ({ home }: GreetingsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { userInfo } = useAuth();

  const modalIsOpen = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (userInfo?.username && home) {
      toast.success(`Seja bem-vindo de volta ${userInfo.username}!`);
    }
  }, [userInfo?.username, home]);

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
          <div className="flex flex-col justify-between gap-10 items-center md:flex-row">
            {userInfo?.avatar ? (
              <img
                className="w-20 h-20 rounded-full"
                src={`http://localhost:8081/${userInfo?.avatar}`}
                alt="Imagem do usuário"
              />
            ) : (
              <FaCircleUser size={50} color="6A00AB" />
            )}

            <div className="flex flex-col gap-2 md:flex-row">
              <p className="text-lg">{getGreeting()},</p>
              <p className="text-xl font-semibold text-purpleLubank">
                {userInfo?.username}
              </p>
            </div>
          </div>
          {home && (
            <>
              <div className="flex gap-10">
                <Button
                  onClick={modalIsOpen}
                  buttonText={<Icon path={mdiPlaylistPlus} size={1.5} />}
                  style={
                    "text-purpleLubank bg-white hover:bg-white hover:text-purple-950"
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
