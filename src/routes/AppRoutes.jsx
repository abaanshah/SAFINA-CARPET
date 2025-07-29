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



function AppRoutes() {
  return (
    <Router>
      <MainLayout >
      <Routes>
        {/* Public Layout */}
        <Route >
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
      </Routes>
      </MainLayout>
    </Router>
  );
}

export default AppRoutes;
