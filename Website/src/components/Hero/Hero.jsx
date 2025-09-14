import React from 'react'
import './Hero.css'
import bgvideo from '../../assets/rugbg.mp4'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero_vid_overlay"></div>
    <video src={bgvideo} autoPlay muted loop playsInline></video>
    <div className="hero-container">
      <h1>WELCOME TO SAFINA CARPET</h1>
      <h2>HANDMADE & MACHINEMADE RUGS</h2>
      <button>SHOP NOW</button>
    </div>
    </div>
  )
}

export default Hero
