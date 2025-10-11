import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import Cart from "../components/cart/cart"; // make sure path is correct

function MainLayout({ children }) {
  const location = useLocation();
  const noNavFooter = location.pathname === "/login"; // hide for login page
  const [showNavbar, setShowNavbar] = useState(true);
  const isHomePage = location.pathname === "/";

  // state for cart visibility
  // const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle scroll behavior for home page
  useEffect(() => {
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

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooter && (
        <Navbar onCartClick={() => setIsCartOpen(true)} />
      )}

      <main className={`flex-grow ${!noNavFooter && showNavbar ? "pt-[120px]" : ""}`}>
        {children}
      </main>

      {!noNavFooter && <Footer />}

      {/* Cart overlay (fixed, always rendered at root level) */}
      {/* <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </div>
  );
}

export default MainLayout;
