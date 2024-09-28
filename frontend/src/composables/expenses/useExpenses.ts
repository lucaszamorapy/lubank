import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../globalFunctions";


export interface ExpensesCreateProps {
  expenses: {
    user_id: number | null | undefined;
    month_id: number;
    amount: number | string;
    description: string;
    year: number;
  }[];
}

export const createExpense = async (expensesData: ExpensesCreateProps) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expensesData);
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    toast.error("Falha ao salvar despesa(s)");
    throw error;
  }
};

export const getExpenseByUserId = async (userId: number | null | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/expenses/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses by user id:", error);
    throw error;
  }
};


export const deleteExpense = async (
  userId: number | null | undefined,
  monthId: number,
  year: number
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/expenses/${userId}/${monthId}/${year}`
    );
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    toast.error("Falha ao deletar despesa(s)");
    throw error;
  }
};

export const updateExpense = async (
  expenseId: number[],
  expenseEdit: ExpensesCreateProps
) => {
  try {
    const response = await axios.put(
      `${API_URL}/expenses/${expenseId}`,
      expenseEdit
    );
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    toast.error("Falha ao atualizar despesa(s)");
    throw error;
  }
};

export const getExpensesByStatistic = async (
  user_id: number | unknown,
  startMonth: number,
  endMonth: number,
  year: number
) => {
  try {
    const response = await axios.get(
      `${API_URL}/expenses/${user_id}/${startMonth}/${endMonth}/${year}`
    );
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses between months:", error);
    throw error;
  }
};


