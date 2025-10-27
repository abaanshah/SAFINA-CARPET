// FILE: admin/src/pages/AuthCallback.tsx (New File)
import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store"; // Your Zustand store
import axios from "axios";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore(); // We will add this 'login' function to your store

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyTokenAndLogin = async (token) => {
      try {
        // Save the token to localStorage immediately
        localStorage.setItem("token", token);

        // Use the token to ask the backend who we are
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data: user } = await axios.get(
          "https://safina-carpet-backend-web-h0o5.onrender.com/api/auth/me",
          config
        );

        // Now we have the token and the user, save them to the Zustand store
        login(token, user);

        // Redirect to the admin dashboard
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Auth failed:", error);
        navigate("/login"); // Or show an error page
      }
    };

    if (token) {
      verifyTokenAndLogin(token);
    } else {
      // No token found, redirect
      navigate("/login");
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="flex h-screen items-center justify-center">
      Authenticating...
    </div>
  );
};

export default AuthCallback;
