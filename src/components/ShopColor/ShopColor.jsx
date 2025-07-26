import React from 'react'
import './ShopColor.css'
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
const ShopColor = () => {
  return (
    <div className='ShopColor_container'>
        <h1 className='ShopColorHeading'>SAFINA CARPETS</h1>
      
      <div className="woolcol col1"><img src={grayWool} alt="" /></div>
      <div className="woolcol col1"><img src={blueWool} alt="" /></div>
      <div className="woolcol col1"><img src={brownWool} alt="" /></div>
      <div className="woolcol col1"><img src={maroonWool} alt="" /></div>
      <div className="woolcol col1"><img src={lightmaroonWool} alt="" /></div>
      <div className="woolcol col1"><img src={greenWool} alt="" /></div>
      <div className="woolcol col1"><img src={whiteWool} alt="" /></div>
      <div className="woolcol col1"><img src={rgbWool} alt="" /></div>
      <div className="woolcol col1"><img src={halfwhiteWool} alt="" /></div>
      <div className="woolcol col1"><img src={grayishWool} alt="" /></div>
    </div>
  )
}

export default ShopColor
