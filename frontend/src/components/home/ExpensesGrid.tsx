import { IExpense } from "../../contexts/ExpensesContext";
import Button from "../../utils/Button";
import { useEffect, useState } from "react";
import ExpenseDelete from "../modals/ExpenseDelete";
import ExpenseModal from "../modals/ExpenseModal";
import { getMonths } from "../../composables/months/useMonths";
import { toast } from "react-toastify";
import { formatCurrency } from "../../globalFunctions";
import Icon from "@mdi/react";
import { mdiDelete, mdiMenuDown, mdiMenuUp, mdiPencil } from "@mdi/js";

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
    const monthName = monthMap[expense.month_id] || "Desconhecido";
    const key = `${monthName}-${year}`;

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
  const [openMonths, setOpenMonths] = useState<string[]>([]); // Controla quais meses estão abertos
  const groupedExpenses = groupExpensesByMonthAndYear(expenses, monthMap);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const monthData = await getMonths();
        setMonth(monthData.data);
        const monthMapping = monthData.data.reduce(
          (
            map: Record<number, string>,
            month: { month_id: number; month_name: string }
          ) => {
            map[month.month_id] = month.month_name;
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

  const toggleMonth = (key: string) => {
    if (openMonths.includes(key)) {
      console.log(openMonths);
      setOpenMonths(openMonths.filter((month) => month !== key)); //fecha o mes caso a key exista
    } else {
      setOpenMonths([...openMonths, key]); //adicionando a key para abrir o mes
    }
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
          return null;
        }

        const isOpen = openMonths.includes(key);

        return (
          <div
            key={key}
            className="flex flex-col w-full bg-white border-2 mb-5 shadow-md border-gray-200 rounded-md px-10 py-5"
          >
            <div
              className={`flex justify-between items-center border-b-2 ${
                !isOpen && "border-none"
              }`}
            >
              <div className="flex justify-center gap-2 items-center">
                <h3 className="text-xl font-semibold text-purpleLubank">
                  {monthName} {yearInt}
                </h3>
              </div>
              <div className="flex items-center gap-5">
                <Button
                  onClick={() => toggleModalUpdate(expenses)}
                  buttonText={<Icon path={mdiPencil} size={1} />}
                  style={
                    "text-purpleLubank bg-transparent hover:bg-transparent hover:text-purple-950"
                  }
                />
                <Button
                  onClick={() => toggleModalDelete(parseInt(monthId), yearInt)}
                  buttonText={<Icon path={mdiDelete} size={1} />}
                  style={
                    "text-purpleLubank bg-transparent hover:bg-transparent hover:text-purple-950"
                  }
                />
                <Button
                  type="button"
                  style={
                    "text-purpleLubank bg-transparent hover:bg-transparent hover:text-purple-950"
                  }
                  buttonText={
                    isOpen ? (
                      <Icon path={mdiMenuUp} size={1.5} />
                    ) : (
                      <Icon path={mdiMenuDown} size={1.5} />
                    )
                  }
                  onClick={() => toggleMonth(key)}
                ></Button>
              </div>
            </div>
            {isOpen && (
              <>
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
              </>
            )}
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
