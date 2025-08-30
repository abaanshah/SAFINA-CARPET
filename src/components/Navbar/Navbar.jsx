// ===================================================================
// FILE: Navbar.jsx (Complete and Final Version)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // --- 1. Link is imported ---
import {
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineBell,
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

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // --- 2. 'openCart' is removed as it's no longer needed ---
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const iconSize = 24;
  const iconColor = "white";

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const megaMenuData = {
    services: [
      { heading: "Design", links: ["UI/UX", "Branding", "Graphics"] },
      { heading: "Development", links: ["Web Apps", "Mobile Apps", "APIs"] },
      { heading: "Marketing", links: ["SEO", "Ads", "Email"] },
    ],
    guide: [
      { heading: "Getting Started", links: ["Intro", "Setup", "Basics"] },
      { heading: "Advanced", links: ["Optimization", "Integrations", "Scaling"] },
    ],
    manufacturing: [
      { heading: "Products", links: ["Electronics", "Furniture", "Clothing"] },
      { heading: "Services", links: ["Consulting", "Support", "Training"] },
    ],
  };

  return (
    <header className={showNavbar ? "show" : "hide"}>
      <nav className="navbar">
        <div className="nav-left">
          <a href="http://localhost:8080/" className="nav-icon">
            <HiOutlineMapPin size={iconSize} color={iconColor} />
          </a>
          <a href="#" className="nav-appointment">
            <HiOutlineCalendar size={iconSize} color={iconColor} />
            <p>BOOK AN APPOINTMENT</p>
          </a>
        </div>

        <div className="nav-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="nav-logo" />
          </Link>
        </div>

        <div className="nav-right large-screen">
          <a href="#" className="nav-icon">
            <HiOutlineMagnifyingGlass size={iconSize} color={iconColor} />
          </a>
          <Link to="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <a href="#" className="nav-icon">
            <HiOutlineBell size={iconSize} color={iconColor} />
          </a>

          {user ? (
            <div className="relative">
              <div
                className="cursor-pointer flex items-center gap-2 group"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-800">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden animate-scale-fade z-50">
                  <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-500 to-pink-700 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-800">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <ul className="p-4 space-y-3 text-sm font-medium text-gray-700">
                    <li><Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">👤 My Profile</Link></li>
                    <li><Link to="/orders" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">📦 My Orders</Link></li>
                    <li><Link to="/wishlist" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">❤️ Wishlist</Link></li>
                    <li><Link to="/settings" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">⚙️ Settings</Link></li>
                  </ul>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-700 text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-icon flex items-center gap-2 hover:opacity-90 transition">
              <HiOutlineUser size={iconSize} color={iconColor} />
              <span className="hidden md:inline text-sm font-medium">Login</span>
            </Link>
          )}

          {/* --- 3. This is now a Link to the /cart page --- */}
          <Link to="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? <HiXMark size={28} color={iconColor} /> : <HiBars3 size={28} color={iconColor} />}
        </button>
      </nav>

      {/* --- THIS IS YOUR ORIGINAL CODE, NOW RESTORED --- */}
      <div className="links large-screen jost-heading">
        <Link to="/about">ABOUT US</Link>
        <a href="#" onMouseEnter={() => setActiveDropdown("services")} onMouseLeave={() => setActiveDropdown(null)}>SERVICES</a>
        <a href="#" onMouseEnter={() => setActiveDropdown("guide")} onMouseLeave={() => setActiveDropdown(null)}>GUIDE</a>
        <Link to="/manufacturing">MANUFACTURING</Link>
        <Link to="/purchase">PURCHASE</Link>
        <Link to="/checkout">CHECKOUT</Link>
        <Link to="/blogs">BLOGS</Link>
        <Link to="/faqs">FAQS</Link>
      </div>

      {activeDropdown && (
        <div className="mega-menu" onMouseEnter={() => setActiveDropdown(activeDropdown)} onMouseLeave={() => setActiveDropdown(null)}>
          {megaMenuData[activeDropdown].map((section, idx) => (
            <div key={idx} className="mega-section">
              <h3>{section.heading}</h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;