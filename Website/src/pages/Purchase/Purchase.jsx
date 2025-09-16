// ===================================================================
// FILE: src/pages/Purchase/Purchase.jsx (FINAL, COMPLETE, AND CORRECTED)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingBag, Minus, Plus, ChevronDown } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

// --- Accordion Item Component (Enhanced) ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-5 text-left group"
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
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-screen pt-2 pb-4 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-gray-700 leading-relaxed text-base">{content}</p>
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/rugs/${productId}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(`http://localhost:5000${data.images[0]}`);
        } else if (data.imageUrl) {
          setSelectedImage(`http://localhost:5000${data.imageUrl}`);
        }
        setSelectedSize(data.availableSizes?.[0] || data.size || "Standard");
        setSelectedColor(data.availableColors?.[0] || data.color || "Default");
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
    // --- ADDED: Prevent quantity from exceeding stock ---
    if (!product || product.countInStock === 0) return;
    setQuantity((prev) => Math.min(Math.max(1, prev + amount), product.countInStock));
  };

  const handleAddToCart = () => {
    if (!product) return;
    const itemToAdd = {
      ...product,
      image: (product.images && product.images[0]) || product.imageUrl,
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
      <div className="text-center p-12 mt-[12vh] min-h-screen text-lg text-gray-600">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center p-12 mt-[12vh] min-h-screen text-lg text-red-600">
        Product not found.
      </div>
    );

  const images = product.images?.map((img) => `http://localhost:5000${img}`) || (product.imageUrl ? [`http://localhost:5000${product.imageUrl}`] : []);
  const sizes = product.availableSizes || [product.size].filter(Boolean);
  const colors = product.availableColors || [product.color].filter(Boolean);
  const accordionItems = [
    { title: "Product Details", content: product.description || "No details available." },
    { title: "Shipping and Returns", content: "Free shipping across India. Easy 7-day return policy." },
    { title: "Care Instructions", content: "Professional cleaning recommended. Avoid direct sunlight." },
  ];

  const isLowStock = product.countInStock > 0 && product.countInStock <= 10;
  const isOutOfStock = !product.countInStock || product.countInStock <= 0;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-[10vh] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col md:flex-row-reverse gap-6">
            <div className="relative flex-grow flex items-center justify-center bg-gray-100 rounded-xl p-4 shadow-inner">
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider py-2 px-4 rounded-md z-10">
                  Out of Stock
                </div>
              )}
              <img
                src={selectedImage} alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="flex md:flex-col gap-3 flex-wrap justify-center md:justify-start">
              {images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img ? "border-red-800 shadow-md" : "border-gray-200 hover:border-red-400"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <Link to="/catalog" className="text-sm text-gray-500 hover:text-red-800 transition-colors duration-200 uppercase tracking-wider mb-2">
              ← Back to Collection
            </Link>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-3" style={{ fontFamily: "Jost, sans-serif" }}>
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 capitalize mb-4">{product.material}</p>
            <p className="text-4xl font-bold text-red-800 mb-6">₹{product.price?.toLocaleString("en-IN")}</p>
            <p className="text-gray-700 leading-relaxed text-base mb-8">
              {product.shortDescription || "A beautifully crafted rug from Safina Carpets, combining traditional artistry with modern design."}
            </p>
            {isLowStock && (
                <div className="mb-6 flex items-center gap-2 text-lg font-semibold text-orange-600 bg-orange-100 border border-orange-200 rounded-lg p-3">
                    <AlertTriangle size={20} />
                    <p>Hurry! Only {product.countInStock} left in stock.</p>
                </div>
            )}
            
            {/* --- YOUR ORIGINAL SIZE SELECTOR CODE --- */}
            {sizes.length > 0 && (
              <div className="mb-7">
                <label className="block text-lg font-semibold text-gray-800 mb-3">Size: <span className="font-medium text-gray-600">{selectedSize} ft</span></label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 border rounded-lg transition-all duration-200 text-base font-medium ${
                        selectedSize === size ? "bg-red-800 text-white border-red-800 shadow-md" : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:text-gray-900"
                      }`}
                    >{size}</button>
                  ))}
                </div>
              </div>
            )}
            
            {/* --- YOUR ORIGINAL COLOR SELECTOR CODE --- */}
            {colors.length > 0 && (
              <div className="mb-7">
                <label className="block text-lg font-semibold text-gray-800 mb-3">Color: <span className="font-medium text-gray-600">{selectedColor}</span></label>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 transform hover:scale-110 ${
                        selectedColor === color ? "border-red-800 shadow-md" : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center mt-auto">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={isOutOfStock}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 text-lg font-semibold text-gray-800 border-l border-r border-gray-200 h-12 flex items-center justify-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={isOutOfStock}
                  className="p-3 text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-grow w-full sm:w-auto flex items-center justify-center bg-red-800 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-900 transition-all duration-200 uppercase tracking-wider text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <ShoppingBag className="mr-3" size={20} />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlistClick}
                className="p-4 border border-gray-300 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-600 transition-all duration-200 flex-shrink-0 shadow-sm"
              >
                <Heart
                  className={`transition-colors duration-200 ${
                    isItemInWishlist(product?._id) ? "text-red-600 fill-red-600" : "text-gray-500"
                  }`}
                  size={22}
                />
              </button>
            </div>

            {/* Accordion for Details */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index} title={item.title} content={item.content}
                  isOpen={openAccordion === index} onClick={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};