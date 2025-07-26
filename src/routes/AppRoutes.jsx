import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import {AboutUs} from "../pages/AboutUs/AboutUs";
import MainLayout from "../Layouts/MainLayout";
import Manufacturing from "../pages/Manufacturing/Manufacturing";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Guide } from "../pages/Guide/Guide";


function AppRoutes() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guide" element={<Guide />} />
          {/* Add more routes as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default AppRoutes;
