import { useEffect, useState } from "react";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import { toast } from "react-toastify";
import { createExpense, getExpenseByUserId, getMonths } from "../../functions";
import Button from "../../utils/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useExpense } from "../../contexts/ExpensesContext";
import Loading from "../../helper/Loading";
import { useModalOpen } from "../../contexts/ModalOpenContext";

const FormExpenses = () => {
  const [expenses, setExpenses] = useState([{ amount: 0, description: "" }]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [month, setMonth] = useState([]);
  const { userId } = useAuth();
  const { setExpenses: setGlobalExpenses } = useExpense(); //coloco setGlobalExpenses para diferenciar com o setExpenses existente
  const { isOpen, setIsOpen } = useModalOpen();

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const monthData = await getMonths();
        setMonth(monthData);
      } catch (err) {
        toast.error("Meses não encontrados");
      }
    };
    fetchMonths();
  }, []);

  const addExpense = () => {
    setExpenses([...expenses, { amount: 0, description: "" }]);
  };

  const modalIsOpen = () => {
    setIsOpen(!isOpen);
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

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const convertToNumber = (value: string): number => {
    const cleanedValue = value.replace(/[^\d,]/g, "").replace(",", ".");
    const parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) {
      return 0;
    }
    return Math.round(parsedValue * 100) / 100;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!select.trim()) {
      return toast.error("Selecione um mês!");
    }
    if (expenses.some((expense) => !expense.amount || !expense.description)) {
      return toast.error("Preencha todos os campos!");
    }
    try {
      setLoading(true);
      await createExpense({
        expenses: expenses.map((expense) => ({
          user_id: userId,
          month_name: select,
          amount: convertToNumber(expense.amount.toString()),
          description: expense.description,
        })),
      });
      toast.success("Despesas enviadas com sucesso");
      //atualiza o estado global das despesas
      const expenseUserData = await getExpenseByUserId(userId);
      setGlobalExpenses(expenseUserData);
    } catch (error) {
      toast.error("Falha ao enviar despesas");
    } finally {
      setLoading(false);
      modalIsOpen();
    }
  };

  return (
    <form className="flex flex-col gap-10 mt-10" onSubmit={handleSubmit}>
      <Select
        value={select}
        item={month}
        style={"w-full lg:w-[454px]"}
        onChange={(e) => setSelect(e.target.value)}
      />
      {expenses.map((expense, index) => (
        <div className="flex flex-col gap-5" key={index}>
          <Input
            type="text"
            name="description"
            style={
              "border-b-2 border-purpleContabilize px-5 w-full lg:w-[454px]"
            }
            placeholder="Descrição do gasto"
            value={expense.description}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <Input
            type="text"
            name="amount"
            style={
              "border-b-2 border-purpleContabilize px-5 w-full lg:w-[454px]"
            }
            placeholder="Valor"
            value={formatCurrency(expense.amount)}
            onChange={(event) => handleChange(index, event)}
            required
          />
        </div>
      ))}
      <div className="flex flex-col items-center gap-5 lg:gap-10 lg:flex-row">
        <Button
          onClick={addExpense}
          type="button"
          buttonText={"Adicionar mais gastos"}
          style={"text-white rounded-full w-full"}
        />
        <Button
          type="submit"
          buttonText={loading ? <Loading /> : "Salvar"}
          style={"text-white rounded-full w-full"}
        />
      </div>
    </form>
  );
};

export default FormExpenses;
