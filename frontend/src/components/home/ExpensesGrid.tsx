import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IExpense } from "../../contexts/ExpensesContext";
import Button from "../../utils/Button";
import { useState } from "react";
import ExpenseDelete from "../modals/ExpenseDelete";
import ExpenseModal from "../modals/ExpenseModal";

interface ExpensesGridProps {
  expenses: IExpense[];
}

const groupExpensesByMonth = (expenses: IExpense[]) => {
  return expenses.reduce((acc, expense) => {
    const { expense_id, month_name, amount, description, user_id, year } =
      expense;
    if (!acc[month_name]) {
      acc[month_name] = [];
    }
    acc[month_name].push({
      month_name,
      expense_id,
      amount,
      description,
      user_id,
      year,
    });
    return acc;
  }, {} as Record<string, { month_name: string; expense_id: number; amount: string; description: string; user_id: number; year: number }[]>);
};

const removeDuplicateMonths = (expenses: IExpense[]) => {
  const seen = new Set<string>();
  return expenses.filter((expense) => {
    if (seen.has(expense.month_name)) {
      return false;
    }
    seen.add(expense.month_name);
    return true;
  });
};

const removeDuplicateYears = (expenses: IExpense[]) => {
  const seen = new Set<number>(); // Usar um Set para rastrear os anos já vistos
  return expenses.filter((expense) => {
    if (seen.has(expense.year)) {
      return false; // Ignora se o ano já foi visto
    }
    seen.add(expense.year); // Adiciona o ano ao conjunto de vistos
    return true; // Inclui o item no array final
  });
};

const ExpensesGrid = ({ expenses }: ExpensesGridProps) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [expenseUpdate, setExpenseUpdate] = useState<IExpense[]>([]);
  const [expenseDelete, setExpenseDelete] = useState<IExpense[]>([]);
  const groupedExpenses = groupExpensesByMonth(expenses);

  const formatCurrency = (value: number) => {
    return !isNaN(value)
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      : "R$ 0,00";
  };

  const toggleModalDelete = (expenses: IExpense[]) => {
    const uniqueExpenses = removeDuplicateMonths(expenses);
    setModalDeleteOpen(!modalDeleteOpen);
    setExpenseDelete(uniqueExpenses);
    console.log(uniqueExpenses);
  };

  const toggleModalUpdate = (expenses: IExpense[]) => {
    setModalUpdate(!modalUpdate);
    setExpenseUpdate(expenses);
  };

  const calculateTotal = (
    expenses: { amount: string; description: string }[]
  ) => {
    return expenses.reduce((acc, expense) => {
      const amount =
        typeof expense.amount === "number"
          ? expense.amount
          : parseFloat(expense.amount);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  return (
    <div>
      {Object.entries(groupedExpenses).map(([month, expenses]) => {
        const uniqueYearExpenses = removeDuplicateYears(expenses); // Remover anos duplicados

        return (
          <div
            key={month}
            className="flex flex-col w-full bg-white border-2 border-gray-200 rounded-md px-10 py-5"
          >
            <div className="flex justify-between items-center border-b-2 pb-5">
              <div className="flex justify-center gap-2 items-center">
                <h3 className=" text-xl font-semibold text-purpleContabilize">
                  {month}
                </h3>
                <span className="text-xl font-semibold text-purpleContabilize">
                  |
                </span>
                {uniqueYearExpenses.map((item) => (
                  <h3
                    key={item.expense_id}
                    className="text-xl font-semibold text-purpleContabilize"
                  >
                    {item.year}
                  </h3>
                ))}
              </div>
              <div className="flex gap-5">
                <Button
                  buttonText={<FaRegEdit size={20} />}
                  style={"text-white"}
                  onClick={() => toggleModalUpdate(expenses)}
                />
                <Button
                  onClick={() => toggleModalDelete(expenses)}
                  buttonText={<AiOutlineDelete size={20} />}
                  style={"text-white"}
                />
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
        );
      })}
      {modalUpdate && (
        <ExpenseModal
          onClick={() => toggleModalUpdate([])}
          isOpen={modalUpdate}
          update={expenseUpdate}
        />
      )}
      {modalDeleteOpen && (
        <ExpenseDelete
          onClick={() => toggleModalDelete([])}
          isOpen={modalDeleteOpen}
          month={expenseDelete}
        />
      )}
    </div>
  );
};

export default ExpensesGrid;
