import React, { useState, useEffect } from 'react';
import rugvisual from '../../assets/rugvisual.jpeg';

const VisualizerContainer = ({ onClose }) => {
  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[1000] animate-fadeInOverlay'>
      <div className='relative w-full h-full bg-white overflow-hidden animate-slideDownPopUp'>
        <button className='absolute top-22 right-10 bg-red-800 text-3xl text-amber-50 cursor-pointer z-[1001] shadow-md rounded-full w-10 h-10 flex items-center justify-center' onClick={onClose}>
          &times;
        </button>
        <iframe
          src="http://localhost:8080"
          title="Rug Visualizer"
          className='w-full h-full border-none'
        ></iframe>
      </div>
    </div>
  );
};

const RugVisual = () => {
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  const toggleVisualizer = () => {
    setIsVisualizerOpen(!isVisualizerOpen);
  };

  return (
    <div className='w-full h-screen bg-[#660002] flex items-center justify-center'>
      <div className='w-full h-full flex justify-center items-center relative'>
        {/* Left Arrow */}
        <div className="absolute top-1/2 left-2 md:left-5 -translate-y-1/2 z-10 cursor-pointer text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 md:w-24 md:h-24 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
          </svg>
        </div>

        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/0 z-[1] pointer-events-none'></div>

        {/* Text Section */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white max-w-[80%] md:max-w-[30%] z-[2] text-center md:text-left md:left-[12%] md:translate-x-0'>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 md:mb-12 leading-none">
            RUG <br />
            VISUALIZATION
          </h1>
          <p className="text-lg leading-tight ml-3 hidden md:block">
            You asking for a visualization of how a SAFINA CARPETS rug would
            look in a room? If so, let me know the type of room (living room,
            bedroom, office, etc.) and the style of carpet you'd like to see
            (Persian, Mughal, modern, etc.), and I'll generate an image for you.
          </p>
          <button
            onClick={toggleVisualizer}
            className="mt-6 md:mt-12 ml-0 md:ml-3 text-white border border-white px-6 py-2 rounded-2xl cursor-pointer text-lg transition-colors hover:bg-[#660002] hover:border-[#660002]"
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
        <div className="absolute top-1/2 right-2 md:right-5 -translate-y-1/2 z-10 cursor-pointer text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 md:w-24 md:h-24 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </div>
      </div>

      {isVisualizerOpen && <VisualizerContainer onClose={toggleVisualizer} />}
    </div>
  );
};

export default RugVisual;
