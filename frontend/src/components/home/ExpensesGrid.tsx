import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IExpense } from "../../contexts/ExpensesContext";
import Button from "../../utils/Button";
import { useState } from "react";
import ExpenseDelete from "../modals/ExpenseDelete";

type ExpensesGridProps = {
  expenses: IExpense[];
};

const groupExpensesByMonth = (expenses: IExpense[]) => {
  return expenses.reduce((acc, expense) => {
    const { month_name, amount, description } = expense;
    if (!acc[month_name]) {
      acc[month_name] = [];
    }
    acc[month_name].push({ amount, description });
    return acc;
  }, {} as Record<string, { amount: string; description: string }[]>);
};

const ExpensesGrid = ({ expenses }: ExpensesGridProps) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const groupedExpenses = groupExpensesByMonth(expenses);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const toggleModalDelete = () => {
    setModalDeleteOpen(!modalDeleteOpen);
  };

  const calculateTotal = (
    expenses: { amount: string; description: string }[]
  ) => {
    return expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );
  };

  return (
    <div>
      {Object.entries(groupedExpenses).map(
        (
          [month, expenses] // object.entries transforma em um array de pares [chave, valor]
        ) => (
          <div
            key={month}
            className="flex flex-col w-full bg-white border-2 border-gray-200 rounded-md px-10 py-5"
          >
            <div className="flex justify-between items-center border-b-2 pb-5">
              <h3 className=" text-xl font-semibold text-purpleContabilize">
                {month}
              </h3>
              <div className="flex gap-5">
                <Button
                  buttonText={<FaRegEdit size={20} />}
                  style={"text-white"}
                />
                <Button
                  onClick={() => toggleModalDelete()}
                  buttonText={<AiOutlineDelete size={20} />}
                  style={"text-white"}
                />
                {modalDeleteOpen && (
                  <ExpenseDelete
                    onClick={toggleModalDelete}
                    isOpen={modalDeleteOpen}
                    month={month}
                  />
                )}
              </div>
            </div>
            {expenses.map((expense, index) => (
              <div key={index} className="flex flex-col pt-5 items-center">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg">{expense.description}</p>
                  <p className="font-semibold">
                    {formatCurrency(parseFloat(expense.amount))}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-10">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-semibold text-lg">
                {formatCurrency(calculateTotal(expenses))}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ExpensesGrid;
