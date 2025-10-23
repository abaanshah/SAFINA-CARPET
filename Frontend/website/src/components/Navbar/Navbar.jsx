import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import "@fontsource/jost/300.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // 1. Import CurrencyContext
import { Bell, Shield } from "lucide-react"; // 2. Import Shield icon

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  // 3. Get currency state and setter from context
  const { currency, setCurrency } = useContext(CurrencyContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const iconSize = 24;
  const iconColor = "white";

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY || window.scrollY < 50);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };
  
  const megaMenuData = { /* ... your mega menu data ... */ };

  return (
    <header className={showNavbar ? "show" : "hide"}>
      <nav className="navbar">
        <div className="nav-left">
            <a href="http://localhost:8080/" className="nav-icon"><HiOutlineMapPin size={iconSize} color={iconColor} /></a>
            <a href="#" className="nav-appointment">
                <HiOutlineCalendar size={iconSize} color={iconColor} /><p>BOOK AN APPOINTMENT</p>
            </a>
        </div>
        <div className="nav-center">
            <Link to="/"><img src={logo} alt="Logo" className="nav-logo" /></Link>
        </div>

        <div className="nav-right large-screen">
          
          {/* --- 4. ADDED CURRENCY TOGGLE BUTTON --- */}
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="nav-icon nav-currency-toggle"
            title="Change Currency"
          >
            {currency === 'INR' ? '₹' : '$'}
          </button>

          {/* --- 5. ADDED CONDITIONAL ADMIN LINK --- */}
          {user && user.isAdmin && (
            <a 
              href="http://localhost:8080" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-icon admin-link" 
              title="Admin Panel"
            >
              <Shield size={iconSize} color={iconColor} />
            </a>
          )}

          <Link to="#" className="nav-icon"><HiOutlineMagnifyingGlass size={iconSize} color={iconColor} /></Link>
          <Link to="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          <Link to="/" className="nav-icon"><Bell size={iconSize} color={iconColor} /></Link>

          {user ? (
            <div 
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <Link to="/profile" className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-800">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </Link>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="absolute right-0 mt-3 w-72 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden z-50 origin-top-right"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">{user.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <ul className="p-4 space-y-1 text-sm font-medium text-gray-700">
                      <li><NavLink to="/profile" className={({isActive}) => `block p-2 rounded-md ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>👤 My Details</NavLink></li>
                      <li><NavLink to="/profile/orders" className={({isActive}) => `block p-2 rounded-md ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>📦 My Orders</NavLink></li>
                      <li><NavLink to="/wishlist" className={({isActive}) => `block p-2 rounded-md ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>❤️ Wishlist</NavLink></li>
                    </ul>
                    <div className="p-4 border-t border-gray-200">
                      <button onClick={handleLogout} className="w-full text-center p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="nav-icon flex items-center gap-2">
              <HiOutlineUser size={iconSize} color={iconColor} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}

          <Link to="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>

        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? <HiXMark size={28} color={iconColor} /> : <HiBars3 size={28} color={iconColor} />}
        </button>
      </nav>

      <div className="links large-screen jost-heading">
        <Link to="/about">ABOUT US</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("services")} onMouseLeave={() => setActiveDropdown(null)}>SERVICES</a>
        <a href="#" onMouseEnter={() => setActiveDropdown("guide")} onMouseLeave={() => setActiveDropdown(null)}>GUIDE</a>
        <Link to="/manufacturing">MANUFACTURING</Link>
        <Link to="/blogs">BLOGS</Link>
        <Link to="/faqs">FAQS</Link>
      </div>
      {activeDropdown && (
        <div className="mega-menu" onMouseEnter={() => setActiveDropdown(activeDropdown)} onMouseLeave={() => setActiveDropdown(null)}>
            {/* ... your mega menu content ... */}
        </div>
      )}
    </header>
  );
};
export default Navbar;

