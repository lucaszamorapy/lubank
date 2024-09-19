import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import { ExpenseProvider } from "./contexts/ExpensesContext";
import { ModalOpenProvider } from "./contexts/ModalOpenContext";
import Statistic from "./pages/Statistic";
import Account from "./pages/Account";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <ModalOpenProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/estatisticas"
                  element={
                    <ProtectedRoute>
                      <Statistic />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/conta"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ThemeProvider>
          </ModalOpenProvider>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
