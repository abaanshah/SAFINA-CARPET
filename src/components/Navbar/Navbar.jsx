import React from 'react'
import{FiMapPin,FiSearch,FiShoppingCart,FiCalendar}from 'react-icons/fi'
import { FaCalendarAlt, FaRegHeart, FaRegBell, FaRegUser, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css' //single . means same folder im working
import logo from '../../assets/logo.jpg' // ../ means one level up from current folder

const n=25;
const col='#ddd';
const Navbar = () => {
   return (
    <header>
    <nav>
      <div className="nav-left">
        <div className="gps"><a href=""><FiMapPin opacity={0.8} color={col} size={n}/>  </a></div>
        <div className="appointment"><a href=""><FiCalendar opacity={0.8} color={col} size={n}/><p>BOOK AN APPOINTMENT</p></a></div>
      </div>
      <div className="nav-center nav-logo"><img src={logo} alt="" /></div>
      <div className="nav-right">
        <div className="search"><a href=""><FiSearch opacity={0.8} color={col}size={n}/></a></div>
        <div className="like"><a href=""><FaRegHeart opacity={0.8} color={col} size={n}/></a></div>
        <div className="bell"><a href=""><FaRegBell opacity={0.8} color={col} size={n}/></a></div>
        <div className="account"><a href="http://localhost:8080/"><FaRegUser opacity={0.8} color={col} size={n}/></a></div>
        <div className="cart"><a href=""><FiShoppingCart opacity={0.8} color={col} size={n}/></a></div>
      </div>
    </nav>
    <div className="links">
      <a href="/about">ABOUT US</a>
      <a href="/dashboard">DASHBOARD</a>
      <a href="/services">SERVICES</a>
      <a href="/guide">GUIDE</a>
      <a href="/manufacturing">MANUFACTURING</a>
      <a href="/purchase">PURCHASE</a>
      <a href="/checkout">CHECKOUT</a>
      <a href="/blogs">BLOGS</a>
      <a href="/faqs">FAQS</a>
    </div>
    </header>
  )
}

export default Navbar;