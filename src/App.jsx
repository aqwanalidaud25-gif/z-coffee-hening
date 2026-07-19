import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("zcoffee-auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("zcoffee-auth", String(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <Navigate to="/login" replace />} />
        <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate to="/login" replace />} />
        <Route path="/customers" element={isLoggedIn ? <Customers /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
