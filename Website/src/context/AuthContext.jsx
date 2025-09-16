// ===================================================================
// FILE: website/src/context/AuthContext.jsx (FINAL, with Tab Sync)
// ===================================================================
import React, { createContext, useState, useMemo, useEffect } from "react";

export const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This single function is now our source of truth for loading state from localStorage
  const syncAuthStateFromStorage = () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        // If items are missing, ensure React state is also cleared
        setToken(null);
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to parse auth data from storage", e);
      localStorage.clear();
      setToken(null);
      setUser(null);
    }
  };

  // Effect 1: Load the initial state when the app first mounts
  useEffect(() => {
    syncAuthStateFromStorage();
    setIsLoading(false);
  }, []);

  // Effect 2: Listen for storage changes from OTHER browser tabs to stay in sync
  useEffect(() => {
    // The 'storage' event is the browser's built-in alarm for cross-tab changes
    window.addEventListener('storage', syncAuthStateFromStorage);

    // Cleanup function to remove the listener when the component is no longer on screen
    return () => {
      window.removeEventListener('storage', syncAuthStateFromStorage);
    };
  }, []); // The empty array ensures this listener is set up only once

  const fetchAPI = async (url, body, method = "POST") => {
    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An error occurred");
    }
    return res.json();
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await fetchAPI("/api/auth/login", { email, password });
      
      // This is the only place we now WRITE to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Update the state for the current tab
      setToken(data.token);
      setUser(data.user);

      // Your "URL Token" redirect logic for the admin panel
      if (data.user && data.user.isAdmin) {
        window.location.href = `http://localhost:8080/auth/callback?token=${data.token}`;
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setIsLoading(false);
      throw err;
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

  const logout = () => {
    // This will clear localStorage, and the 'storage' event will notify other tabs
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      signup,
      sendVerificationEmail,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}