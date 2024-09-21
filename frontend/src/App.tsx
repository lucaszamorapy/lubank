import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import { ExpenseProvider } from "./contexts/ExpensesContext";
import Statistic from "./pages/Statistic";
import Account from "./pages/Account";
import ScrollToTopOnPageChange from "./ScrollTopToOnPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopOnPageChange />
      <AuthProvider>
        <ExpenseProvider>
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
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
