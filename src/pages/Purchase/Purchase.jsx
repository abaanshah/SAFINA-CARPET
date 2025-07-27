// import { FooterSection } from "../components/layout/FooterSection";
// import { HeaderSection } from "../components/layout/HeaderSection";
import React, { useState, useEffect } from "react";

export const Purchase = () => {
  const [selectedSize, setSelectedSize] = useState("5 X 7");
  const [selectedColor, setSelectedColor] = useState("Rust");
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const sizes = [
    { name: "5 X 7" },
    { name: "6 X 9" },
    { name: "9 X 12" }
  ];
  
  const colors = [
    { name: "Rust", icon: "https://c.animaapp.com/x4TEakH5/img/icon-1.svg" },
    { name: "Green", icon: "https://c.animaapp.com/x4TEakH5/img/icon.svg" },
  ];

  const thumbnailImages = [
    "https://c.animaapp.com/x4TEakH5/img/firefly-carpets-and-rugs-at-home--premium-quality-handmade-craft@2x.png",
    "https://c.animaapp.com/x4TEakH5/img/rugcustom@2x.png",
    "https://c.animaapp.com/x4TEakH5/img/rugvisual@2x.png",
    "https://c.animaapp.com/x4TEakH5/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft--3@2x.png",
  ];

  const helpOptions = [
    { label: "FAQs", underline: true },
    { label: "Chatbot", underline: false },
    { label: "Call us", underline: false },
    { label: "Email", underline: false },
    { label: "WhatsApp", underline: false },
  ];

  const accordionItems = [
    {
      title: "Product Details",
      content: "To cancel your order, please get in touch with our customer service team as soon as possible with your order number. Orders can only be canceled before they are processed and shipped.",
    },
    {
      title: "Shipping and Returns",
      content: "To cancel your order, please get in touch with our customer service team as soon as possible with your order number. Orders can only be canceled before they are processed and shipped.",
    },
    {
      title: "Care instruction",
      content: "To cancel your order, please get in touch with our customer service team as soon as possible with your order number. Orders can only be canceled before they are processed and shipped.",
    },
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative">
        <div className="relative w-full min-h-screen">
          {/* Background gradients */}
          <div className="absolute w-full h-[654px] top-0 left-0 bg-gradient-to-b from-gray-300 to-red-300" />
          <div className="absolute w-full h-[654px] top-[654px] left-0 bg-gradient-to-t from-red-300 via-red-200 to-red-100" />

          {/* Main product image - responsive */}
          <img
            className="absolute w-[90%] sm:w-[80%] md:w-[590px] h-auto md:h-[605px] top-[38px] left-[5%] sm:left-[15%] md:left-[173px] object-cover"
            alt="Handmade carpet"
            src="https://c.animaapp.com/x4TEakH5/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft-.png"
          />

          {/* Thumbnail images - hidden on mobile */}
          <div className="hidden md:flex flex-col w-[85px] items-start gap-[19px] absolute top-[38px] left-[73px]">
            {thumbnailImages.map((src, index) => (
              <img
                key={index}
                className="relative self-stretch w-full h-[85px] object-cover"
                alt={`Rug thumbnail ${index + 1}`}
                src={src}
              />
            ))}
          </div>

          {/* Product details container - responsive */}
          <div className="absolute w-[90%] sm:w-[80%] md:w-[569px] h-auto top-[650px] sm:top-[700px] md:top-[38px] left-[5%] sm:left-[10%] md:left-[799px] bg-red-50 rounded-lg p-6">
            
            <h2 className="text-2xl md:text-4xl font-serif text-black underline mb-2">
              Aaban Hand Knotted
            </h2>
            
            <div className="text-sm text-red-800 mb-4">Hand knotted</div>
            
            <p className="text-base text-black leading-relaxed mb-4">
              Large Afghan rugs, Custom Size, High Quality Handmade Afghan large
              Red Area rug, Turkmen Tribal Rug, Living room,Afghan rug, Living
              room rug.
            </p>

            <div className="text-2xl text-red-800 font-bold mb-2">$1,399</div>
            <p className="text-sm text-black mb-6">(inclusive all tax and duties)</p>

            {/* Size selection */}
            <div className="mb-6">
              <label className="block text-base text-black mb-3">Size:</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 border-2 border-black rounded ${
                      selectedSize === size.name
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection */}
            <div className="mb-6">
              <label className="block text-base text-black mb-3">Color:</label>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className="flex items-center gap-2"
                  >
                    <img
                      className="w-6 h-6"
                      alt={`${color.name} color`}
                      src={color.icon}
                    />
                    <span className="text-sm text-gray-700">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selection */}
            <div className="mb-6">
              <label className="block text-base text-black mb-3">Quantity</label>
              <div className="flex items-center border-2 border-black rounded w-fit px-3 py-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-2 text-black font-bold"
                >
                  -
                </button>
                <span className="px-4 text-black font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-2 text-black font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-red-600 text-white py-3 rounded font-medium">
                ADD TO CART
              </button>
              
              <button className="w-full bg-green-500 text-white py-3 rounded font-medium flex items-center justify-center gap-2">
                Order via WhatsApp
                <img
                  className="w-5 h-5"
                  alt="WhatsApp"
                  src="https://c.animaapp.com/x4TEakH5/img/vector-9.svg"
                />
              </button>
            </div>

            {/* Shipping info */}
            <p className="text-xs text-black mb-4">
              Free India Shipping & Easy Returns
            </p>

            {/* Help options */}
            <div className="mb-6">
              <p className="text-xs text-black mb-2">
                <span className="font-bold">Need Help</span>? Try
              </p>
              <div className="flex flex-wrap gap-2">
                {helpOptions.map((option, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 border-2 border-black rounded text-xs"
                  >
                    <span className={option.underline ? "underline" : ""}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion items */}
            <div className="space-y-2">
              {accordionItems.map((item, index) => (
                <details
                  key={index}
                  className="border-b-2 border-red-600"
                >
                  <summary className="flex justify-between items-center py-4 cursor-pointer bg-red-50">
                    <span className="text-xl text-black">{item.title}</span>
                    <span className="text-black">+</span>
                  </summary>
                  <div className="py-4 bg-red-50">
                    <p className="text-base text-black leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            {/* Additional info */}
            <p className="text-xs text-black mt-6">
              For more information, please review our{" "}
              <a href="#" className="underline">Guide</a> sections and{" "}
              <a href="#" className="underline">FAQ</a>.
            </p>
          </div>
        </div>

        {/* Header and Footer */}
        {/* <HeaderSection /> */}
        {/* <FooterSection /> */}
      </div>
    </div>
  );
};