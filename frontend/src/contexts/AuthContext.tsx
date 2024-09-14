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
}

interface IChildren {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: IChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const navigate = useNavigate();

  //verificação se o token ja existe
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      getUserInfo(token)
        .then((userInfo) => {
          setUserInfo(userInfo);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUserInfo(undefined);
        });
    } else {
      setIsAuthenticated(false);
      setUserInfo(undefined);
    }
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
