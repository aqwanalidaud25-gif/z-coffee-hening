import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AbsensiKaryawan from "./pages/AbsensiKaryawan";
import AttendanceReport from "./pages/AttendanceReport";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function AppRoutes() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard onLogout={logout} />} />
        <Route path="/absensi" element={<AbsensiKaryawan onLogout={logout} />} />
        <Route path="/transactions" element={<Transactions onLogout={logout} />} />
        <Route path="/inventory" element={<Inventory onLogout={logout} />} />
        <Route path="/customers" element={<Customers onLogout={logout} />} />
        <Route path="/settings" element={<Settings onLogout={logout} />} />
        <Route path="/attendance-report" element={<AttendanceReport onLogout={logout} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}
