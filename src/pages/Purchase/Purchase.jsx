// ===================================================================
// FILE: src/pages/Purchase/Purchase.jsx (Enhanced UI & Wishlist Toggle)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingBag, Minus, Plus, ChevronDown } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

// --- Accordion Item Component ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-4 text-left group" // Added group for hover effects
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-200">{title}</span>
      <ChevronDown
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
          isOpen ? "transform rotate-180 text-red-700" : "group-hover:text-red-700"
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen pt-2 pb-4 opacity-100" : "max-h-0 opacity-0" // Added opacity for smoother fade
      }`}
    >
      <p className="text-gray-700 leading-relaxed text-base">{content}</p> {/* Slightly darker text */}
    </div>
  </div>
);

export const Purchase = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0);

  // --- Fetch product from backend ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/rugs/${productId}`
        );

        setProduct(data);

        // Handle images safely (fallback if none)
        if (data.images && data.images.length > 0) {
          setSelectedImage(`http://localhost:5000${data.images[0]}`);
        } else if (data.imageUrl) {
          setSelectedImage(`http://localhost:5000${data.imageUrl}`);
        } else {
          setSelectedImage(
            "https://www.troost.in/cdn/shop/files/ARP07570.jpg?v=1720767300&width=2048"
          );
        }

        setSelectedSize(
          data.availableSizes?.[0] || data.size || "Standard"
        );
        setSelectedColor(
          data.availableColors?.[0] || data.color || "Default"
        );
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!product) return;
    const itemToAdd = {
      ...product,
      image: selectedImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    addToCart(itemToAdd);
  };
  
  const handleWishlistClick = () => {
    if (!user) {
      alert("You must be logged in to add items to your wishlist.");
      return;
    }
    if (!product) return;

    if (isItemInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (isLoading)
    return (
      <div className="text-center p-12 mt-[12vh] text-lg text-gray-600">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center p-12 mt-[12vh] text-lg text-red-600">
        Product not found.
      </div>
    );

  const images =
    product.images?.map((img) => `http://localhost:5000${img}`) ||
    (product.imageUrl ? [`http://localhost:5000${product.imageUrl}`] : [
      "https://www.troost.in/cdn/shop/files/ARP07570.jpg?v=1720767300&width=2048",
    ]);

  const sizes = product.availableSizes || [product.size].filter(Boolean);
  const colors = product.availableColors || [product.color].filter(Boolean);

  const accordionItems = [
    {
      title: "Product Details",
      content: product.description || "No details available for this product.",
    },
    {
      title: "Shipping and Returns",
      content:
        "Free shipping across India. Easy 7-day return policy. Please check our returns page for more details.",
    },
    {
      title: "Care Instructions",
      content:
        "Professional cleaning recommended. Avoid direct sunlight. Rotate the rug every 6 months for even wear.",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen"> {/* Added min-h-screen */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-[10vh] max-w-7xl"> {/* Increased vertical padding, added max-width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> {/* Increased gap */}
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col md:flex-row-reverse gap-6"> {/* Increased gap */}
            <div className="flex-grow flex items-center justify-center bg-gray-100 rounded-xl p-4 shadow-inner"> {/* Added background and padding */}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105" // object-contain, hover effect
                onError={(e) => {
                  e.target.src =
                    "https://www.troost.in/cdn/shop/files/ARP07570.jpg?v=1720767300&width=2048";
                }}
              />
            </div>
            <div className="flex md:flex-col gap-3 flex-wrap justify-center md:justify-start"> {/* Adjusted justify for mobile/desktop */}
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${ // Slightly larger, added transition
                    selectedImage === img
                      ? "border-red-800 shadow-md"
                      : "border-gray-200 hover:border-red-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col"> {/* Use flex-col for better layout control */}
            <Link
              to="/catalog"
              className="text-sm text-gray-500 hover:text-red-800 transition-colors duration-200 uppercase tracking-wider mb-2" // Uppercase, tracking
            >
              ← Back to Collection
            </Link>
            <h1
              className="text-5xl font-extrabold text-gray-900 leading-tight mb-3" // Larger, bolder, tighter leading
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 capitalize mb-4">
              {product.material}
            </p>
            <p className="text-4xl font-bold text-red-800 mb-6"> {/* Larger, darker red */}
              ₹{product.price?.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-8"> {/* Darker text, increased margin */}
              {product.shortDescription ||
                "A beautifully crafted rug from Safina Carpets, combining traditional artistry with modern design. Each piece is unique, offering elegance and comfort to any space."} {/* Extended placeholder */}
            </p>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-7"> {/* Increased margin */}
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Size:{" "}
                  <span className="font-medium text-gray-600">
                    {selectedSize} ft
                  </span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 border rounded-lg transition-all duration-200 text-base font-medium ${ // Slightly more padding, font-medium
                        selectedSize === size
                          ? "bg-red-800 text-white border-red-800 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="mb-7"> {/* Increased margin */}
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Color:{" "}
                  <span className="font-medium text-gray-600">
                    {selectedColor}
                  </span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 transform hover:scale-110 ${ // Slightly larger swatches
                        selectedColor === color
                          ? "border-red-800 shadow-md"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center mt-auto"> {/* Added mt-auto to push to bottom */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"> {/* Added overflow-hidden, bg-white, shadow */}
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-12 h-12" // Consistent size
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 text-lg font-semibold text-gray-800 border-l border-r border-gray-200 h-12 flex items-center justify-center">{quantity}</span> {/* Added borders for quantity */}
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-12 h-12" // Consistent size
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-grow flex items-center justify-center bg-red-800 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-900 transition-colors duration-200 uppercase tracking-wider text-lg shadow-lg" // Larger, bolder, uppercase, shadow
              >
                <ShoppingBag className="mr-3" size={20} /> Add to Cart
              </button>
              <button
                onClick={handleWishlistClick}
                className="p-4 border border-gray-300 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-600 transition-all duration-200 flex-shrink-0 shadow-sm" // Slightly more padding, flex-shrink
              >
                <Heart
                  className={`transition-colors duration-200 ${
                    isItemInWishlist(product?._id)
                      ? "text-red-600 fill-red-600" // Use fill-red-600 for solid heart
                      : "text-gray-500" // Default grey
                  }`}
                  size={22} // Slightly larger icon
                />
              </button>
            </div>

            {/* Accordion for Details */}
            <div className="mt-10 border-t border-gray-200 pt-6"> {/* Added top border and padding */}
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  content={item.content}
                  isOpen={openAccordion === index}
                  onClick={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};