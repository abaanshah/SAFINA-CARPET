import React from 'react';

const MeetManuf = () => {
  return (
    <div className="bg-[#FFF5F5] py-16 px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 italic">
          "MEET MANUFACTURERS DIRECTLY"
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Card 1 - Hand Icon */}
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 relative">
              {/* Hand with pink ribbon */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Pink ribbon */}
                <path d="M20 30 Q15 25 25 20 Q35 15 40 25 Q45 35 35 40 Q25 45 20 35 Z" 
                      fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.7"/>
                {/* Hand outline */}
                <path d="M30 20 C32 18 35 18 37 20 L37 35 L40 32 C42 30 45 30 47 32 C49 34 49 37 47 39 L45 41 L48 38 C50 36 53 36 55 38 C57 40 57 43 55 45 L52 48 L55 45 C57 43 60 43 62 45 C64 47 64 50 62 52 L45 70 C43 72 40 72 38 70 L25 57 C23 55 23 52 25 50 L30 45 Z" 
                      fill="none" stroke="#1f2937" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 2 - Money Icon */}
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Hand holding money */}
                <path d="M20 60 L35 60 L40 55 L55 55 L60 60 L75 60 C77 60 79 62 79 64 L79 70 C79 72 77 74 75 74 L25 74 C23 74 21 72 21 70 L21 64 C21 62 23 60 25 60 Z" 
                      fill="none" stroke="#1f2937" strokeWidth="2"/>
                {/* Dollar coins */}
                <circle cx="35" cy="35" r="12" fill="none" stroke="#1f2937" strokeWidth="2"/>
                <text x="35" y="40" textAnchor="middle" className="text-xs font-bold fill-gray-800">$</text>
                <circle cx="55" cy="30" r="8" fill="none" stroke="#1f2937" strokeWidth="2"/>
                <text x="55" y="34" textAnchor="middle" className="text-xs font-bold fill-gray-800">$</text>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 3 - Shield Icon */}
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Shield */}
                <path d="M50 15 C35 20 35 30 35 45 C35 65 50 80 50 80 C50 80 65 65 65 45 C65 30 65 20 50 15 Z" 
                      fill="none" stroke="#1f2937" strokeWidth="2"/>
                {/* Checkmark */}
                <path d="M42 45 L47 50 L58 35" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Sparkles */}
                <circle cx="70" cy="25" r="1.5" fill="#1f2937"/>
                <path d="M68 30 L72 30 M70 28 L70 32" stroke="#1f2937" strokeWidth="1"/>
                <circle cx="30" cy="35" r="1" fill="#1f2937"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 4 - Heart Icon */}
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Hand */}
                <path d="M25 60 C25 58 27 56 29 56 L35 56 L40 51 L55 51 L60 56 L66 56 C68 56 70 58 70 60 L70 75 C70 77 68 79 66 79 L29 79 C27 79 25 77 25 75 Z" 
                      fill="none" stroke="#1f2937" strokeWidth="2"/>
                {/* Heart */}
                <path d="M40 25 C37 20 30 20 30 28 C30 28 30 35 40 45 C50 35 50 28 50 28 C50 20 43 20 40 25 Z" 
                      fill="none" stroke="#f472b6" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            A Truly Personal<br />Service
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            We will help you find your dream<br />rug.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors">
            All our services <span className="ml-2">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MeetManuf;