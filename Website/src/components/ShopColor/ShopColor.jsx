import React from 'react'
import './ShopColor.css'
import { useNavigate } from 'react-router-dom'
import blueWool from '../../assets/Wools/blue.png'
import grayWool from '../../assets/Wools/gray.png'
import whiteWool from '../../assets/Wools/white.png'
import brownWool from '../../assets/Wools/brown.png'
import grayishWool from '../../assets/Wools/grayish.png'
import greenWool from '../../assets/Wools/green.png'
import halfwhiteWool from '../../assets/Wools/halfwhite.png'
import lightmaroonWool from '../../assets/Wools/lightmaroon.png'
import maroonWool from '../../assets/Wools/maroon.png'
import rgbWool from '../../assets/Wools/rgb.png'
import "@fontsource/crimson-text";

const ShopColor = () => {
  const navigate = useNavigate();

  const handleClick = (colorName) => {
    navigate(`/catalog?color=${colorName}`);
  }

  return (
    <div className='ShopColor_container'>
      <h2 className="w-full text-center text-3xl font-bold">SHOP BY COLOR</h2>
      <h1 className='ShopColorHeading crimson-heading'>SAFINA CARPETS</h1>      
      <div className="woolcol col1" onClick={() => handleClick("Gray")}><img src={grayWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Blue")}><img src={blueWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Brown")}><img src={brownWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Maroon")}><img src={maroonWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Light Maroon")}><img src={lightmaroonWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Green")}><img src={greenWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("White")}><img src={whiteWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("RGB")}><img src={rgbWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Half White")}><img src={halfwhiteWool} alt="" /></div>
      <div className="woolcol col1" onClick={() => handleClick("Grayish")}><img src={grayishWool} alt="" /></div>
    </div>
  )
}

export default ShopColor
