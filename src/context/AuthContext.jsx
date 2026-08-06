/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('zcoffee-user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('zcoffee-user');
        }
      }
    }
    setLoading(false);
  }, []);

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
