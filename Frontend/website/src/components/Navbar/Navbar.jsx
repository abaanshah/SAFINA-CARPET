import React, { useState, useEffect, useContext } from "react";

import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // We only need these
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

import { Bell, BellDot, BellElectric, BellOff, ClipboardMinus } from "lucide-react";
import BookAppointmentModal from "../BookAppointment/BookAppointmentModal";
import { motion } from "framer-motion";



const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  // 3. Get currency state and setter from context
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);



  const [profileOpen, setProfileOpen] = useState(false); // This will be controlled by hover
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [mobilePoliciesOpen, setMobilePoliciesOpen] = useState(false);
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

  return (

    <header className={showNavbar ? "show" : "hide"}>
      <nav className="navbar">
        <div className="nav-left">
            <a href="http://localhost:8080/" className="nav-icon"><HiOutlineMapPin size={iconSize} color={iconColor} /></a>
            <a href="#" className="nav-appointment">
                <HiOutlineCalendar size={iconSize} color={iconColor} /><p>BOOK AN APPOINTMENT</p>
            </a>

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
          <Link to="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
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
      </nav>

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
              <li><a href="/catalog?size=3x5ft">3X5 FT</a></li>
              <li><a href="/catalog?size=4x6ft">4X6 FT</a></li>
              <li><a href="/catalog?size=5x7ft">5X7 FT</a></li>
              <li><a href="/catalog?size=6x9ft">6X9 FT</a></li>
              <li><a href="/catalog?size=8x10ft">8X10 FT</a></li>
              <li><a href="/catalog?size=9x12ft">9X12 FT</a></li>
              <li><a href="/catalog?size=10x14ft">10X14 FT</a></li>
              <li><a href="/catalog?size=12x15ft">12X15 FT</a></li>
              <li><a href="/catalog?size=small">SMALL</a></li>
              <li><a href="/catalog?size=medium">MEDIUM</a></li>
              <li><a href="/catalog?size=large">LARGE</a></li>
              <li><a href="/catalog?size=oversize">OVERSIZE</a></li>
            </ul>
          </div>
          
          <div className="mega-section">
            <h3>COLORS</h3>
            <ul>
              <li><a href="/catalog?color=blue">BLUE</a></li>
              <li><a href="/catalog?color=red">RED</a></li>
              <li><a href="/catalog?color=green">GREEN</a></li>
              <li><a href="/catalog?color=yellow">YELLOW</a></li>
              <li><a href="/catalog?color=ivory-white">IVORY / WHITE</a></li>
              <li><a href="/catalog?color=grey">GREY</a></li>
              <li><a href="/catalog?color=black">BLACK</a></li>
              <li><a href="/catalog?color=orange">ORANGE</a></li>
              <li><a href="/catalog?color=pink">PINK</a></li>
              <li><a href="/catalog?color=purple">PURPLE</a></li>
              <li><a href="/catalog?color=brown">BROWN</a></li>
              <li><a href="/catalog?color=beige">BEIGE</a></li>
              <li><a href="/catalog?color=multi-color">MULTI COLOR</a></li>
            </ul>
          </div>

          <div className="mega-section">
            <h3>ROOM</h3>
            <ul>
              <li><a href="/catalog?room=living-room">LIVING ROOM</a></li>
              <li><a href="/catalog?room=dining-room">DINING ROOM</a></li>
              <li><a href="/catalog?room=bedroom">BEDROOM</a></li>
              <li><a href="/catalog?room=kids-room">KIDS ROOM</a></li>
              <li><a href="/catalog?room=outdoor-indoor">OUTDOOR/INDOOR</a></li>
            </ul>
            
            <h3 style={{marginTop: '20px'}}>SHAPE</h3>
            <ul>
              <li><a href="/catalog?shape=rectangle">RECTANGLE</a></li>
              <li><a href="/catalog?shape=irregular">IRREGULAR</a></li>
              <li><a href="/catalog?shape=round">ROUND</a></li>
              <li><a href="/catalog?shape=runner">RUNNER</a></li>
              <li><a href="/catalog?shape=oval">OVAL</a></li>
              <li><a href="/catalog?shape=square">SQUARE</a></li>
            </ul>
          </div>

          <div className="mega-section">
            <h3>MATERIAL</h3>
            <ul>
              <li><a href="/catalog?material=wool">WOOL</a></li>
              <li><a href="/catalog?material=wool-bamboo-silk">WOOL & BAMBOO SILK</a></li>
              <li><a href="/catalog?material=wool-silk">WOOL & SILK</a></li>
              <li><a href="/catalog?material=silk">SILK</a></li>
              <li><a href="/catalog?material=viscose">VISCOSE</a></li>
              <li><a href="/catalog?material=jute-hemp">JUTE & HEMP</a></li>
              <li><a href="/catalog?material=cotton">COTTON</a></li>
              <li><a href="/catalog?material=polyester">POLYESTER</a></li>
              <li><a href="/catalog?material=afghan-wool">AFGHAN WOOL</a></li>
              <li><a href="/catalog?material=acrylic">ACRYLIC</a></li>
              <li><a href="/catalog?material=bamboo-silk-zari">BAMBOO SILK AND ZARI</a></li>
            </ul>
          </div>

          <div className="mega-section">
            <h3>CONSTRUCTION</h3>
            <ul>
              <li><a href="/catalog?construction=hand-knotted">HAND KNOTTED</a></li>
              <li><a href="/catalog?construction=hand-tufted">HAND TUFTED</a></li>
              <li><a href="/catalog?construction=hand-loom">HAND LOOM</a></li>
              <li><a href="/catalog?construction=flat-weaves">FLAT WEAVES</a></li>
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
            
            {/* Mobile SHOP Link */}
            <Link to="/shop" onClick={toggleMenu}>SHOP</Link>

            <a href="#" onClick={toggleMenu}>SERVICES</a>
            <a href="#" onClick={toggleMenu}>GUIDE</a>
            <Link to="/manufacturing" onClick={toggleMenu}>MANUFACTURING</Link>
            
            {/* Mobile POLICIES Dropdown */}
            <div className="mobile-dropdown">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => setMobilePoliciesOpen(!mobilePoliciesOpen)}
              >
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
      
      {/* Book Appointment Modal */}
      <BookAppointmentModal 
        isOpen={appointmentModalOpen} 
        onClose={() => setAppointmentModalOpen(false)} 
      />
    </header>
  );
};
export default Navbar;

