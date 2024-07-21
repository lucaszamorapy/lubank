import axios from "axios";

const API_URL = "http://localhost:8081/api";

type UserDataProps = {
  username: string;
  email: string;
  password: string | number;
  role_id: number;
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

export const createUser = async (userData: UserDataProps) => {
  try {
    const response = await axios.post(`${API_URL}/api/user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-lançar o erro para que ele possa ser tratado pelos chamadores
  }
};
