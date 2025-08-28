// ===================================================================
// FILE: src/context/CartContext.jsx (Corrected)
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/cart";

  // This useEffect now correctly handles both login and logout events
  useEffect(() => {
    const syncCart = async () => {
      // If there is a user, fetch their cart from the database
      if (user && token) {
        setIsLoading(true);
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get(API_URL, config);
          
          // We need to properly format the data from the backend
          const formattedItems = data.products.map(p => ({
            ...p.productId, // Spread all properties of the populated product
            _id: p.productId._id, // Ensure _id is at the top level
            quantity: p.quantity
          }));
          setCartItems(formattedItems);

        } catch (err) {
          console.error("Error fetching cart:", err.message);
          setCartItems([]); // Clear cart on error
        } finally {
          setIsLoading(false);
        }
      } else {
        // If there is no user (logged out), clear the cart
        setCartItems([]);
      }
    };

    syncCart();
  }, [user, token]); // This effect runs whenever the user's login state changes

  const addToCart = async (productToAdd) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      // Update backend first
      await axios.post(API_URL, { productId: productToAdd._id, quantity: 1 }, config);

      // Then update frontend state optimistically
      setCartItems((prev) => {
        const existing = prev.find((item) => item._id === productToAdd._id);
        if (existing) {
          return prev.map((item) =>
            item._id === productToAdd._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...productToAdd, quantity: 1 }];
      });

      setIsCartOpen(true);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user || newQuantity < 1) return;
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.put(API_URL, { productId, quantity: newQuantity }, config);
      setCartItems((items) =>
        items.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating cart:", err.message);
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${API_URL}/${productId}`, config);
      setCartItems((items) => items.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err.message);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        openCart,
        closeCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};