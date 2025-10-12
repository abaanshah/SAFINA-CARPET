import React, { useState, useEffect } from 'react';
import './Hero.css';
import bgvideo from '../../assets/rugbg.mp4';
import Chatbot from '../Chatbot/Chatbot';
import WhatsApp from '../WhatsApp/WhatsApp';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll button when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='hero'>
      <div className="hero_vid_overlay"></div>
      <video src={bgvideo} autoPlay muted loop playsInline></video>
      <div className="hero-container">
        <h1>WELCOME TO SAFINA CARPET</h1>
        <h2>HANDMADE & MACHINEMADE RUGS</h2>
        <button>SHOP NOW</button>
      </div>
      <Chatbot />
      <WhatsApp />
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      )}
    </div>
  );
};

export default Hero;
