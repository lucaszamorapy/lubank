import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { RiLogoutBoxLine } from "react-icons/ri";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import { getExpenseByUserId } from "../../functions";
import { FiPlusCircle } from "react-icons/fi";
import ExpenseModal from "../modals/ExpenseModal";
import { useExpense } from "../../contexts/ExpensesContext";
import "react-toastify/dist/ReactToastify.css";
import ExpensesGrid from "./ExpensesGrid";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, logout, userId } = useAuth();
  const { expenses, setExpenses } = useExpense();

  useEffect(() => {
    if (user) {
      toast.success(`Seja bem-vindo de volta ${user}!`);
    }
  }, [user]);

  useEffect(() => {
    const fetchExpenses = async (userId: number | null) => {
      if (userId) {
        const expenseUserData = await getExpenseByUserId(userId);
        setExpenses(expenseUserData);
      }
    };

    fetchExpenses(userId);
  }, [setExpenses, userId]);

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

  const modalIsOpen = () => {
    setModalOpen(!modalOpen);
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
          <div className="flex gap-10">
            <Button
              onClick={modalIsOpen}
              buttonText={<FiPlusCircle size={27} />}
              style={"text-white"}
            />
            <Button
              onClick={logout}
              buttonText={<RiLogoutBoxLine size={27} />}
              style={"text-white"}
            />
          </div>
        </div>
        {expenses.length > 0 ? (
          <ExpensesGrid expenses={expenses} />
        ) : (
          <p className="text-center text-gray-400 mt-20">
            Não contém nenhum gasto efetuado
          </p>
        )}
        {modalOpen && <ExpenseModal onClick={modalIsOpen} isOpen={modalOpen} />}
      </div>
    </>
  );
};

export default HomePage;
