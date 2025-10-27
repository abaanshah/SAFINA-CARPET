// ===================================================================
// FILE: src/pages/ShopBySize.jsx (Redesigned)
// -------------------------------------------------------------------
// This is the redesigned component with a professional UI, animations,
// and the heading inside the section as requested.
// ===================================================================
import React from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";

const sizes = [
  "3x5",
  "4x6",
  "5x7",
  "6x9",
  "7x10",
  "8x10",
  "9x12",
  "10x14",
  "11x15",
  "12x18",
  "14x20",
  "16x24",
];

// Using your preferred demo image
const demoImage =
  "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550007_3.jpg?v=1753537930";

export default function ShopBySize() {
  const navigate = useNavigate();

  const handleClick = (size) => {
    navigate(`/catalog?size=${size}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16  bg-[#E5E5E5] ">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-4xl font-bold tracking-tight">
            Shop By Size
          </h2>
        </div>
        {/* Grid of Size Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
          {sizes.map((size) => (
            <div
              key={size}
              onClick={() => handleClick(size)}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out bg-white"
            >
              {/* Image section with text overlay */}
              <div className="relative h-60 md:h-80 overflow-hidden">
                <img
                  src={demoImage}
                  alt={`Shop for ${size} size rugs`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6">
                  <div>
                    <p className="text-2xl md:text-4xl text-white font-bold tracking-wider">
                      {size} ft
                    </p>
                    <div className="mt-1 md:mt-2 inline-flex items-center text-white font-semibold text-sm md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Shop Now</span>
                      <MoveRight className="h-4 w-4 md:h-5 md:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
