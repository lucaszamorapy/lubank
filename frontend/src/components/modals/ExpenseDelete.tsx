import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import { deleteExpense } from "../../functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IExpense, useExpense } from "../../contexts/ExpensesContext";

type ExpensesProps = {
  onClick?: () => void;
  isOpen: boolean;
  month: IExpense[];
};

const ExpenseDelete = ({ onClick, isOpen, month }: ExpensesProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");
  const [monthDelete, setMonthDelete] = useState([""]);
  const { userId } = useAuth();
  const { expenses, setExpenses } = useExpense();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("modal-content-enter");
    }
    const monthDeleteName = month.map((item) => item.month_name);
    setMonthDelete(monthDeleteName);
  }, [isOpen, month]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
      setAnimationClass("modal-content-exit");
    }
  };

  const handleDelete = async (monthName: string[], userId: number | null) => {
    if (userId === null) {
      toast.error("Erro: Usuário não encontrado.");
      return;
    }
    try {
      await deleteExpense(monthName, userId);
      toast.success("Despesa deletada com sucesso");
      const updatedExpenses = expenses.filter(
        (expense) => !monthName.includes(expense.month_name)
      );
      setExpenses(updatedExpenses);
      if (onClick) {
        onClick();
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar a despesa");
    }
  };

  return (
    <section
      onClick={onClick}
      className="fixed inset-0 px-5 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {isVisible && (
        <div
          className={`bg-white border-2 border-gray-200 p-4 rounded-md  ${animationClass}`}
          onAnimationEnd={handleAnimationEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl font-semibold text-purpleContabilize">
            {`Tem certeza que deseja deletar esta despesa?`}
          </h1>
          <div className="flex flex-col mt-10 justify-between lg:flex-row">
            <Button
              buttonText={"Não, não desejo"}
              style={"text-white"}
              onClick={onClick}
            />
            <Button
              buttonText={"Sim, tenho certeza"}
              style={"text-white"}
              onClick={() => handleDelete(monthDelete, userId)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpenseDelete;
