// ===================================================================
// FILE: src/routes/AppRoutes.jsx (Updated)
// ===================================================================
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
import Faqs from "../pages/Faqs/Faqs";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guide" element={<Guide />} />
        
        {/* *** THE FIX IS HERE *** */}
        {/* This route now accepts a unique product ID */}
        <Route path="/purchase/:productId" element={<Purchase />} />

        <Route path="/services" element={<Services />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;