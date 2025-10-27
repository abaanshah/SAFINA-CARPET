import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useLocation, Outlet } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  const noNavFooter = location.pathname === "/login"; // hide for login page

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooter && <Navbar />}

      <main className={`flex-grow ${!noNavFooter ? "pt-[50px]" : ""}`}>
        {/* 👇 This is where page content will render */}
        <Outlet />
      </main>

      {!noNavFooter && <Footer />}
    </div>
  );
}

export default MainLayout;
