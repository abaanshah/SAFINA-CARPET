import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';

// --- Importing all necessary assets ---
import rugdining1 from '../../assets/RugVisual/rugdining1.jpg';
import rugdining2 from '../../assets/RugVisual/rugdining2.jpg';
import rugdining3 from '../../assets/RugVisual/rugdining3.jpg';
import rugdining4 from '../../assets/RugVisual/rugdining4.jpg';
import rugdining5 from '../../assets/RugVisual/rugdining5.jpg';



import rugvisualbg from '../../assets/RugVisual/rugvisualbg.jpg';

const slides = [rugdining5, rugdining2, rugdining4, rugdining3,rugdining1];

const VisualizerContainer = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000]'>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='relative w-full h-full md:w-[95%] md:h-[95%] max-w-7xl bg-white overflow-hidden rounded-xl shadow-2xl'
      >
        <button 
          type="button" 
          className='absolute top-4 right-4 bg-black/40 text-white hover:bg-black transition-colors z-[1001] rounded-full w-10 h-10 flex items-center justify-center text-2xl' 
          onClick={onClose}
          aria-label="Close Visualizer"
        >
          &times;
        </button>
        <iframe
          src="http://localhost:8090"
          title="Rug Visualizer"
          className='w-full h-full border-none'
        ></iframe>
      </motion.div>
    </div>
  );
};

const RugVisual = () => {
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const setSlide = (newSlide) => {
    resetTimeout();
    setCurrentSlide(newSlide);
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 2500);
    return () => resetTimeout();
  }, [currentSlide]);

  const variants = {
    enter: { opacity: 0 },
    center: { zIndex: 1, opacity: 1 },
    exit: { zIndex: 0, opacity: 0 },
  };

  return (
    <div className='w-full h-screen bg-[#660002] flex items-center justify-center'>
      <div className='w-full h-full flex justify-center items-center relative'>
        {/* Left Arrow */}
        <div className="absolute top-1/2 left-5 -translate-y-1/2 z-10 cursor-pointer text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
          </svg>
        </div>

        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/0 z-[1] pointer-events-none'></div>

        {/* Text Section */}
        <div className='absolute top-1/2 left-[12%] -translate-y-1/2 text-white max-w-[30%] z-[2]'>
          <h1 className="text-7xl font-extrabold mb-12 leading-none">
            RUG <br />
            VISUALIZATION
          </h1>
          <p className="text-lg leading-tight ml-3">
            You asking for a visualization of how a SAFINA CARPETS rug would
            look in a room? If so, let me know the type of room (living room,
            bedroom, office, etc.) and the style of carpet you'd like to see
            (Persian, Mughal, modern, etc.), and I'll generate an image for you.
          </p>
          <button
            onClick={toggleVisualizer}
            className="mt-12 ml-3 text-white border border-white px-6 py-2 rounded-2xl cursor-pointer text-lg transition-colors hover:bg-[#660002] hover:border-[#660002]"
          >
            Try Now
          </button>
        </div>

        {/* Background Image */}
        <img
          src={rugvisual}
          alt="Rug visualization room"
          className="w-[92%] h-[85%] rounded-3xl object-cover object-center"
        />

        {/* Right Arrow */}
        <div className="absolute top-1/2 right-5 -translate-y-1/2 z-10 cursor-pointer text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isVisualizerOpen && <VisualizerContainer onClose={() => setIsVisualizerOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default RugVisual;

