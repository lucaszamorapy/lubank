import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import { deleteExpense, getExpenseByUserId } from "../../functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../../contexts/ExpensesContext";

type ExpensesProps = {
  onClick?: () => void;
  isOpen: boolean;
  month: number;
  year: number;
};

const ExpenseDelete = ({ onClick, isOpen, month, year }: ExpensesProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");
  const { userInfo } = useAuth();
  const { setExpenses } = useExpense();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("modal-content-enter");
    }
  }, [isOpen, month]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
      setAnimationClass("modal-content-exit");
    }
  };

  const handleDelete = async (
    userId: number | null | undefined,
    monthId: number,
    year: number
  ) => {
    if (userId === null) {
      toast.error("Erro: Usuário não encontrado.");
      return;
    }

    try {
      await deleteExpense(userInfo?.id, monthId, year);
      toast.success("Despesa deletada com sucesso");
      const expenseUserData = await getExpenseByUserId(userInfo?.id);
      setExpenses(expenseUserData);
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
          <h1 className="text-xl font-semibold text-purpleLubank">
            {`Tem certeza que deseja deletar esta despesa?`}
          </h1>
          <div className="flex flex-col mt-10 justify-between lg:flex-row">
            <Button
              buttonText={"Não, não desejo"}
              style={"text-white px-5"}
              onClick={onClick}
            />
            <Button
              buttonText={"Sim, tenho certeza"}
              style={"text-white px-5"}
              onClick={() => handleDelete(userInfo?.id, month, year)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpenseDelete;
