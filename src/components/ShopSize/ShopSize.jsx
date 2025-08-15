import React from "react";
import { useNavigate } from "react-router-dom";

const sizes = [
  "3x5","4x6","5x7","6x9","7x10","8x10","9x12","10x14","11x15","12x18","14x20","16x24"
];

// Static demo carpet image that will always load
const demoImage = "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930";

export default function ShopBySize() {
  const navigate = useNavigate();

  const handleClick = (size) => {
    navigate(`/catalog?size=${size}`);
  };

  return (
    <div className="px-6 py-12 bg-[#E5E5E5]">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        SHOP BY SIZE
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => handleClick(size)}
            className="cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-101 transition-all duration-300 overflow-hidden"
          >
            {/* Top image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={demoImage}
                alt="Carpet Demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Bottom info */}
            <div className="p-4 flex flex-col items-center justify-center bg-white">
              <span className="text-xl font-bold text-gray-800">{size}</span>
              <p className="text-gray-700 text-xl mt-1">Rug Size</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">Starting from ₹2,500</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
