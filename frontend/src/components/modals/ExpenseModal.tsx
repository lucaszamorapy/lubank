import { useEffect, useState } from "react";
import ExpensesForm from "../home/ExpensesForm";
import { IExpense } from "../../contexts/ExpensesContext";

type ExpensesProps = {
  onClick: () => void;
  isOpen: boolean;
  update?: IExpense[];
};

const ExpenseModal = ({ onClick, isOpen, update }: ExpensesProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("modal-content-enter");
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
      setAnimationClass("modal-content-exit");
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
            Informe abaixo os gastos do mês
          </h1>
          <ExpensesForm update={update} toggleModal={onClick} />
        </div>
      )}
    </section>
  );
};

export default ExpenseModal;
