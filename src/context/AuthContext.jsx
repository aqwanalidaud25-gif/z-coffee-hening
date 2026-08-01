/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('zcoffee-user') : null;
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        if (typeof window !== 'undefined') localStorage.removeItem('zcoffee-user');
      }
    }
    return null;
  });
  const [loading] = useState(false);

  const login = (credentials) => {
    if (credentials.email === "admin@zcoffee.id" && credentials.password === "password123") {
      const nextUser = {
        id: 1,
        name: "Admin Kasir",
        email: credentials.email,
        initials: "AK",
      };

      localStorage.setItem("zcoffee-user", JSON.stringify(nextUser));
      setUser(nextUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("zcoffee-user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
