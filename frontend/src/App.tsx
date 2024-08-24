import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import { ExpenseProvider } from "./contexts/ExpensesContext";
import { ModalOpenProvider } from "./contexts/ModalOpenContext";
import Statistic from "./pages/Statistic";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <ModalOpenProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/estatisticas" element={<Statistic />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ModalOpenProvider>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
