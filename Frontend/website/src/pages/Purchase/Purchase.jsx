import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Camera,
  AlertTriangle,
  ChevronDown,
  Award,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // 1. IMPORT THE NEW CONTEXT
import { motion, AnimatePresence } from "framer-motion";

// --- VISUALIZER MODAL (Fully Integrated & Styled) ---
const VisualizerContainer = ({ onClose, rugImageUrl }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const visualizerUrl = `http://localhost:8090?rugUrl=${encodeURIComponent(
    rugImageUrl
  )}`;
  

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] animate-fadeInOverlay">
      <div className="relative w-full h-[95%] md:h-full md:w-[95%] max-w-7xl bg-white overflow-hidden rounded-lg animate-slideDownPopUp">
        <button
          type="button"
          className="absolute top-3 right-3 bg-black/50 text-white hover:bg-black transition-colors z-[1001] rounded-full w-8 h-8 flex items-center justify-center text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe
          src={visualizerUrl}
          title="Rug Visualizer"
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
};

// --- ACCORDION ITEM (Restyled with smooth animation) ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-5 text-left"
      onClick={onClick}
    >
      <span className="text-base font-semibold text-gray-800">{title}</span>
      <ChevronDown
        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
          isOpen ? "transform rotate-180 text-[#5c0b0a]" : ""
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-5 text-gray-600 leading-relaxed text-sm">
            <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- MAIN PURCHASE PAGE COMPONENT (Modern Redesign) ---
export const Purchase = () => {
  const { productId } = useParams();
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } =
    useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const { getPrice } = useContext(CurrencyContext); // 2. USE THE CONTEXT

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleVisualizer = () => setIsVisualizerOpen(!isVisualizerOpen);
  const toggleAccordion = (index) =>
    setOpenAccordion(openAccordion === index ? null : index);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5001/api/rugs/${productId}`
        );
        const initialCountInStock = data.countInStock;
        setProduct({ ...data, initialCountInStock });

        const imageUrl =
          data.images && data.images.length > 0
            ? data.images[0]
            : data.imageUrl;
        setSelectedImage(imageUrl);

        setSelectedSize(data.size || "Standard");
        setSelectedColor(data.color || "Default");
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (product?.initialCountInStock !== undefined) {
      const itemInCart = cartItems.find((item) => item._id === product._id);
      const cartQuantity = itemInCart ? itemInCart.quantity : 0;
      const newCountInStock = product.initialCountInStock - cartQuantity;
      const finalCount = Math.max(0, newCountInStock);

      if (!product.countInStock || product.countInStock !== finalCount) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          countInStock: finalCount,
        }));
      }
    }
  }, [cartItems, product?.initialCountInStock, product?._id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  const handleAddToCart = () => {
    if (!product || product.countInStock <= 0) return;
    const itemToAdd = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    addToCart(itemToAdd);
  };
  const handleWishlistClick = () => {
    if (!user) {
      alert("You must be logged in to manage your wishlist.");
      return;
    }
    if (!product) return;
    isItemInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product.id);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen font-semibold text-lg text-gray-600">
        Loading Product...
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen font-semibold text-lg text-red-600">
        Product Not Found
      </div>
    );

  const images =
    product.images?.length > 0 ? product.images : [product.imageUrl];
  const sizes =
    product.specifications?.sizeOptions || [product.size].filter(Boolean);
  const colors =
    product.specifications?.colorOptions || [product.color].filter(Boolean);
  const availableStockForAdding = product.countInStock;
  const isLowStock =
    availableStockForAdding > 0 && availableStockForAdding <= 10;
  const isOutOfStock = !availableStockForAdding || availableStockForAdding <= 0;

  const accordionItems = [
    {
      title: "Detailed Description",
      content: product.description || "No details available for this product.",
    },
    {
      title: "Shipping & Returns",
      content:
        "We offer complimentary shipping across India. Our products are eligible for return within 7 days of delivery, provided they are in their original condition. Please contact our customer service to initiate a return.",
    },
    {
      title: "Care Instructions",
      content:
        "To maintain the beauty of your rug, we recommend professional cleaning. For minor spills, blot immediately with a clean, dry cloth. Avoid exposure to direct sunlight for prolonged periods to prevent fading.",
    },
  ];

  // 3. GET THE DYNAMIC PRICE
  const { price, symbol } = getPrice(product);

  return (
    <>
      <div className="bg-white pt-[130px]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* --- Left Column: Image Gallery --- */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="lg:sticky top-24 self-start flex gap-4 items-start"
            >
              {/* Thumbnails - Vertical */}
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === img
                        ? "border-[#5c0b0a] ring-2 ring-offset-2 ring-[#5c0b0a]"
                        : "border-gray-200 hover:border-gray-400"
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

              {/* Main Image with Magnify Effect */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-1 group cursor-zoom-in">
                {isOutOfStock && (
                  <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-md z-10">
                    Out of Stock
                  </div>
                )}

                <AnimatePresence>
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-125 group-hover:cursor-zoom-in"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* --- Right Column: Product Details --- */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex flex-col"
            >
              <Link
                to="/catalog"
                className="text-sm text-gray-500 hover:text-[#5c0b0a] transition-colors mb-3"
              >
                ← Back to Collection
              </Link>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              {/* 4. DISPLAY THE DYNAMIC PRICE */}
              <p className="text-2xl font-medium text-[#5c0b0a] mt-2">
                {symbol}{price?.toLocaleString("en-IN")}
              </p>

              <div className="mt-4 border-b border-gray-200 pb-6">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.shortDescription ||
                    `A beautifully crafted ${product.material} rug, perfect for adding a touch of elegance to any room.`}
                </p>
              </div>

              <div className="space-y-6 my-6">
                {/* This section can be built out later if size/color options are needed */}
              </div>

              {isLowStock && (
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <AlertTriangle size={18} />
                  <p>
                    Limited stock! Only {availableStockForAdding} remaining.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md bg-white">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={isOutOfStock || quantity <= 1}
                      className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-l-md"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 text-base font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={
                        isOutOfStock || quantity >= availableStockForAdding
                      }
                      className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-r-md"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-grow w-full flex items-center justify-center bg-[#5c0b0a] text-white font-bold py-3 px-5 rounded-md hover:bg-[#4a0908] transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="mr-2" size={18} />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleWishlistClick}
                    className="p-3 border border-gray-300 rounded-md text-gray-500 hover:text-red-600 hover:border-red-600 transition bg-white"
                  >
                    <Heart
                      className={`transition-colors ${
                        isItemInWishlist(product?._id)
                          ? "text-red-600 fill-red-600"
                          : "text-gray-500"
                      }`}
                      size={20}
                    />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={toggleVisualizer}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 px-5 rounded-md hover:bg-black transition shadow-sm mt-4"
                >
                  <Camera size={18} /> Visualize In Your Room
                </button>
              </div>

              <div className="flex items-center space-x-6 mt-6 border-t border-b py-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Award size={16} className="text-[#5c0b0a]" />
                  <span>Handcrafted Quality</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck size={16} className="text-[#5c0b0a]" />
                  <span>Free India Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <ShieldCheck size={16} className="text-[#5c0b0a]" />
                  <span>Secure Payments</span>
                </div>
              </div>

              <div className="mt-6">
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
            </motion.div>
          </motion.div>
        </div>
      </div>
      {isVisualizerOpen && (
        <VisualizerContainer
          onClose={toggleVisualizer}
          rugImageUrl={selectedImage}
        />
      )}
    </>
  );
};

export default Purchase;

