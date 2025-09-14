// ===================================================================
// FILE: src/pages/Login.jsx (Final Redesign)
// -------------------------------------------------------------------
// This is the complete, standalone Login.jsx component with the new UI,
// fixed form height, email suggestions, popup notifications, and
// placeholders for future login methods.
// ===================================================================
import React, { useState, useContext, useEffect } from "react";
// This path assumes your 'pages' and 'context' folders are siblings inside 'src'.
// Please adjust the path if your folder structure is different.
import { AuthContext } from "../../context/AuthContext";

// --- Helper Components & Functions ---

// Notification Component for the popup messages
const Notification = ({ message, type, show }) => {
  const baseStyle = "fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 z-50 text-base";
  const typeStyle = type === 'success' ? 'bg-green-500' : 'bg-red-800'; // Matched red to theme
  const showStyle = show ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none';

  return (
    <div className={`${baseStyle} ${typeStyle} ${showStyle}`}>
      {message}
    </div>
  );
};

// SVG Icons for Social Logins
const GoogleIcon = () => <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.181-8.234l-6.573,4.817C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.57,31.453,48,25.822,48,20C48,17.341,47.862,14.65,47.611,12.083z"></path></svg>;
const FacebookIcon = () => <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24"><path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.24,0-1.628,0.772-1.628,1.562V12h2.773l-0.443,2.89h-2.33V21.878C18.343,21.128,22,16.99,22,12z"></path></svg>;


// Email typo suggestion utility
const getEmailSuggestion = (email) => {
    try {
        const [localPart, domain] = email.split('@');
        if (!domain || !localPart) return null;

        const misspelledDomains = {
            'gamil.com': 'gmail.com', 'gms.com': 'gmail.com', 'gmai.com': 'gmail.com',
            'yaho.com': 'yahoo.com', 'hotmal.com': 'hotmail.com', 'outlok.com': 'outlook.com'
        };

        if (misspelledDomains[domain]) {
            return `${localPart}@${misspelledDomains[domain]}`;
        }
    } catch (e) {
        return null; // Ignore errors from invalid email formats during typing
    }
    return null;
};


const Login = () => {
  const { login, signup, isLoading } = useContext(AuthContext);

  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [emailSuggestion, setEmailSuggestion] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type, message });
    }, 3000);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successMsg = urlParams.get('message');
    const errorMsg = urlParams.get('error');
    
    if (successMsg) showNotification('success', decodeURIComponent(successMsg));
    else if (errorMsg) showNotification('error', decodeURIComponent(errorMsg));
    
    if (successMsg || errorMsg) window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const handleEmailBlur = () => {
    const suggestion = getEmailSuggestion(email);
    setEmailSuggestion(suggestion);
  };
  
  const useSuggestion = () => {
      setEmail(emailSuggestion);
      setEmailSuggestion(null);
  }

  const handleViewChange = (isLogin) => {
    setIsLoginView(isLogin);
    setName('');
    setEmail('');
    setPassword('');
    setEmailSuggestion(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await signup(name, email, password);
        showNotification('success', 'Verification link sent successfully!');
        handleViewChange(true); // Switch to login view after signup
      }
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  return (
    <>
      <Notification {...notification} />
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left Branding Panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center bg-red-900 text-white relative bg-cover bg-center" style={{backgroundImage: "url('https://www.publicdomainpictures.net/pictures/20000/velka/red-oriental-carpet-texture.jpg')"}}>
             <div className="absolute inset-0 bg-black opacity-60"></div>
             <div className="relative z-10 text-center">
                <img src="https://i.ibb.co/9g0gL0g/logo.jpg" alt="Safina Carpets Logo" className="w-28 h-28 mx-auto rounded-full mb-6 border-4 border-white shadow-lg"/>
                <h1 className="text-4xl font-bold mb-4 tracking-wider" style={{fontFamily: 'Jost, sans-serif'}}>SAFINA CARPETS</h1>
                <p className="text-gray-200 leading-relaxed">MAKE YOUR HOUSE HAPPY</p>
             </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h2>
            <p className="text-gray-600 mb-8">{isLoginView ? 'Log in to continue your journey.' : 'Sign up to discover exquisite designs.'}</p>

            {/* Animated Toggle */}
            <div className="relative mb-8 bg-gray-100 rounded-lg p-1 flex">
              <div 
                className="absolute top-1 left-1 h-10 w-1/2 bg-white rounded-md shadow-md transition-transform duration-300 ease-in-out"
                style={{ transform: isLoginView ? 'translateX(0%)' : 'translateX(100%)' }}
              />
              <button onClick={() => handleViewChange(true)} className="w-1/2 py-2 z-10 font-semibold text-red-900 transition-colors">Login</button>
              <button onClick={() => handleViewChange(false)} className="w-1/2 py-2 z-10 font-semibold text-red-900 transition-colors">Sign Up</button>
            </div>

            {/* Form with fixed height container */}
            <div className="min-h-[280px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field Container */}
                <div className={`transition-all duration-300 ease-in-out ${!isLoginView ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                    { !isLoginView && (
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" autoComplete="name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 transition" required={!isLoginView} />
                        </div>
                    )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} placeholder="you@example.com" autoComplete="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 transition" required />
                  {emailSuggestion && (
                      <div className="text-xs text-gray-500 mt-1">
                          Did you mean <button type="button" onClick={useSuggestion} className="font-semibold text-red-700 hover:underline">{emailSuggestion}</button>?
                      </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete={isLoginView ? "current-password" : "new-password"} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800 transition" required />
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-red-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 transition-transform transform hover:scale-105 disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center">
                  {isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
                  {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Create Account')}
                </button>
              </form>
            </div>
            
            {/* Social Login Placeholders */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button disabled className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50">
                  <GoogleIcon /> Google
                </button>
                <button disabled className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50">
                  <FacebookIcon /> Facebook
                </button>
                <button disabled className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50">
                  Mobile OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
