import React, { useEffect, useState } from "react";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import { toast } from "react-toastify";
import {
  createExpense,
  getExpenseByUserId,
  getMonths,
  updateExpense,
} from "../../functions";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useExpense } from "../../contexts/ExpensesContext";
import Loading from "../../helper/Loading";
import { TiDelete } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";
import { IExpense } from "../../contexts/ExpensesContext";
import {
  convertToNumber,
  formatCurrency,
  handleChangeDate,
} from "../../globalFunctions";

type ExpensesFormProps = {
  update?: IExpense[];
  toggleModal: () => void;
};

const ExpensesForm = ({ update, toggleModal }: ExpensesFormProps) => {
  const [expenses, setExpenses] = useState<
    { amount: number; description: string; expense_id?: number }[]
  >([{ amount: 0, description: "" }]);
  const [originalExpenses, setOriginalExpenses] = useState<
    { amount: number; description: string; expense_id?: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<number>(0);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState([]);
  const { userInfo } = useAuth();
  const { setExpenses: setGlobalExpenses } = useExpense();

  useEffect(() => {
    if (update) {
      setExpenses(
        update.map((item) => ({
          amount: convertToNumber(item.amount.toString()),
          description: item.description,
          expense_id: item.expense_id,
        }))
      );
      setOriginalExpenses(
        update.map((item) => ({
          amount: convertToNumber(item.amount.toString()),
          description: item.description,
          expense_id: item.expense_id,
        }))
      );
      setSelect(update[0]?.month_id);
      setYear(update[0]?.year.toString()); // transformei em string pois ele é passado como string no input e depois volta como number no banco
    }

    const fetchMonths = async () => {
      try {
        const monthData = await getMonths();
        setMonth(monthData);
      } catch (err) {
        toast.error("Meses não encontrados");
      }
    };
    fetchMonths();
  }, [update]);

  const addExpense = () => {
    setExpenses([...expenses, { amount: 0, description: "" }]);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const values = [...expenses];
    values[index] = {
      ...values[index],
      [name]: value,
    };
    setExpenses(values);
  };

  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const yearValue = convertToNumber(year);
    if (
      expenses.some((expense) => !expense.amount || !expense.description) ||
      !select ||
      yearValue === 0
    ) {
      return toast.error("Preencha todos os campos!");
    }

    // Filtra despesas que têm ID definido e foram modificadas
    const modifiedExpenses = expenses.filter((expense, index) => {
      const original = originalExpenses[index]; // fazendo uma especie de "map"
      return (
        expense.expense_id !== undefined &&
        (expense.amount !== original.amount ||
          expense.description !== original.description)
      );
    });

    // Cria um array de IDs de despesas modificadas
    const expenseIds = modifiedExpenses.map(
      (expense) => expense.expense_id as number
    );

    // Prepara as despesas para atualização, garantindo que o ID esteja presente
    const updatedExpenses = modifiedExpenses.map((expense) => ({
      expense_id: expense.expense_id,
      user_id: userInfo?.id,
      month_id: select ?? 0,
      amount: convertToNumber(expense.amount.toString()),
      year: convertToNumber(year),
      description: expense.description,
    }));

    // Adiciona novas despesas (sem ID) se não estiver atualizando
    const newExpenses = expenses
      .filter((expense) => expense.expense_id === undefined)
      .map((expense) => ({
        user_id: userInfo?.id,
        month_id: select ?? 0,
        amount: convertToNumber(expense.amount.toString()),
        year: convertToNumber(year),
        description: expense.description,
      }));

    try {
      setLoading(true);
      if (update) {
        // Atualiza despesas existentes
        await updateExpense(expenseIds, { expenses: updatedExpenses });
        toast.success("Despesas alteradas com sucesso");
      } else {
        // Cria novas despesas
        await createExpense({ expenses: newExpenses });
        toast.success("Despesas enviadas com sucesso");
      }
      const expenseUserData = await getExpenseByUserId(userInfo?.id);
      setGlobalExpenses(expenseUserData);
    } catch (error) {
      toast.error("Falha ao salvar despesas");
    } finally {
      setLoading(false);
      toggleModal();
    }
  };

  return (
    <form className="flex flex-col gap-10 mt-10" onSubmit={handleSubmit}>
      <Select
        value={select}
        item={month}
        style={"w-full"}
        disabled={!!update}
        onChange={(e) => setSelect(Number(e.target.value))}
      />
      <Input
        type="text"
        name="year"
        style={"px-5 w-full"}
        placeholder="Ano"
        disabled={!!update}
        value={year}
        onChange={(e) => setYear(handleChangeDate(e))}
        required
      />
      <div className="flex flex-col gap-5 overflow-y-scroll max-h-[40vh]">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div
              className="flex flex-col border-2 border-purple-50 shadow-md rounded-md p-3"
              key={index}
            >
              {!update && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => removeExpense(index)}
                    disabled={!!update}
                    buttonText={<TiDelete size={30} />}
                    style={
                      "text-purpleContabilize bg-white hover:bg-white hover:text-purple-950 px-0"
                    }
                  />
                </div>
              )}
              <div className="flex flex-col gap-5">
                <Input
                  type="text"
                  name="description"
                  style={"px-5 w-full lg:w-[454px]"}
                  placeholder="Descrição do gasto"
                  value={expense.description}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
                <Input
                  type="text"
                  name="amount"
                  style={"px-5 w-full lg:w-[454px]"}
                  placeholder="Valor"
                  value={formatCurrency(expense.amount)}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            Não possui nenhuma despesa
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-5 lg:gap-10 lg:flex-row">
        {!update && (
          <>
            <Button
              onClick={addExpense}
              buttonText={"Adicionar mais gastos"}
              style={`text-white rounded-full w-full`}
            />
            <Button
              type="submit"
              buttonText={loading ? <Loading /> : "Salvar despesas"}
              style={"text-white rounded-full w-full"}
            />
          </>
        )}
        {update && (
          <Button
            type="submit"
            buttonText={loading ? <Loading /> : "Salvar alterações"}
            style={"text-white rounded-full w-full"}
          />
        )}
      </div>
    </form>
  );
};

export default ExpensesForm;
