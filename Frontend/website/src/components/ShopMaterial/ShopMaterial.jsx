import React, { useEffect, useState } from "react";
import "./ShopMaterial.css";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fallbackCards = [
  { name: "Hand Made", image: "/uploads/handmade.png", bgColor: "#26425E" },
  { name: "Staple", image: "/uploads/staple.png", bgColor: "#891322" },
  {
    name: "Machine Made",
    image: "/uploads/machinemade.png",
    bgColor: "#684D26",
  },
];

const ShopMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setMaterials(data);
        else setMaterials(fallbackCards);
      })
      .catch((err) => {
        console.error(err);
        setMaterials(fallbackCards);
      });
  }, []);

  // Handle responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    const maxSlide = Math.max(0, materials.length - cardsPerView);
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, materials.length - cardsPerView);
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Navigate to catalog with selected material
  const handleClick = (materialName) => {
    navigate(`/catalog?material=${materialName}`);
  };

  return (
    <div className="shopmaterial_container">
      <h2 className="shopmaterial_heading">Shop by Material</h2>

      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          style={{ marginLeft: "-20px" }}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          style={{ marginRight: "-20px" }}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
            }}
          >
            {materials.map((material, index) => (
              <div
                key={index}
                className="slider_card flex-shrink-0"
                style={{ width: `${100 / cardsPerView}%` }}
                onClick={() => handleClick(material.name)}
              >
                <div className="card_image">
                  <img src={material.image} alt={material.name} />
                </div>
                <div className="card_content">
                  <h3>{material.name}</h3>
                  <p>{material.description}</p>
                  <div className="shop_now">
                    <span>Shop Now</span>
                    <ArrowUpRight className="arrow_icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({
            length: Math.max(1, materials.length - cardsPerView + 1),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-gray-800 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopMaterial;
