import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import BookAppointmentModal from "../BookAppointment/BookAppointmentModal"; // Assuming this is the correct path

// --- FIX: The component needs to accept 'onCartClick' as a prop ---
const Navbar = ({ onCartClick }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  // 3. Get currency state and setter from context
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [mobilePoliciesOpen, setMobilePoliciesOpen] = useState(false);
  const iconSize = 24;
  const iconColor = "white";

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    if (!isHomePage) {
      setShowNavbar(true);
      return;
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY || window.scrollY < 50);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };
  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };

  return (
    <header className={location.pathname === "/" ? (showNavbar ? "show" : "hide") : "static"}>
      {/* Announcement Banner */}
      {showAnnouncement && (
        <div className="announcement-banner">
          <div className="announcement-content">
            <span className="announcement-text">
              🎉 40% OFF on Christmas Collection 🎉
            </span>
            <button className="announcement-close" onClick={closeAnnouncement}>
              &times;
            </button>
          </div>
        </div>
      )}
      
      <nav className="navbar">
        {/* Mobile Hamburger Menu Button - Left Side */}
        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? <HiXMark size={28} color={iconColor} /> : <HiBars3 size={28} color={iconColor} />}
        </button>

        {/* Nav Left - Desktop Only */}
        <div className="nav-left large-screen">
            <a href="http://localhost:8080/" className="nav-icon"><HiOutlineMapPin size={iconSize} color={iconColor} /></a>
            <button onClick={() => setAppointmentModalOpen(true)} className="nav-appointment">
                <HiOutlineCalendar size={iconSize} color={iconColor} /><p>BOOK AN APPOINTMENT</p>
            </button>
        </div>

        {/* Mobile Appointment Icon Only */}
        <div className="nav-left-mobile small-screen">
            <button onClick={() => setAppointmentModalOpen(true)} className="nav-appointment-mobile">
                <HiOutlineCalendar size={iconSize} color={iconColor} />
            </button>
        </div>

        <div className="nav-center">
            <Link to="/"><img src={logo} alt="Logo" className="nav-logo" /></Link>
        </div>

        {/* Mobile Right Icons */}
        <div className="nav-right-mobile small-screen">
          <Link to="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          <Link to="/" className="nav-icon">
            <Bell size={iconSize} color={iconColor} />
          </Link>
          {/* FIX: Use onCartClick for mobile cart */}
          <button onClick={onCartClick} className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>

        {/* Desktop Right Icons */}
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
              <Shield size={iconSize - 2} color={iconColor} />
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
          
          {/* FIX: Use onCartClick prop from MainLayout.jsx */}
          <Link to="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* --- ALL YOUR LINKS & MENUS (CLEANED) --- */}
      <div className="links large-screen jost-heading">
        <Link to="/about">ABOUT US</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("shop")} onMouseLeave={() => setActiveDropdown(null)}>SHOP</a>
        <Link to="/services">SERVICES</Link>
        <Link to="/Guide">GUIDE</Link>
        <Link to="/manufacturing">MANUFACTURING</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("policies")} onMouseLeave={() => setActiveDropdown(null)}>POLICIES</a>
        <Link to="/checkout">CHECKOUT</Link>
        <Link to="/blogs">BLOGS</Link>
        <Link to="/custom">CUSTOM</Link>
        <Link to="/faqs">FAQS</Link>
      </div>
      {activeDropdown === "shop" && (
        <div className="mega-menu" onMouseEnter={() => setActiveDropdown("shop")} onMouseLeave={() => setActiveDropdown(null)}>
          <div className="mega-section">
            <h3>SIZE</h3>
            <ul>
              <li><a href="/catalog?size=2x3ft">2X3 FT</a></li>
              {/* ... all your other size links ... */}
              <li><a href="/catalog?size=large">LARGE</a></li>
              <li><a href="/catalog?size=oversize">OVERSIZE</a></li>
            </ul>
          </div>
          <div className="mega-section">
            <h3>COLORS</h3>
            <ul>
              {/* ... all your color links ... */}
              <li><a href="/catalog?color=multi-color">MULTI COLOR</a></li>
            </ul>
          </div>
          <div className="mega-section">
            <h3>ROOM</h3>
            <ul>
              {/* ... all your room links ... */}
              <li><a href="/catalog?room=outdoor-indoor">OUTDOOR/INDOOR</a></li>
            </ul>
            <h3 style={{marginTop: '20px'}}>SHAPE</h3>
            <ul>
              {/* ... all your shape links ... */}
              <li><a href="/catalog?shape=square">SQUARE</a></li>
            </ul>
          </div>
          <div className="mega-section">
            <h3>MATERIAL</h3>
            <ul>
              {/* ... all your material links ... */}
              <li><a href="/catalog?material=bamboo-silk-zari">BAMBOO SILK AND ZARI</a></li>
            </ul>
          </div>
          <div className="mega-section">
            <h3>CONSTRUCTION</h3>
            <ul>
              {/* ... all your construction links ... */}
              <li><a href="/catalog?construction=shag">SHAG</a></li>
            </ul>
          </div>
        </div>
      )}
      {activeDropdown === "policies" && (
        <div className="policies-dropdown" onMouseEnter={() => setActiveDropdown("policies")} onMouseLeave={() => setActiveDropdown(null)}>
          <ul>
            <li><Link to="/return-refund-policy">Return & Refund</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      )}

      {/* Mobile Slide Menu */}
      <div className={`mobile-slide-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button className="mobile-menu-close" onClick={toggleMenu}>
              <HiXMark size={24} color="white" />
            </button>
          </div>
          
          <div className="mobile-menu-links">
            <Link to="/about" onClick={toggleMenu}>ABOUT US</Link>
            <Link to="/catalog" onClick={toggleMenu}>SHOP</Link> {/* Simplified for mobile */}
            <Link to="/services" onClick={toggleMenu}>SERVICES</Link>
            <Link to="/Guide" onClick={toggleMenu}>GUIDE</Link>
            <Link to="/manufacturing" onClick={toggleMenu}>MANUFACTURING</Link>
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-toggle" onClick={() => setMobilePoliciesOpen(!mobilePoliciesOpen)}>
                POLICIES
                <span className={`dropdown-arrow ${mobilePoliciesOpen ? 'open' : ''}`}>▼</span>
              </button>
              {mobilePoliciesOpen && (
                <div className="mobile-dropdown-content">
                  <Link to="/return-refund-policy" onClick={toggleMenu}>Return & Refund</Link>
                  <Link to="/privacy-policy" onClick={toggleMenu}>Privacy Policy</Link>
                  <Link to="/shipping-policy" onClick={toggleMenu}>Shipping Policy</Link>
                  <Link to="/terms-conditions" onClick={toggleMenu}>Terms & Conditions</Link>
                </div>
              )}
            </div>
            <Link to="/checkout" onClick={toggleMenu}>CHECKOUT</Link>
            <Link to="/blogs" onClick={toggleMenu}>BLOGS</Link>
            <Link to="/custom" onClick={toggleMenu}>CUSTOM</Link>
            <Link to="/faqs" onClick={toggleMenu}>FAQS</Link>
          </div>

          <div className="mobile-menu-user">
            {user ? (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <div className="mobile-user-details">
                  <p className="mobile-user-name">{user.name}</p>
                  <p className="mobile-user-email">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="mobile-login-btn">
                <HiOutlineUser size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu}></div>}
      
      <BookAppointmentModal 
        isOpen={appointmentModalOpen} 
        onClose={() => setAppointmentModalOpen(false)} 
      />
    </header>
  );
};
export default Navbar;

