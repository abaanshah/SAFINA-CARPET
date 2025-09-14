// ===================================================================
// FILE: src/pages/Catalog/Catalog.jsx (Updated with Login Alert)
// ===================================================================
import React, { useEffect, useState, useContext } from "react";
import { Heart, Plus } from "lucide-react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext"; // --- 1. IMPORT AuthContext ---

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext); // --- 2. GET the user object ---

  const query = new URLSearchParams(location.search);
  const filters = {};
  for (let [key, value] of query.entries()) {
    filters[key] = value;
  }
  
  // --- 3. CREATE a new handler for the wishlist button ---
  const handleWishlistToggle = (productId) => {
    // First, check if the user is logged in
    if (!user) {
      alert("You must be logged in to add items to your wishlist.");
      return; // Stop the function here
    }
    
    // If they are logged in, proceed with the normal toggle logic
    if (isItemInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);
  
  useEffect(() => {
    const fetchRugs = async () => {
      try {
        console.log("Applied filters:", filters);
        const { data } = await axios.get("http://localhost:5000/api/rugs", {
          params: filters,
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching rugs:", err);
      }
    };

    fetchRugs();
  }, [location.search]);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: "70vh" }}>
        <h2 className="text-red-800 text-xl sm:text-2xl font-light">
          No rugs found for this filter.
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-[12vh] mb-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-amber-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          <div className="relative">
            <Link to={`/purchase/${product._id}`}>
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/f8f8f8/333333?text=Image+Not+Found" }}
              />
            </Link>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button 
                // --- 4. UPDATE the onClick to use the new handler ---
                onClick={() => handleWishlistToggle(product._id)}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <Heart 
                  size={18} 
                  className={`transition-colors ${isItemInWishlist(product._id) ? 'text-red-600 fill-red-600' : 'text-gray-700'}`} 
                />
              </button>
              <button 
                onClick={() => addToCart(product)}
                className="bg-black text-white p-2 rounded-full shadow hover:bg-gray-800 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="p-4 text-center flex-grow flex flex-col">
            <Link to={`/purchase/${product._id}`}>
              <h3 className="text-lg font-semibold hover:text-red-800 transition-colors">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{product.material}</p>
            <p className="text-sm text-gray-500">
              {product.size} • {product.color}
            </p>
            <p className="text-lg font-bold text-gray-800 mt-auto pt-2">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;