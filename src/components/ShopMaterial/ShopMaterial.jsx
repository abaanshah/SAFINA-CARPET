import React from 'react'
import './ShopMaterial.css'
import { ArrowUpRight } from 'lucide-react';
import handmade from '../../assets/handmade.png';
import staple from '../../assets/staple.png'
import machinemade from '../../assets/machinemade.png';
// import toprightarr from '../../assets/topright_arrow.png'
const ShopMaterial = () => {
  return (
    <div className="shopmaterial_container">
    <h1 className="shopmaterial_heading">SHOP BY MATERIAL</h1>
    <div className="shopmaterial_slider">
      <div className="slider_card bg-[#26425E]">
        <div className="material_heading">
          <img src={handmade} alt="" />
        <h2>Hand Made</h2>
        </div>
      <button><p>Shop Collection</p> <ArrowUpRight/>
        </button>
        </div>
      <div className="slider_card bg-[#891322]">
      <div className="material_heading">
        <img src={staple} alt="" />
        <h2>Staple</h2>
        </div>
      <button><p>Shop Collection</p> <ArrowUpRight/>
        </button>
        </div>
      <div className="slider_card bg-[#684D26]">
      <div className="material_heading">
        <img src={machinemade} alt="" />
        <h2>Machine Made</h2>
        </div>
      <button><p>Shop Collection</p> <ArrowUpRight/>
        </button>
        </div>
     
    </div>
  </div>
  
  )
}

export default ShopMaterial
