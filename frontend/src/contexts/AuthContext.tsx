import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUserInfo } from "../functions";
import { useNavigate } from "react-router-dom";

interface UserInfoProps {
  username: any;
  email: any;
  id: number | null;
  avatar: File | null | undefined;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userInfo: UserInfoProps | undefined;
  login: (
    username: string | number,
    password: string | number
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface IChildren {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: IChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken") // Inicializa como `true` se o token existir
  );
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //verificação se o token já existe
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userInfo = await getUserInfo(token);
          setUserInfo(userInfo);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          setUserInfo(undefined);
        }
      } else {
        setIsAuthenticated(false);
        setUserInfo(undefined);
      }
      setLoading(false); // Finaliza o carregamento após a verificação
    };

    checkAuthToken();
  }, [navigate]);

  const login = async (
    username: string | number,
    password: string | number
  ) => {
    try {
      const data = await loginUser({
        username,
        password,
      });
      localStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("welcomeMessageShown");
    setIsAuthenticated(false);
    setUserInfo(undefined);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userInfo,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth dentro do AuthProvider");
  }
  return context;
};
