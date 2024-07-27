// AuthProvider.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { loginUser, getUserInfo } from "../functions"; // Adicione getUserInfo
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: string | number | undefined;
  login: (
    username: string | number,
    password: string | number
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | number | undefined>();
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally fetch user info here
      getUserInfo(token)
        .then((userInfo) => {
          setUser(userInfo.username);
          setIsAuthenticated(true);
          navigate("/home");
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

      // Fetch user info
      const userInfo = await getUserInfo(data.token);
      setUser(userInfo.username);

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
    setUser(undefined); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
