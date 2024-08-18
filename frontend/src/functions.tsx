import axios from "axios";

const API_URL = "http://localhost:8081/api";

type UserCreateProps = {
  username: string | number;
  email: string;
  password: string | number;
  role_name: string;
};

export interface ExpensesCreateProps {
  expenses: {
    user_id: number | null;
    month_name: string;
    amount: number | string;
    description: string;
  }[];
}

type UserLoginProps = {
  username: string | number;
  password: string | number;
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-lançar o erro para que ele possa ser tratado pelos chamadores
  }
};

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error; // Re-lançar o erro para que ele possa ser tratado pelos chamadores
  }
};

export const createUser = async (userData: UserCreateProps) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-lançar o erro para que ele possa ser tratado pelos chamadores
  }
};

export const loginUser = async (userData: UserLoginProps) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-lançar o erro para que ele possa ser tratado pelos chamadores
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

export const getExpenseByUserId = async (userId: number | null) => {
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

export const deleteExpense = async (monthName: string[], userId: number) => {
  try {
    const response = await axios.delete(
      `${API_URL}/expenses/${monthName}/${userId}`
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
