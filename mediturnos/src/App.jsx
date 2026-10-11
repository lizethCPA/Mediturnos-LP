import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}
