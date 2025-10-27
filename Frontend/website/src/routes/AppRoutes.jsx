// ✅ FILE: src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import { AboutUs } from "../pages/AboutUs/AboutUs";
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
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import ReturnRefundPolicy from "../pages/ReturnRefundPolicy/ReturnRefundPolicy";
import ShippingPolicy from "../pages/ShippingPolicy/ShippingPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Shop from "../pages/Shop/Shop";
import ProfileLayout from "../pages/Profile/ProfileLayout";
import ProfileDetail from "../pages/Profile/ProfileDetails";
import Orders from "../pages/Profile/Order";
import OrderConfirmation from "../pages/Profile/OrderConfirmation";
import Addresses from "../pages/Profile/Addresses";
import Settings from "../pages/Profile/Settings";
import AuthCallback from "../pages/Login/AuthCallback";

function AppRoutes() {
  return (
    <Routes>
      {/* ⚡ Keep AuthCallback OUTSIDE MainLayout */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Everything else stays inside MainLayout */}
      <Route element={<MainLayout />}>
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
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} />

        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/orders"
          element={<Navigate to="/profile/orders" replace />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
