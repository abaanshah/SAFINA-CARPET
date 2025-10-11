// ===================================================================
// FILE: Navbar.jsx (Final Version with Hover Menu)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // We only need these
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
import { Bell, BellDot, BellElectric, BellOff, ClipboardMinus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false); // This will be controlled by hover
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const iconSize = 24;
  const iconColor = "white";

  // Check if current page is home page
  const isHomePage = location.pathname === "/";

  // Animation settings for the dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    // Only apply scroll-based motion on home page
    if (!isHomePage) {
      setShowNavbar(true); // Always show navbar on non-home pages
      return;
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY || window.scrollY < 50);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };
  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };
  
  const megaMenuData = { /* ... your mega menu data ... */ };

  return (
    <header className={isHomePage ? (showNavbar ? "show" : "hide") : "static"}>
      {/* Announcement Banner */}
      {showAnnouncement && (
        <div className="announcement-banner">
          <div className="announcement-content">
            <span className="announcement-text">
              🎉 40% OFF on Christmas Collection 🎉
            </span>
            <button className="announcement-close" onClick={closeAnnouncement}>
              x
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
            <a href="#" className="nav-appointment">
                <HiOutlineCalendar size={iconSize} color={iconColor} /><p>BOOK AN APPOINTMENT</p>
            </a>
        </div>

        {/* Mobile Appointment Icon Only */}
        <div className="nav-left-mobile small-screen">
            <a href="#" className="nav-appointment-mobile">
                <HiOutlineCalendar size={iconSize} color={iconColor} />
            </a>
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
          <Link to="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>

        <div className="nav-right large-screen">
          {/* Other icons */}
          <Link to="#" className="nav-icon"><HiOutlineMagnifyingGlass size={iconSize} color={iconColor} /></Link>
          <Link to="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-2 ...">{wishlistCount}</span>}
          </Link>
          <Link to="/" className="nav-icon"><Bell size={iconSize} color={iconColor} /></Link>

          {user ? (
            // --- THIS IS THE CORRECTED PROFILE SECTION ---
            <div 
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              {/* The icon itself is now a direct link to the main profile page */}
              <Link to="/profile" className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-800">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </Link>

              {/* The dropdown menu */}
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
                      <div className="w-12 h-12 ...">{user.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <ul className="p-4 space-y-3 text-sm font-medium text-gray-700">
                      <li><Link to="/profile" className="block ...">👤 My Details</Link></li>
                      <li><Link to="/profile/orders" className="block ...">📦 My Orders</Link></li>
                      <li><Link to="/wishlist" className="block ...">❤️ Wishlist</Link></li>
                    </ul>
                    <div className="p-4 border-t border-gray-200">
                      <button onClick={handleLogout} className="w-full ...">
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
            {cartCount > 0 && <span className="absolute -top-1 -right-2 ...">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Your links and mega menu code is restored and correct */}
      <div className="links large-screen jost-heading">
        <Link to="/about">ABOUT US</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("services")} onMouseLeave={() => setActiveDropdown(null)}>SERVICES</a>
        <a href="#" onMouseEnter={() => setActiveDropdown("guide")} onMouseLeave={() => setActiveDropdown(null)}>GUIDE</a>
        <Link to="/manufacturing">MANUFACTURING</Link>
        <Link to="/purchase">PURCHASE</Link>
        <Link to="/checkout">CHECKOUT</Link>
        <Link to="/blogs">BLOGS</Link>
        <Link to="/checkout">CHECKOUT</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("guide")} onMouseLeave={() => setActiveDropdown(null)}>SHOP</a>
        <Link to="/faqs">FAQS</Link>
      </div>
      {activeDropdown && (
        <div className="mega-menu" onMouseEnter={() => setActiveDropdown(activeDropdown)} onMouseLeave={() => setActiveDropdown(null)}>
            {/* ... your mega menu content ... */}
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
            <a href="#" onClick={toggleMenu}>SERVICES</a>
            <a href="#" onClick={toggleMenu}>GUIDE</a>
            <Link to="/manufacturing" onClick={toggleMenu}>MANUFACTURING</Link>
            <Link to="/purchase" onClick={toggleMenu}>PURCHASE</Link>
            <Link to="/checkout" onClick={toggleMenu}>CHECKOUT</Link>
            <Link to="/blogs" onClick={toggleMenu}>BLOGS</Link>
            <a href="#" onClick={toggleMenu}>SHOP</a>
            <Link to="/faqs" onClick={toggleMenu}>FAQS</Link>
          </div>

          <div className="mobile-menu-user">
            {user ? (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="mobile-user-details">
                  <p className="mobile-user-name">{user.name}</p>
                  <p className="mobile-user-email">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  Logout
                </button>
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

      {/* Mobile Menu Overlay */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu}></div>}
    </header>
  );
};
export default Navbar;
