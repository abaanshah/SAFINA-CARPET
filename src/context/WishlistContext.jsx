// ===================================================================
// FILE: src/context/WishlistContext.jsx (New File)
// ===================================================================
import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // On initial load, try to get the wishlist from local storage
    try {
      const localData = localStorage.getItem('safina_wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  // Any time the wishlistItems change, save them to local storage
  useEffect(() => {
    localStorage.setItem('safina_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (productToAdd) => {
    setWishlistItems(prevItems => {
      // Check if the item is already in the wishlist
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
      if (existingItem) {
        // If it exists, remove it (this creates a toggle-like behavior)
        return prevItems.filter(item => item._id !== productToAdd._id);
      } else {
        // If it's a new item, add it to the wishlist
        return [...prevItems, productToAdd];
      }
    });
  };

  // A helper function to check if an item is already in the wishlist
  const isItemInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    addToWishlist,
    isItemInWishlist,
    wishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};