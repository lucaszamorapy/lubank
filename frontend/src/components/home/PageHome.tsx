import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { RiLogoutBoxLine } from "react-icons/ri";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";

const PageHome = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      toast.success(`Seja bem-vindo de volta ${user}!`);
    }
  }, [user]);

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
        autoClose={5000} // Tempo em milissegundos para o toast desaparecer automaticamente
        position="top-right" // Posição do toast
        hideProgressBar={false} // Mostrar barra de progresso
        newestOnTop={false} // Exibir o mais novo no topo
        closeOnClick // Fechar ao clicar no toast
        rtl={false} // Direção do texto
        pauseOnFocusLoss // Pausar a exibição do toast quando a página perde o foco
        draggable // Permitir arrastar o toast
        pauseOnHover // Pausar a exibição do toast quando o mouse passa sobre ele
      />
      <div className="container">
        <div className="flex py-5 justify-between border-2 px-10  bg-white rounded-md mt-36 border-gray-200 xl:mt-10">
          <div className="flex flex-col">
            <p className="text-lg">{getGreeting()},</p>
            <p className="text-xl font-semibold text-purpleContabilize">
              {user}
            </p>
          </div>
          <Button
            className="bg-black"
            onClick={logout}
            buttonText={<RiLogoutBoxLine size={27} />}
            style={"text-white"}
          />
        </div>
      </div>
    </>
  );
};

export default PageHome;
