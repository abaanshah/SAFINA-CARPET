import { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Star, Sparkles, Heart } from 'lucide-react';
import logo from '../../assets/logo.jpg';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Step 1: Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Already logged in → send user to homepage or profile
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // your form JSX continues...  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-4 px-4 flex items-center justify-center">
      <div className="w-full h-[90vh] max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[90vh]">
          
          {/* Left Side - Compact Showcase */}
          <div className="lg:w-2/4 bg-[#860A0C] relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-10 left-6 w-12 h-12 bg-red-400/20 rounded-lg animate-pulse transform rotate-12"></div>
            <div className="absolute top-20 right-8 w-8 h-8 bg-red-300/20 rounded-lg animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 left-8 w-16 h-16 bg-red-500/20 rounded-lg animate-pulse animation-delay-4000 transform rotate-45"></div>

            <div className="relative z-10 h-full flex flex-col justify-center p-8">
              {/* Logo */}
              <div className="mb-8">
                <img src={logo} alt="" />
                {/* <SafinaLogo /> */}
              </div>
              {/* Compact Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-200">15K+</div>
                  <div className="text-xs text-red-100">Happy Homes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-200">800+</div>
                  <div className="text-xs text-red-100">Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-200">30+</div>
                  <div className="text-xs text-red-100">Years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Compact Login Form */}
          <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-4">
              <img src={logo} alt="" />
            </div>

            {/* Welcome Section */}
            <div className="text-center mb-6">
              <div className="overflow-hidden relative h-16">
                <h2 className={`text-2xl lg:text-3xl font-bold text-gray-800 mb-2 transition-all duration-500 transform ${
                  isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
                }`}>
                  Welcome Back!
                </h2>
                <h2 className={`text-2xl lg:text-3xl font-bold text-gray-800 mb-2 transition-all duration-500 transform ${
                  !isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
                }`}>
                  Join Our Family
                </h2>
              </div>
              <div className="overflow-hidden relative h-5">
                <p className={`text-gray-600 text-sm transition-all duration-500 transform ${
                  isLogin ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute'
                }`}>
                  Sign in to explore carpets that make your house happy
                </p>
                <p className={`text-gray-600 text-sm transition-all duration-500 transform ${
                  !isLogin ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 absolute'
                }`}>
                  Create an account to discover joy for your home
                </p>
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-red-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md transform scale-105'
                    : 'text-red-700 hover:text-red-800'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md transform scale-105'
                    : 'text-red-700 hover:text-red-800'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Fields */}
            <div className="relative">
              <div className={`transition-all duration-500 transform ${
                isLogin ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                {isLogin && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-4 w-4 transition-colors duration-300 ${
                          formData.email ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-red-100"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-4 w-4 transition-colors duration-300 ${
                          formData.password ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-3 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-red-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-red-300 text-red-600 focus:ring-red-500" />
                        <span>Remember me</span>
                      </label>
                      <button className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300">
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={`${isLogin ? 'absolute top-0 left-0 w-full' : ''} transition-all duration-500 transform ${
                !isLogin ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                {!isLogin && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-4 w-4 transition-colors duration-300 ${
                          formData.name ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-red-100"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-4 w-4 transition-colors duration-300 ${
                          formData.email ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-red-100"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-4 w-4 transition-colors duration-300 ${
                          formData.password ? 'text-red-600' : 'text-gray-400 group-hover:text-red-500'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-3 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-red-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl'
                } flex items-center justify-center space-x-2 group`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Heart className={`w-4 h-4 fill-current transition-all duration-300 ${
                      isLogin ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                    }`} />
                    <span className="transition-all duration-300">
                      {isLogin ? 'Enter Safina Carpets' : 'Join Our Family'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-red-200"></div>
              <span className="px-3 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-1 border-t border-red-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 px-4 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 group">
                <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2 text-gray-700 font-medium text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 group">
                <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2 text-gray-700 font-medium text-sm">Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <div className="overflow-hidden relative h-6">
                <p className={`text-gray-600 text-sm transition-all duration-500 transform ${
                  isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
                }`}>
                  New to Safina Carpets? 
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300 ml-1"
                  >
                    Join us
                  </button>
                </p>
                <p className={`text-gray-600 text-sm transition-all duration-500 transform ${
                  !isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
                }`}>
                  Already part of our family? 
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300 ml-1"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>

            <div className="text-center mt-3 text-gray-400 text-xs">
              <span className="hover:text-red-500 cursor-pointer transition-colors duration-300">Terms</span>
              <span className="mx-2">•</span>
              <span className="hover:text-red-500 cursor-pointer transition-colors duration-300">Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}