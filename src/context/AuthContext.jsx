// FILE: src/context/AuthContext.jsx
import React, { createContext, useState, useMemo, useEffect } from "react";

export const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000"; // In your real app, use import.meta.env.VITE_API_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (e) {
      localStorage.clear();
    }
    setIsLoading(false);
  }, []);

  const fetchAPI = async (url, body, method = "POST") => {
    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await fetchAPI("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      window.location.href = "/";
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      await fetchAPI("/api/auth/signup", { name, email, password });
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email) => {
    setIsLoading(true);
    try {
      await fetchAPI("/api/auth/send-verification-email", { email });
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // *** FIX #2: The Logout Function ***
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      signup,
      sendVerificationEmail,
      logout, // The logout function is now correctly provided to your app
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
