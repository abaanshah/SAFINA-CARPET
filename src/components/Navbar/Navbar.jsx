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
  const [activeDropdown, setActiveDropdown] = useState(null); // Which mega menu is open

  const iconSize = 24;
  const iconColor = "white";

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
          <a href="#" className="nav-icon">
            <HiOutlineMapPin size={iconSize} color={iconColor} />
          </a>
          <a href="#" className="nav-appointment">
            <HiOutlineCalendar size={iconSize} color={iconColor} />
            <p>BOOK AN APPOINTMENT</p>
          </a>
        </div>

        <div className="nav-center">
          <img src={logo} alt="Logo" className="nav-logo" />
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
          <a href="http://localhost:8080/" className="nav-icon">
            <HiOutlineUser size={iconSize} color={iconColor} />
          </a>
          <a href="#" className="nav-icon">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
          </a>
        </div>

        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? (
            <HiXMark size={28} color={iconColor} />
          ) : (
            <HiBars3 size={28} color={iconColor} />
          )}
        </button>
      </nav>

      <div className="links large-screen jost-heading ">
        <a href="/about">ABOUT US</a>
        <a href="/dashboard">DASHBOARD</a>
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
        <a href="/manufacturing"
        //  href="#"
         onMouseEnter={() => setActiveDropdown("manufacturing")}
         onMouseLeave={() => setActiveDropdown(null)}
       
        
        >MANUFACTURING</a>
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
