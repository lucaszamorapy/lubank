import axios from "axios";

const API_URL = "http://localhost:8081/api";

type UserCreateProps = {
  username: string | number;
  email: string;
  password: string | number;
  role_name: string;
};

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
