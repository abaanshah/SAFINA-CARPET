// ===================================================================
// FILE: src/routes/AppRoutes.jsx (Updated with Profile & Order Routes)
// ===================================================================
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Home from "../pages/Home/Home";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import MainLayout from "../Layouts/MainLayout";
import Manufacturing from "../pages/Manufacturing/Manufacturing";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Guide } from "../pages/Guide/Guide";
import { Purchase } from "../pages/Purchase/Purchase";
import { Services } from "../pages/Services/Services";
import Blogs from "../pages/Blogs/Blogs";
import Catalog from "../pages/Catalog/Catalog";
import Login from "../pages/Login/Login";
import VerifyEmail from "../pages/Login/VerifyEmail";
import Wishlist from "../pages/Wishlist/Wishlist";
import Faqs from "../pages/Faqs/Faqs";
import Checkout from "../pages/Checkout/Checkout";
import Cart from "../pages/Cart/Cart";

// --- Profile ---
import ProfileLayout from "../pages/Profile/ProfileLayout";
import ProfileDetail from "../pages/Profile/ProfileDetails"; 
import Orders from "../pages/Profile/Order";            
import OrderConfirmation from "../pages/Profile/OrderConfirmation"; 
import Addresses from "../pages/Profile/Addresses"; 
import Settings from "../pages/Profile/Settings";   
function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/purchase/:productId" element={<Purchase />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />

        {/* --- 2. ADD THE NEW ROUTES --- */}

        {/* Route for the "Thank You" page after an order is placed */}
        <Route path="/order/:orderId" element={<OrderConfirmation />} />

        {/* Nested structure for the entire profile section */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileDetail />} />   {/* Shows at /profile */}
          <Route path="orders" element={<Orders />} />    {/* Shows at /profile/orders */}
          <Route path="addresses" element={<Addresses />} /> {/* Shows at /profile/addresses */}
          <Route path="settings" element={<Settings />} />   {/* Shows at /profile/settings */}
        </Route>
        
        {/* Redirect for any old links pointing to /orders */}
        <Route path="/orders" element={<Navigate to="/profile/orders" replace />} />
        
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;