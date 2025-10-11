import React from 'react';
import craftsmanship from "../../assets/craftsmanship.png";
import funding from "../../assets/funding.png";
import services from "../../assets/services.png";
import warranty from "../../assets/warranty.png";
import "@fontsource/caveat";

const MeetManuf = () => {
  return (
    <div className="bg-[#FFF5F5] py-10 px-8 ">
      {/* Header */}
      <div className="text-center mb-12 text-5xl">
        <h2 className="caveat-heading text-[#9f1d20] ">
          "MEET MANUFACTURERS DIRECTLY"
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        
        {/* Card 1 - Hand Icon */}
        <div className="bg-white rounded-lg p-4 md:p-8 text-center shadow-sm">
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="border-b-1 pb-2 md:pb-3.5 border-black relative">
              {/* Hand with pink ribbon */}
              <img src={craftsmanship} alt="" className="w-8 h-8 md:w-auto md:h-auto" />
              
            </div>
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors text-xs md:text-base">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 2 - Money Icon */}
        <div className="bg-white rounded-lg p-4 md:p-8 text-center shadow-sm">
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="bg-white border-b-1 pb-2 md:pb-3 border-black relative">
              <img src={funding} alt="" className="w-8 h-8 md:w-auto md:h-auto" />
            </div>
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors text-xs md:text-base">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 3 - Shield Icon */}
        <div className="bg-white rounded-lg p-4 md:p-8 text-center shadow-sm">
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="border-b-1 pb-2 md:pb-3 border-black relative">
             <img src={warranty} alt="" className="w-8 h-8 md:w-auto md:h-auto" />
            </div>
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
            Heirloom<br />Craftsmanship
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
            We are proud to champion<br />artisanal techniques.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors text-xs md:text-base">
            Craftsmanship <span className="ml-2">→</span>
          </button>
        </div>

        {/* Card 4 - Heart Icon */}
        <div className="bg-white rounded-lg p-4 md:p-8 text-center shadow-sm">
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="border-b-1 pb-2 md:pb-3 border-black relative">
            <img src={services} alt="" className="w-8 h-8 md:w-auto md:h-auto"/>
            </div>
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
            A Truly Personal<br />Service
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
            We will help you find your dream<br />rug.
          </p>
          <button className="text-gray-800 font-medium flex items-center justify-center mx-auto hover:text-gray-600 transition-colors text-xs md:text-base">
            All our services <span className="ml-2">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MeetManuf;