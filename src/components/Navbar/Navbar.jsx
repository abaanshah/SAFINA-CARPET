import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null); // store logged-in user
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown

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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    window.location.reload(); // or navigate to home/login
  };

  // Mega menu data
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
          <a href="/">
            <img src={logo} alt="Logo" className="nav-logo" />
          </a>
        </div>

        <div className="nav-right large-screen">
          <a href="#" className="nav-icon">
            <HiOutlineMagnifyingGlass size={iconSize} color={iconColor} />
          </a>
          <a href="#" className="nav-icon">
            <HiOutlineHeart size={iconSize} color={iconColor} />
          </a>
          <a href="#" className="nav-icon">
            <HiOutlineBell size={iconSize} color={iconColor} />
          </a>

          {/* Profile or Login */}
         {/* Profile or Login */}
{user ? (
  <div className="relative">
    {/* Avatar Trigger */}
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

    {/* Dropdown */}
    {profileOpen && (
      <div
        className="absolute right-0 mt-3 w-72 bg-white/80 backdrop-blur-lg 
                   shadow-2xl rounded-2xl overflow-hidden animate-scale-fade z-50"
      >
        {/* Header */}
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

        {/* Links */}
        <ul className="p-4 space-y-3 text-sm font-medium text-gray-700">
          <li>
            <a href="/profile" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
              👤 My Profile
            </a>
          </li>
          <li>
            <a href="/orders" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
              📦 My Orders
            </a>
          </li>
          <li>
            <a href="/wishlist" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
              ❤️ Wishlist
            </a>
          </li>
          <li>
            <a href="/settings" className="block px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition">
              ⚙️ Settings
            </a>
          </li>
        </ul>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-pink-700 
                       text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </div>
) : (
  <a
    href="/login"
    className="nav-icon flex items-center gap-2 hover:opacity-90 transition"
  >
    <HiOutlineUser size={iconSize} color={iconColor} />
    <span className="hidden md:inline text-sm font-medium">Login</span>
  </a>
)}
          <a href="#" className="nav-icon">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
          </a>
        </div>

        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? <HiXMark size={28} color={iconColor} /> : <HiBars3 size={28} color={iconColor} />}
        </button>
      </nav>

      {/* Links */}
      <div className="links large-screen jost-heading">
        <a href="/about">ABOUT US</a>
        <a
          href="#"
          onMouseEnter={() => setActiveDropdown("services")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          SERVICES
        </a>
        <a
          href="#"
          onMouseEnter={() => setActiveDropdown("guide")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          GUIDE
        </a>
        <a
          href="/manufacturing"
          onMouseEnter={() => setActiveDropdown("manufacturing")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          MANUFACTURING
        </a>
        <a href="/purchase">PURCHASE</a>
        <a href="/checkout">CHECKOUT</a>
        <a href="/blogs">BLOGS</a>
        <a href="/faqs">FAQS</a>
      </div>

      {/* Mega Menu */}
      {activeDropdown && (
        <div
          className="mega-menu"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {megaMenuData[activeDropdown].map((section, idx) => (
            <div key={idx} className="mega-section">
              <h3>{section.heading}</h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#">{link}</a>
                  </li>
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
