import React from 'react'
import { FaMapMarkerAlt, FaCalendarAlt,FaSearch, FaHeart, FaBell, FaUser, FaShoppingCart } from 'react-icons/fa';

import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <div className="gps"><FaMapMarkerAlt></FaMapMarkerAlt>  </div>
        <div className="appointment"><FaCalendarAlt/><p>BOOK AN APPOINTMENT</p></div>

      </div>
      <div className="nav-center logo">LOGO</div>
      <div className="nav-right">
        <div className="search"><FaSearch></FaSearch></div>
        <div className="like"><FaHeart></FaHeart></div>
        <div className="bell"><FaBell></FaBell></div>
        <div className="account"><FaUser></FaUser></div>
        <div className="cart"><FaShoppingCart></FaShoppingCart></div>
      </div>
    </nav>
  )
}

export default Navbar