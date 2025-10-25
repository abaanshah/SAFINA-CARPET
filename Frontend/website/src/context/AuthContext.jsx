// ===================================================================
// FILE: website/src/context/AuthContext.jsx (FINAL, with Tab Sync)
// ===================================================================
import React, { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios"; // Make sure axios is imported

export const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000";

// --- 1. Create a custom Axios instance ---
// This is the 'api' that your Checkout.jsx and other components will use.
export const api = axios.create({
  baseURL: API_BASE,
});

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
        // 2. Set the token as a default header for all future api calls
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } else {
        // If items are missing, ensure React state is also cleared
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      }
    } catch (e) {
      console.error("Failed to parse auth data from storage", e);
      localStorage.clear();
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
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
  
  const logout = () => {
    // This will clear localStorage, and the 'storage' event will notify other tabs
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    window.location.href = "/login";
  };

  // 3. Add an Axios "interceptor" (a global error checker)
  useEffect(() => {
    const errorInterceptor = api.interceptors.response.use(
      (response) => response, // Pass through successful responses
      (error) => {
        // Check if the error is a 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          console.error("AuthContext: Received 401, token is invalid. Logging out.");
          logout(); // If it is, log the user out automatically
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(errorInterceptor);
    };
  }, []); // Run this setup once

  // 4. Update login to use the 'api' instance and set the default header
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Use the 'api' instance now
      const { data } = await api.post("/api/auth/login", { email, password });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      
      // Set the default token for all future 'api' requests
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      if (data.user && data.user.isAdmin) {
        window.location.href = `http://localhost:8080/auth/callback?token=${data.token}`;
      } else {
        // For regular users, redirect them to the /auth/callback as well
        // This unifies the login flow
        window.location.href = `/auth/callback?token=${data.token}`;
      }
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // 5. Update other functions to use the 'api' instance
  const signup = async (name, email, password) => {
    // setIsLoading(true); // You had this commented out, kept it that way
    try {
      await api.post("/api/auth/signup", { name, email, password });
    } catch (err) {
      throw err;
    } finally {
      // setIsLoading(false);
    }
  };
  
  const sendVerificationEmail = async (email) => {
    setIsLoading(true);
    try {
      await api.post("/api/auth/send-verification-email", { email });
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email) => {
    // Make sure your backend has a '/api/auth/forgot-password' route
    await api.post("/api/auth/forgot-password", { email });
  };

  const value = useMemo(
    () => ({
      user, token, isLoading, login, signup,
      sendVerificationEmail, sendPasswordResetEmail, logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

