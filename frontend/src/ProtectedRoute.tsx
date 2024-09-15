import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  console.log("autenticado", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
