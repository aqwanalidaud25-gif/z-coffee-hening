/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabaseClient"; // Sesuaikan jalur foldernya jika berada di folder yang berbeda (misal: ../../supabaseClient)

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to check profile role from Supabase DB
  const fetchUserProfile = async (userId) => {
    try {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // <-- SUDAH DIPERBAIKI DI SINI

      if (error) {
        console.warn("Could not fetch Supabase profile:", error.message);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

        // If Supabase is configured with real URL
        if (supabaseUrl && !supabaseUrl.includes('your-project-id')) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            setUser(session.user);
            const userProfile = await fetchUserProfile(session.user.id);
            if (mounted) setProfile(userProfile);
          }
        } else if (typeof window !== 'undefined' && window.localStorage) {
          // Fallback to local storage demo session
          const savedUser = window.localStorage.getItem('zcoffee-user');
          if (savedUser && mounted) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
              setProfile({ full_name: parsedUser.name, role: 'admin' });
            } catch {
              window.localStorage.removeItem('zcoffee-user');
            }
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    // Listen to Supabase auth state changes if configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    let authListener = null;

    if (supabaseUrl && !supabaseUrl.includes('your-project-id')) {
      const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      });
      authListener = data?.subscription;
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    // 1. If real Supabase credentials configured
    if (supabaseUrl && !supabaseUrl.includes('your-project-id')) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const userProfile = await fetchUserProfile(data.user.id);

        // Authorization check: Only Admin role is allowed access to Admin Dashboard
        if (userProfile && userProfile.role !== 'admin') {
          await supabase.auth.signOut();
          return {
            success: false,
            error: "Akses ditolak. Akun Anda bukan berstatus Admin.",
          };
        }

        setUser(data.user);
        setProfile(userProfile || { role: 'admin' });
        return { success: true };
      }
    }

    // 2. Demo fallback authentication
    if (credentials.email === "admin@zcoffee.id" && credentials.password === "caffee123!@#") {
      const nextUser = {
        id: "demo-admin-id",
        name: "Admin Kasir",
        email: credentials.email,
        initials: "AK",
      };

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem("zcoffee-user", JSON.stringify(nextUser));
      }
      setUser(nextUser);
      setProfile({ full_name: "Admin Kasir", role: "admin" });
      return { success: true };
    }

    return { success: false, error: "Email atau password salah. Coba admin@zcoffee.id dan caffee123!@#." };
  };

  const logout = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('your-project-id')) {
      await supabase.auth.signOut();
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem("zcoffee-user");
    }
    setUser(null);
    setProfile(null);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(user),
      isAdmin: profile?.role === 'admin' || user?.email === 'admin@zcoffee.id',
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}