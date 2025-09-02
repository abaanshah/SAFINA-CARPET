// ==========================================================
// FILE: src/pages/Profile/ProfileLayout.jsx (Final Button Version)
// ==========================================================
import React, { useContext } from 'react';
// --- 1. Import useNavigate and useLocation, remove NavLink ---
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { User, ShoppingBag, MapPin, Settings } from 'lucide-react';

const ProfileLayout = () => {
  const { user } = useContext(AuthContext);
  // --- 2. Initialize the hooks we need ---
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return <div className="text-center p-12 mt-[12vh]">Please log in to view your profile.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen"> 
      <div className="container mx-auto mt-[15vh] mb-[10vh] p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 p-1 mx-auto shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-gray-800">
                      {user.name?.charAt(0).toUpperCase()}
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
              <p className="text-md text-gray-500">{user.email}</p>
            </div>
            {/* --- 3. This is now a <nav> of <button>s --- */}
            <nav className="bg-white p-4 mt-6 rounded-xl shadow-lg space-y-2 font-semibold text-gray-700">
              <button 
                onClick={() => navigate('/profile')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium text-left ${
                  location.pathname === '/profile' 
                    ? 'bg-red-800 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-800'
                }`}
              >
                <User size={20} /> My Details
              </button>
              <button 
                onClick={() => navigate('/profile/orders')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium text-left ${
                  location.pathname === '/profile/orders' 
                    ? 'bg-red-800 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-800'
                }`}
              >
                <ShoppingBag size={20} /> My Orders
              </button>
              <button 
                onClick={() => navigate('/profile/addresses')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium text-left ${
                  location.pathname === '/profile/addresses' 
                    ? 'bg-red-800 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-800'
                }`}
              >
                <MapPin size={20} /> Addresses
              </button>
              <button 
                onClick={() => navigate('/profile/settings')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium text-left ${
                  location.pathname === '/profile/settings' 
                    ? 'bg-red-800 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-800'
                }`}
              >
                <Settings size={20} /> Settings
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;