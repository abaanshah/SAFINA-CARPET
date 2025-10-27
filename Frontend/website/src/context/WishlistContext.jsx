// ===================================================================
// FILE: src/context/WishlistContext.jsx (Corrected Full-Stack Version)
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // 1. Connect to AuthContext

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  // 1. Get user and token to authorize API calls
  const { user, token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "https://safina-carpet-backend-web-h0o5.onrender.com/api/wishlist";

  // 2. Sync with backend on login/logout
  useEffect(() => {
    const syncWishlist = async () => {
      // Only fetch if a user is logged in
      if (user && token) {
        setIsLoading(true);
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get(API_URL, config);
          // The backend now sends the list of populated products
          setWishlistItems(data.products || []);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          setWishlistItems([]); // Clear on error
        } finally {
          setIsLoading(false);
        }
      } else {
        // If user logs out, clear the wishlist
        setWishlistItems([]);
      }
    };
    syncWishlist();
  }, [user, token]); // This runs every time the user's login status changes

  // 3. Make API calls to update the backend
  const addToWishlist = async (productId) => {
    if (!token) return; // Safety check
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Call the backend to add the item
      const { data } = await axios.post(API_URL, { productId }, config);
      // Update the local state with the new list from the server
      setWishlistItems(data.products || []);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return; // Safety check
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Call the backend to remove the item
      const { data } = await axios.delete(`${API_URL}/${productId}`, config);
      // Update the local state with the new list from the server
      setWishlistItems(data.products || []);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // A helper function to check if an item is already in the wishlist
  const isItemInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const value = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    wishlistCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
