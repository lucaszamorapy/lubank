import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUserInfo } from "../functions";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: string | number | undefined;
  userId: number | null;
  userAvatar: string | undefined;
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
  const [user, setUser] = useState<string | number | undefined>();
  const [userAvatar, setUserAvatar] = useState<string | undefined>();
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  //verificação se o token ja existe
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      getUserInfo(token)
        .then((userInfo) => {
          setUser(userInfo.username);
          setUserAvatar(userInfo.avatar);
          setUserId(userInfo.id);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(undefined);
        });
    } else {
      setIsAuthenticated(false);
      setUser(undefined);
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
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, userId, userAvatar }}
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
