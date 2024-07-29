import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";
import { ExpenseProvider } from "./contexts/ExpensesContext";
import { ModalOpenProvider } from "./contexts/ModalOpenContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <ModalOpenProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

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
