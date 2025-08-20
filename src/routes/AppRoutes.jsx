import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import MainLayout from "../Layouts/MainLayout";
import Manufacturing from "../pages/Manufacturing/Manufacturing";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Guide } from "../pages/Guide/Guide";
import { Purchase } from "../pages/Purchase/Purchase";
import { Services } from "../pages/Services/Services";
import { CheckOut } from "../pages/Checkout/Checkout";
import Blogs from "../pages/Blogs/Blogs";
import Catalog from "../pages/Catalog/Catalog";
import Login from "../pages/Login/Login";
import VerifyEmail from "../pages/Login/VerifyEmail";
import Wishlist from "../pages/Wishlist/Wishlist";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        {/* You can remove this extra wrapping <Route> if not needed */}
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/services" element={<Services />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;