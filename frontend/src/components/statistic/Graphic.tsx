import { useEffect, useState } from "react";
import { getExpensesByStatistic, getMonths } from "../../functions";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../helper/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Select from "../../utils/Select";
import Input from "../../utils/Input";
import { convertToNumber, handleChangeDate } from "../../globalFunctions";
import Button from "../../utils/Button";

const Graphic = () => {
  const [expensesMonths, setExpensesMonth] = useState([]);
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchMonths = async () => {
      const monthData = await getMonths();
      setMonth(monthData);
    };
    fetchMonths();
  }, [userInfo?.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const yearValue = convertToNumber(year);
    if (!startMonth || !endMonth || yearValue === 0) {
      return toast.error("Preencha todos os campos!");
    }
    console.log(yearValue);
    setLoading(true);
    try {
      const response = await getExpensesByStatistic(
        userInfo?.id,
        startMonth,
        endMonth,
        convertToNumber(year)
      );

      const monthMapping = month.reduce(
        (map: Record<number, string>, month: unknown) => {
          const m = month as { month_id: number; month_name: string };
          map[m.month_id] = m.month_name; //acumulador com o id do atual e o valor do atual
          return map;
        },
        {} as Record<number, string>
      );

      //agregar despesas por mês e somar os valores
      const aggregatedData = response.reduce((acc, expense) => {
        const { month_id, amount } = expense;
        if (!acc[month_id]) {
          acc[month_id] = {
            month_id: monthMapping[month_id],
            total: 0,
          };
        }
        acc[month_id].total += parseFloat(amount);
        return acc;
      }, {});

      //converter objeto de volta para array
      setExpensesMonth(Object.values(aggregatedData));
      toast.success(`Gráfico atualizado com sucesso!`);
    } catch (error) {
      toast.error("Ocorreu um erro ao processar os dados!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && <Loading screen={loading} />}
      <div className="container">
        <div className=" bg-white border-2 border-gray-200 flex flex-col items-center gap-7 mb-20 justify-center shadow-md rounded-md px-10 py-5 ">
          <h1 className="text-purpleLubank text-2xl font-semibold">
            Selecione os meses para o gráfico
          </h1>
          <form
            className="flex flex-col gap-10 lg:flex-row"
            onSubmit={handleSubmit}
          >
            <Select
              value={startMonth}
              item={month}
              style={"w-full px-5"}
              onChange={(e) => setStartMonth(Number(e.target.value))}
            />
            <Select
              value={endMonth}
              item={month}
              style={"w-full px-5"}
              onChange={(e) => setEndMonth(Number(e.target.value))}
            />
            <Input
              type="text"
              name="year"
              style={"px-5 w-full"}
              placeholder="Ano"
              value={year}
              onChange={(e) => setYear(handleChangeDate(e))}
              required
            />
            <Button
              type="submit"
              disabled={loading}
              buttonText={loading ? <Loading /> : "Enviar"}
              style={"text-white rounded-full px-5 py-0"}
            />
          </form>
        </div>
      </div>
      <ResponsiveContainer width="99%" height={500}>
        <BarChart
          data={expensesMonths}
          width={500}
          height={500}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            type="monotone"
            dataKey="total"
            fill="#6A00AB"
            name="Gastos do Mês"
            activeBar={<Rectangle fill="gold" stroke="#6A00AB" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Graphic;
