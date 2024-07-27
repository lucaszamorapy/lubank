import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRouter = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRouter;
