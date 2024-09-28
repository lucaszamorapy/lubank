import axios from "axios";
import { toast } from "react-toastify";


const API_URL = "http://localhost:8081/api";


export interface ExpensesCreateProps {
  expenses: {
    user_id: number | null | undefined;
    month_id: number;
    amount: number | string;
    description: string;
    year: number;
  }[];
}

type UserLoginProps = {
  username: string | number;
  password: string | number;
};

interface ResetPasswordProps {
  password: string | number;
}

interface RequestForgotPasswordProps {
  email: string
}


export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const loginUser = async (userData: UserLoginProps) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Exemplo: { username: "JohnDoe" }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};

export const createExpense = async (expensesData: ExpensesCreateProps) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expensesData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expense info:", error);
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

export const getMonths = async () => {
  try {
    const response = await axios.get(`${API_URL}/months`);
    return response.data;
  } catch (error) {
    console.error("Error fetching months:", error);
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
    return response.data;
  } catch (error) {
    console.error("Error delete expense:", error);
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
    return response.data;
  } catch (error) {
    console.error("Error update expense:", error);
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
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses between months:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: unknown,
  formData: FormData
) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createRequestForgotPassword = async (email: RequestForgotPasswordProps) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, email);
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch create request forgot password info:", error);
    toast.error("Ocorreu um erro ao fazer a requisição");
    throw error;
  }
};
export const createForgotPassword = async (token: string | undefined, password: ResetPasswordProps) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password/${token}`, password);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch create forgot password info:", error);
    toast.error("Ocorreu um erro ao fazer a requisição");
    throw error;
  }
};
