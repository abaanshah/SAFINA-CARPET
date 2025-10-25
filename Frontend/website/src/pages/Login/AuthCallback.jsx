import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext, api } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from your context

  useEffect(() => {
    const token = searchParams.get('token');

    const verifyTokenAndLogin = async (token) => {
      try {
        // 1. We have a token. We now use it to ask the backend "Who am I?"
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data: user } = await api.get('/api/auth/me', config);

        // 2. We have the token AND the user. Now we save them.
        // We can reuse the logic from your AuthContext's login function
        // by saving the data to localStorage and then reloading the app.
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // 3. Redirect to the homepage. The AuthContext will
        // automatically load the new data on the next page load.
        window.location.href = '/'; 

      } catch (error) {
        console.error("Auth callback failed:", error);
        navigate('/login?error=Authentication failed'); // Send to login with an error
      }
    };

    if (token) {
      verifyTokenAndLogin(token);
    } else {
      // No token found
      navigate('/login?error=No token provided');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-800" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Authenticating, please wait...
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
