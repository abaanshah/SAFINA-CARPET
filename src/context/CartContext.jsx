// ===================================================================
// FILE: src/context/CartContext.jsx (New File)
// -------------------------------------------------------------------
// This new file manages all shopping cart functionality for your app.
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // On initial load, try to get the cart from the browser's local storage
    try {
      const localData = localStorage.getItem('safina_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Any time the cartItems change, save them to local storage
  useEffect(() => {
    localStorage.setItem('safina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
      if (existingItem) {
        // If item already exists in the cart, just increase its quantity
        return prevItems.map(item =>
          item._id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If it's a new item, add it to the cart with a quantity of 1
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true); // Automatically open the cart when a new item is added
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCartItems(items =>
      items.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(items => items.filter(item => item._id !== productId));
  };
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculate totals and counts that can be used anywhere in the app
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    openCart,
    closeCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
