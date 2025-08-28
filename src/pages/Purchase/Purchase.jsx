// ===================================================================
// FILE: src/pages/Purchase/Purchase.jsx (Corrected with Wishlist Toggle)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingBag, Minus, Plus, ChevronDown } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext"; // --- 1. IMPORT AuthContext ---

// --- Accordion Item Component ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  // ... (this component is fine, no changes needed)
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-4 text-left"
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-gray-800">{title}</span>
      <ChevronDown
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
          isOpen ? "transform rotate-180" : ""
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen pt-2 pb-4" : "max-h-0"
      }`}
    >
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  </div>
);

export const Purchase = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  // --- 2. GET all the necessary functions & data from contexts ---
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
  
  // --- 3. REPLACE the old handler with the new, smart one ---
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
    <div className="bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[12vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            {/* ... (Image gallery code is fine, no changes needed) ... */}
            <div className="flex-grow">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://www.troost.in/cdn/shop/files/ARP07570.jpg?v=1720767300&width=2048";
                }}
              />
            </div>
            <div className="flex md:flex-col gap-3 flex-wrap justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                    selectedImage === img
                      ? "border-red-800"
                      : "border-transparent hover:border-red-400"
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
          <div>
            {/* ... (Product info code is fine, no changes needed) ... */}
            <Link
              to="/catalog"
              className="text-sm text-gray-500 hover:text-red-800 transition"
            >
              Back to Collection
            </Link>
            <h1
              className="text-4xl font-bold text-gray-900 mt-2"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              {product.name}
            </h1>
            <p className="text-lg text-gray-500 capitalize mt-2">
              {product.material}
            </p>
            <p className="text-3xl font-bold text-red-900 my-4">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.shortDescription ||
                "A beautifully crafted rug from Safina Carpets."}
            </p>
            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                    {/* ... (Size selector code is fine) ... */}
              </div>
            )}
            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="mb-6">
                    {/* ... (Color selector code is fine) ... */}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                    {/* ... (Quantity buttons are fine) ... */}
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-grow flex items-center justify-center bg-red-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-900 transition"
              >
                <ShoppingBag className="mr-2" /> Add to Cart
              </button>
              <button
                    // The onClick is already correct here, calling the new handler
                onClick={handleWishlistClick}
                className="p-3 border border-gray-300 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-600 transition"
    _x000D_       >
                <Heart
                  className={`transition-colors ${
                    isItemInWishlist(product?._id) // Use optional chaining for safety
                      ? "text-red-600 fill-red-600"
                      : ""
                  }`}
                />
              </button>
            </div>

            {/* Accordion for Details */}
            <div className="mt-8">
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