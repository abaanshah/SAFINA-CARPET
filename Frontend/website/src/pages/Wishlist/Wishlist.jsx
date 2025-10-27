// ===================================================================
// FILE: src/pages/Wishlist.jsx (Corrected)
// -------------------------------------------------------------------
// This version now displays the real items from your WishlistContext
// instead of the dummy data.
// ===================================================================
import React, { useEffect, useContext } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
// 1. Import the WishlistContext
import { WishlistContext } from "../../context/WishlistContext";

const Wishlist = () => {
  // 2. Get the real wishlist data and functions from the context
  const { wishlistItems, addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (product) => {
    // The addToWishlist function also handles removal (toggling)
    addToWishlist(product);
  };

  const handleAddToCartAndRemove = (product) => {
    addToCart(product);
    // Remove from wishlist after adding to cart
    addToWishlist(product);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[12vh]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-red-800" />
            <h1
              className="text-4xl font-bold text-red-900 tracking-tight ml-3"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              My Wishlist
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Your collection of saved treasures. Ready to make one yours?
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center text-center">
            <Heart className="h-20 w-20 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Click the heart on any product to save it for later.
            </p>
            <Link
              to="/catalog"
              className="bg-red-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-900 transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-shadow hover:shadow-lg"
              >
                <Link
                  to={`/product/${item._id}`}
                  className="flex-shrink-0 mb-4 md:mb-0"
                >
                  <img
                    src={`https://safina-carpet-backend-web-h0o5.onrender.com/${item.image}`}
                    alt={item.name}
                    className="h-32 w-32 md:h-40 md:w-40 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x400/f8f8f8/333333?text=Image+Not+Found";
                    }}
                  />
                </Link>

                <div className="flex-1 min-w-0 md:ml-6 text-center md:text-left">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-red-800 transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {item.size} ft &bull; {item.color}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-3">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-6">
                  <button
                    onClick={() => handleAddToCartAndRemove(item)}
                    className="flex items-center justify-center bg-red-800 text-white font-semibold py-2 px-5 rounded-md hover:bg-red-900 transition-colors transform active:scale-95"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
