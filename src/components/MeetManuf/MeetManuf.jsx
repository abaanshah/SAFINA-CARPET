import React from 'react';
import craftsmanship from "../../assets/craftsmanship.png";
import funding from "../../assets/funding.png";
import services from "../../assets/services.png";
import warranty from "../../assets/warranty.png";
import "@fontsource/caveat";

const MeetManuf = () => {
  return (
    <div className="bg-[#FFF5F5] py-16 px-8 mt-20">
      {/* Header */}
      <div className="text-center mb-12 text-5xl">
        <h2 className="caveat-heading text-[#9f1d20] ">
          "MEET MANUFACTURERS DIRECTLY"
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Card 1 - Hand Icon */}
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className=" relative">
              {/* Hand with pink ribbon */}
              <img src={craftsmanship} alt=""  />
              
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
            <div className="relative">
              <img src={funding} alt="" />
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
            <div className=" relative">
             <img src={warranty} alt="" />
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
            <div className=" relative">
            <img src={services} alt="" />
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