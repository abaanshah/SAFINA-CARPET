import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Key,
  User,
  Eye,
  EyeOff,
  Loader2,
  Smartphone,
} from "lucide-react";
import rugbg from "../../assets/rugbg.avif";

// --- Reusable Components for this page ---
const Input = React.forwardRef(({ icon, ...props }, ref) => (
  <div className="relative mt-2">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      ref={ref}
      {...props}
      className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 focus:bg-white transition"
    />
  </div>
));
const Label = (props) => (
  <label {...props} className="block text-gray-700 text-sm font-bold" />
);
const Button = ({ children, variant, ...props }) => (
  <button
    {...props}
    className={`font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:cursor-not-allowed flex items-center justify-center shadow-sm ${
      variant === "ghost"
        ? "text-gray-600 hover:bg-gray-100"
        : "bg-red-800 text-white hover:bg-red-900 disabled:bg-red-400"
    }`}
  >
    {children}
  </button>
);
// This button remains for the disabled placeholders
const SocialButton = ({ icon, children }) => (
  <button
    disabled
    className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-60"
  >
    {icon} {children}
  </button>
);
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.181-8.234l-6.573,4.817C9.656,39.663,16.318,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.57,31.453,48,25.822,48,20C48,17.341,47.862,14.65,47.611,12.083z"
    ></path>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
    <path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.24,0-1.628,0.772-1.628,1.562V12h2.773l-0.443,2.89h-2.33V21.878C18.343,21.128,22,16.99,22,12z"></path>
  </svg>
);

// --- Notification Component ---
const Notification = ({ message, type, show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 text-base ${
          type === "success" ? "bg-green-600" : "bg-red-800"
        }`}
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Forgot Password Modal ---
const ForgotPasswordModal = ({ isOpen, onClose, onSendLink }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSendLink(email);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4"
      >
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800">Reset Password</h3>
          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Login/Signup Component ---
const Login = () => {
  const { login, signup, sendPasswordResetEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(
      () => setNotification({ show: false, type: "", message: "" }),
      4000
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    const error = params.get("error");
    if (message) showNotification("success", message);
    if (error) showNotification("error", error);
    if (message || error) navigate(location.pathname, { replace: true });
  }, [location, navigate]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleViewChange = () => setIsLoginView(!isLoginView);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
        showNotification(
          "success",
          "Verification email sent! Please check your inbox."
        );
        setIsLoginView(true);
      }
    } catch (err) {
      showNotification("error", err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(email);
      showNotification(
        "success",
        "Password reset link sent! Please check your email."
      );
    } catch (err) {
      showNotification("error", err.message || "Failed to send reset link.");
    }
  };

  return (
    <>
      <Notification {...notification} />
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        onSendLink={handleForgotPassword}
      />
      <div className="min-h-screen font-sans bg-stone-100 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl lg:h-[75vh] flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Left Image Panel */}
          <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center text-white overflow-hidden group min-h-[400px] lg:min-h-full">
            {/* Background Image */}
            <img
              src={rugbg}
              alt="Safina Carpets background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 transition-all duration-700 ease-in-out group-hover:bg-black/20"></div>

            {/* Magazine-style text at bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-8 left-8 z-10 text-left opacity-80 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            >
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-5xl font-bold tracking-wide mb-4 leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Safina Carpets
              </motion.h1>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="text-sm md:text-base max-w-sm text-gray-300 leading-relaxed"
                style={{ fontFamily: "Lora, serif", fontSize: "17px" }}
              >
                Where craftsmanship meets imagination. Each rug tells a story —
                woven with heritage, designed for the modern soul. Experience
                art beneath your feet.
              </motion.p>
            </motion.div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoginView ? "login" : "signup"}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLoginView ? "Welcome Back!" : "Create an Account"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {isLoginView
                    ? "Log in to continue your journey."
                    : "Sign up to discover exquisite designs."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {!isLoginView && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required={!isLoginView}
                        icon={<User size={16} />}
                      />
                    </motion.div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      icon={<Mail size={16} />}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      {isLoginView && (
                        <button
                          type="button"
                          onClick={() => setIsForgotModalOpen(true)}
                          className="text-xs font-semibold text-red-700 hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                        icon={<Key size={16} />}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full !mt-6"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    {isLoading
                      ? "Processing..."
                      : isLoginView
                      ? "Login"
                      : "Create Account"}
                  </Button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  {/* --- THIS IS THE FIX --- */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {/* 1. This is now a real <a> tag, styled to look like a button */}
                    <a
                      href="https://safina-carpet-backend-web-h0o5.onrender.com/api/auth/google"
                      className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <GoogleIcon />
                      Google
                    </a>
                    {/* 2. These are still disabled placeholders */}
                    <SocialButton icon={<FacebookIcon />}>
                      Facebook
                    </SocialButton>
                    <SocialButton
                      icon={<Smartphone size={18} className="mr-2" />}
                    >
                      OTP
                    </SocialButton>
                  </div>
                </div>

                <div className="mt-3 text-center text-sm">
                  <p className="text-gray-600">
                    {isLoginView
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      onClick={handleViewChange}
                      className="font-semibold text-red-800 hover:underline ml-1"
                    >
                      {isLoginView ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
