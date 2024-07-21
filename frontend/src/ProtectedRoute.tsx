import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRouter = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
  });

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRouter;
