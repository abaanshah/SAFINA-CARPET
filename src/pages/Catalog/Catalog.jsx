// ===================================================================
// FILE: src/pages/Catalog/Catalog.jsx (Updated)
// ===================================================================
import React, { useEffect, useState, useContext } from "react";
import { Heart, Plus } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
// 1. Import the new WishlistContext
import { WishlistContext } from "../../context/WishlistContext";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  // 2. Get wishlist functions and data from the context
  const { addToWishlist, isItemInWishlist } = useContext(WishlistContext);

  const query = new URLSearchParams(location.search);
  const filters = {};
  for (let [key, value] of query.entries()) {
    filters[key] = value;
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);
  
  useEffect(() => {
    const fetchRugs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/sizes", {
          params: filters,
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching rugs:", err);
      }
    };

    fetchRugs();
  }, [location.search]);

  return (
    <div className="mt-[12vh] mb-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {products.length === 0 ? (
        <div className=" h-[30vh] w-[100vw] flex items-center justify-center">
          <p className=" text-2xl text-orange-700 font-semibold col-span-3">No rugs found for this filter</p>
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className=" bg-amber-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/f8f8f8/333333?text=Image+Not+Found" }}
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {/* 3. This button now adds/removes from wishlist and changes color */}
                <button 
                  onClick={() => addToWishlist(product)}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <Heart 
                    size={18} 
                    className={`transition-colors ${isItemInWishlist(product._id) ? 'text-red-600 fill-current' : 'text-gray-700'}`} 
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
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.material}</p>
              <p className="text-sm text-gray-500">
                {product.size} • {product.color}
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Catalog;