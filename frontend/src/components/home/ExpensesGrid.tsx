import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IExpense } from "../../contexts/ExpensesContext";
import Button from "../../utils/Button";
import { useEffect, useState } from "react";
import ExpenseDelete from "../modals/ExpenseDelete";
import ExpenseModal from "../modals/ExpenseModal";
import { getMonths } from "../../functions";
import { toast } from "react-toastify";

interface ExpensesGridProps {
  expenses: IExpense[];
}

const groupExpensesByMonthAndYear = (
  expenses: IExpense[],
  monthMap: Record<number, string>
) => {
  return expenses.reduce((acc, expense) => {
    const { expense_id, month_id, amount, description, user_id, year } =
      expense;
    const monthName = monthMap[expense.month_id] || "Desconhecido"; // Obter nome do mês a partir do mapeamento
    const key = `${monthName}-${year}`; // Inclua o nome do mês e ano no key

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push({
      month_id,
      expense_id,
      amount,
      description,
      user_id,
      year,
    });

    return acc;
  }, {} as Record<string, { month_id: number; expense_id: number; amount: string; description: string; user_id: number; year: number }[]>);
};

const ExpensesGrid = ({ expenses }: ExpensesGridProps) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [month, setMonth] = useState<
    { month_id: number; month_name: string }[]
  >([]);
  const [expenseUpdate, setExpenseUpdate] = useState<IExpense[]>([]);
  const [monthDelete, setMonthDelete] = useState<number>(0);
  const [yearDelete, setYearDelete] = useState<number>(0);
  const [monthMap, setMonthMap] = useState<Record<number, string>>({});
  const groupedExpenses = groupExpensesByMonthAndYear(expenses, monthMap);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const monthData = await getMonths();
        setMonth(monthData);
        const monthMapping = monthData.reduce(
          (map: Record<number, string>, month: unknown) => {
            const m = month as { month_id: number; month_name: string };
            map[m.month_id] = m.month_name;
            return map;
          },
          {} as Record<number, string>
        );
        setMonthMap(monthMapping);
      } catch (err) {
        toast.error("Meses não encontrados");
      }
    };
    fetchMonths();
  }, []);

  const formatCurrency = (value: number) => {
    return !isNaN(value)
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      : "R$ 0,00";
  };

  const toggleModalDelete = (monthId: number, year: number) => {
    setModalDeleteOpen(!modalDeleteOpen);
    setYearDelete(year);
    setMonthDelete(monthId);
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
      {Object.entries(groupedExpenses).map(([key, expenses]) => {
        const [monthName, yearStr] = key.split("-");
        const monthId = Object.keys(monthMap).find(
          (id) => monthMap[parseInt(id)] === monthName
        );
        const yearInt = parseInt(yearStr);

        if (!monthId) {
          console.error(`ID do mês não encontrado para ${monthName}`);
          return null;
        }

        return (
          <div
            key={key}
            className="flex flex-col w-full bg-white border-2 border-gray-200 rounded-md px-10 py-5"
          >
            <div className="flex justify-between items-center border-b-2 pb-5">
              <div className="flex justify-center gap-2 items-center">
                <h3 className="text-xl font-semibold text-purpleContabilize">
                  {monthName}
                </h3>
                <span className="text-xl font-semibold text-purpleContabilize">
                  |
                </span>
                <h3 className="text-xl font-semibold text-purpleContabilize">
                  {yearInt}
                </h3>
              </div>
              <div className="flex gap-5">
                <Button
                  buttonText={<FaRegEdit size={20} />}
                  style={"text-white"}
                  onClick={() => toggleModalUpdate(expenses)}
                />
                <Button
                  onClick={() => toggleModalDelete(parseInt(monthId), yearInt)}
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
          onClick={() => toggleModalDelete(monthDelete || 0, yearDelete || 0)}
          year={yearDelete}
          isOpen={modalDeleteOpen}
          month={monthDelete}
        />
      )}
    </div>
  );
};

export default ExpensesGrid;