import React, { useEffect, useState, useContext } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const query = new URLSearchParams(location.search);
  const filters = {};
  for (let [key, value] of query.entries()) {
    filters[key] = value;
  }
  
  const handleWishlistToggle = (product) => {
    if (!user) {
      alert("You must be logged in to add items to your wishlist.");
      return;
    }
    if (isItemInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);
  
  useEffect(() => {
    const fetchRugs = async () => {
      try {
        setIsLoading(true); // Start loading
        const { data } = await axios.get("http://localhost:5000/api/rugs", {
          params: filters,
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching rugs:", err);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchRugs();
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height: "70vh" }}>
        <h2 className="text-xl font-medium text-gray-600">Loading Rugs...</h2>
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: "70vh" }}>
        <h2 className="text-xl sm:text-2xl font-light text-red-800">
          No rugs found for this filter.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-xl"
            >
              <Link to={`/purchase/${product._id}`} className="block">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    // --- THE FIX: Use the Cloudinary URL directly ---
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/f8f8f8/333333?text=Image+Not+Found" }}
                  />
                </div>
              </Link>

              <div className="absolute top-3 right-3 z-10">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                >
                  <Heart 
                    size={20} 
                    className={`transition-all ${isItemInWishlist(product._id) ? 'text-red-600 fill-red-600' : 'text-gray-700 hover:text-red-500'}`} 
                  />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  <Link to={`/purchase/${product._id}`} className="hover:text-red-800 transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.material}</p>
                
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <button 
                     onClick={() => addToCart(product)}
                     className="bg-gray-800 text-white p-2 rounded-lg shadow-md hover:bg-black transition-transform hover:scale-105"
                    >
                     <ShoppingBag size={20} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;

