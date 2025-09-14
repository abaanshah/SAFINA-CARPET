// FILE: website/src/context/AuthContext.jsx (Corrected)
import React, { createContext, useState, useMemo, useEffect } from "react";

export const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000";

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
    // We will check for valid JSON response here for better error handling
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An error occurred");
    }
    return res.json(); // Only parse JSON if the response is ok
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await fetchAPI("/api/auth/login", { email, password });
      
        // --- THIS IS THE NEW, MORE DETAILED LOGGING ---
        console.log("Full response from backend:", data);
        console.log("The 'user' object from the backend is:", data.user);
        console.log("Is the user an admin? -->", data.user?.isAdmin); // This is the final question
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      // In website/src/context/AuthContext.jsx
if (data.user && data.user.isAdmin) {
  // We now redirect to a special callback page on the admin panel
  // and pass the token in the URL.
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