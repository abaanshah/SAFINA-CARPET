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
    // --- 2. Using the imported image as a background ---
    <div 
      className='w-full min-h-screen text-white flex flex-col items-center justify-center p-4 md:p-8 relative'
      style={{
        backgroundImage: `url(${rugvisualbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 3. Added an overlay for text readability */}
      <div className="absolute inset-0 bg-[#660002] opacity-80"></div>
      
      <div className="relative z-10 w-full">
        <h1 className='text-5xl md:text-6xl font-extrabold text-amber-50 text-center mb-12'>
          Rug Visualizer
        </h1>

        <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12'>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className='relative w-full lg:w-8/12 aspect-[4/3] rounded-xl overflow-hidden'
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide]}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 1.2, ease: 'easeInOut' },
                }}
                className='absolute w-full h-full object-contain'
              />
            </AnimatePresence>
            
            <button 
              onClick={() => setSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)} 
              className='absolute top-1/2 left-4 -translate-y-1/2 bg-red-900/50 p-3 rounded-full text-white hover:bg-red-900/80 transition z-20'
            >
              <ArrowLeft size={28} />
            </button>
            <button 
              onClick={() => setSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)} 
              className='absolute top-1/2 right-4 -translate-y-1/2 bg-red-900/50 p-3 rounded-full text-white hover:bg-red-900/80 transition z-20'
            >
              <ArrowRight size={28} />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='w-full lg:w-4/12 text-center lg:text-left'
          >
            <div className='flex items-center justify-center lg:justify-start gap-2 text-sm font-bold uppercase tracking-widest text-red-300 mb-4'>
              <BrainCircuit size={16} />
              <span>Powered by Safina AI</span>
            </div>
            <p className='text-lg leading-relaxed'>
              Instantly visualize rugs in your space with AI-powered photorealistic previews. Make confident decisions with a realistic view of your room.
            </p>
            <button
              onClick={() => setIsVisualizerOpen(true)}
              className='group mt-6 bg-white text-[#660002] px-8 py-4 rounded-lg text-lg font-bold transition-all hover:bg-amber-50 hover:shadow-xl flex items-center gap-3 mx-auto lg:mx-0'
            >
              <Sparkles />
              Try The AI Visualizer
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVisualizerOpen && <VisualizerContainer onClose={() => setIsVisualizerOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default RugVisual;