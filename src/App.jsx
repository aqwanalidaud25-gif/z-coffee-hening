import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AbsensiKaryawan from "./pages/AbsensiKaryawan";
import AttendanceReport from "./pages/AttendanceReport";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("zcoffee-auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("zcoffee-auth", String(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("zcoffee-auth", "false");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/absensi" element={isLoggedIn ? <AbsensiKaryawan onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/transactions" element={isLoggedIn ? <Transactions onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/inventory" element={isLoggedIn ? <Inventory onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/customers" element={isLoggedIn ? <Customers onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={isLoggedIn ? <Settings onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/attendance-report" element={isLoggedIn ? <AttendanceReport onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
