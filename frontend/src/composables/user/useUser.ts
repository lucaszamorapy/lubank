import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../globalFunctions";

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
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Usuário ou e-mail já em uso");
    throw error;
  }
};

export const loginUser = async (userData: UserLoginProps) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    toast.error("Usuário ou senha incorretos");
    throw error;
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
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
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Falha ao atualizar usuário");
    throw error;
  }
};

export const createRequestForgotPassword = async (email: RequestForgotPasswordProps) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, email);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Falha ao enviar o e-mail");
    throw error;
  }
};
export const createForgotPassword = async (token: string | undefined, password: ResetPasswordProps) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password/${token}`, password);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Falha ao redefinir a senha");
    throw error;
  }
};
