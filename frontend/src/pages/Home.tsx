import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Button from "../utils/Button";

const Home = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      toast.success(`Seja bem-vindo de volta ${user}!`);
    }
  }, [user]);

  return (
    <section className="px-5 lg:px-0">
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
        <Button
          className="bg-black"
          onClick={logout}
          buttonText={"Sair"}
          style={"text-white"}
        />
      </div>
    </section>
  );
};

export default Home;
