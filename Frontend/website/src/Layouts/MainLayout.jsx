import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet

// import Cart from "../components/cart/cart"; 

function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. The 'noNavFooter' logic is no longer needed here,
  // because your new AppRoutes.jsx handles this perfectly.

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* 3. The 'pt-[50px]' is now applied to the main content */}
      <main className="flex-grow pt-[50px]">
        {/* 4. 'Outlet' tells React Router where to render all the nested pages */}
        <Outlet />
      </main>

      <Footer />

      {/* <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </div>
  );
}

export default MainLayout;

