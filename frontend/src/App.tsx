// src/App.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login onSwitchToRegister={() => navigate("/register")} />} />
      <Route path="/register" element={<Register onSwitchToLogin={() => navigate("/login")} />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
