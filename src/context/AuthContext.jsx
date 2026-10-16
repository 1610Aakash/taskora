"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { apiGet, apiPost } from "@/lib/api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children, loadOnMount = true }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(loadOnMount);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiGet("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loadOnMount) return;

    const timeout = setTimeout(refreshUser, 0);
    return () => clearTimeout(timeout);
  }, [loadOnMount, refreshUser]);

  const logout = useCallback(async () => {
    await apiPost("/auth/logout", {});
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
