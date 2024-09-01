import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getExpenseByUserId } from "../../functions";
import { useExpense } from "../../contexts/ExpensesContext";
import "react-toastify/dist/ReactToastify.css";
import ExpensesGrid from "./ExpensesGrid";
import Greetings from "../Greetings";

const HomePage = () => {
  const { userId } = useAuth();
  const { expenses, setExpenses } = useExpense();

  useEffect(() => {
    const fetchExpenses = async (userId: number | null) => {
      if (userId) {
        const expenseUserData = await getExpenseByUserId(userId);
        setExpenses(expenseUserData);
      }
    };

    fetchExpenses(userId);
  }, [setExpenses, userId]);

  return (
    <>
      <div className="container">
        <Greetings home={true} />
        {expenses.length > 0 ? (
          <ExpensesGrid expenses={expenses} />
        ) : (
          <p className="text-center text-gray-400 mt-20">
            Não contém nenhum gasto efetuado
          </p>
        )}
      </div>
    </>
  );
};

export default HomePage;
