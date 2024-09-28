import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  deleteExpense,
  getExpenseByUserId,
} from "../../composables/expenses/useExpenses";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../../contexts/ExpensesContext";
import Loading from "../../helper/loading/Loading";

type ExpensesProps = {
  onClick?: () => void;
  isOpen: boolean;
  month: number;
  year: number;
};

const ExpenseDelete = ({ onClick, isOpen, month, year }: ExpensesProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await deleteExpense(userInfo?.id, monthId, year);
      const expenseUserData = await getExpenseByUserId(userInfo?.id);
      setExpenses(expenseUserData.data);
      if (onClick) {
        onClick();
      }
    } catch (error: unknown) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
              buttonText={loading ? <Loading /> : "Sim, tenho certeza"}
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
