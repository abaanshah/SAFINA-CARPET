import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// Admin Pages
import Categories from "../pages/Admin/Categories";
import  Products  from "../pages/Admin/Products";
import {Orders} from "../pages/Admin/Orders";
import {Customers} from "../pages/Admin/Customers";
import {CustomerFavorites} from "../pages/Admin/CustomerFavorites";
import {MailInbox} from "../pages/Admin/MailInbox";
import {Chat} from "../pages/Admin/Chat";
import {MeetingSchedule} from "../pages/Admin/MeetingSchedule";
import {Settings} from "../pages/Admin/Settings";
import {AdminDashboard} from "../pages/Admin/AdminDashboard";

// Layout for Admin
import AdminLayout from "../Layouts/AdminLayout";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/services" element={<Services />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/blogs" element={<Blogs />} />
        </Route>

        {/* Admin Panel Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customer-favorites" element={<CustomerFavorites />} />
          <Route path="mail-inbox" element={<MailInbox />} />
          <Route path="chat" element={<Chat />} />
          <Route path="meeting-schedule" element={<MeetingSchedule />} />
          <Route
            path="custom-requests"
            element={
              <div className="p-6">Custom Requests Page Coming Soon</div>
            }
          />
          <Route
            path="messages"
            element={<div className="p-6">Messages Page Coming Soon</div>}
          />
          <Route
            path="international"
            element={
              <div className="p-6">International Clients Page Coming Soon</div>
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
