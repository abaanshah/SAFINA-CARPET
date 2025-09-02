// ===================================================================
// FILE: src/context/CartContext.jsx (Corrected Quantity Bug)
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/cart";

  const clearCart = () => {
    setCartItems([]);
  };



  const toastOptions = {
    duration: 4000,
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
      background: '#FDF2E9',
      fontFamily: '"Jost", sans-serif',
      fontSize: '16px',
    },
  };

  useEffect(() => {
    const syncCart = async () => {
      if (user && token) {
        setIsLoading(true);
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get(API_URL, config);
          
          const formattedItems = data.products.map(p => ({
            ...p.productId,
            _id: p.productId._id,
            quantity: p.quantity
          }));
          setCartItems(formattedItems);
        } catch (err) {
          console.error("Error fetching cart:", err.message);
          toast.error("Could not load your cart.", toastOptions);
          setCartItems([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };
    syncCart();
  }, [user, token]);

  const addToCart = async (productToAdd) => {
    if (!user) {
      toast.error("Please log in to add items.", toastOptions);
      return;
    }
    
    const previousCartItems = [...cartItems];
    const quantityToAdd = productToAdd.quantity || 1;

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === productToAdd._id);
      if (existing) {
        return prev.map((item) =>
          item._id === productToAdd._id
            // --- FIX #1: Use the quantity passed from the page ---
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      // --- FIX #2: Use the quantity passed from the page ---
      return [...prev, { ...productToAdd, quantity: quantityToAdd }];
    });

    setIsCartOpen(true);
    toast.success(`${productToAdd.name} (x${quantityToAdd}) added to cart!`, {
      icon: '🛍️',
      ...toastOptions
    });
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(API_URL, { productId: productToAdd._id, quantity: quantityToAdd }, config);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      toast.error("Oops! Could not add item.", toastOptions);
      setCartItems(previousCartItems);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user || newQuantity < 1) return;
    
    const previousCartItems = [...cartItems];
    setCartItems((items) =>
      items.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${API_URL}/${productId}`, { quantity: newQuantity }, config);
    } catch (err) {
      console.error("Error updating cart:", err.message);
      toast.error("Failed to update quantity.", toastOptions);
      setCartItems(previousCartItems);
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;

    const previousCartItems = [...cartItems];
    setCartItems((items) => items.filter((item) => item._id !== productId));
    toast.success("Item removed from cart.", {
      icon: '🗑️',
      ...toastOptions
    });

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${productId}`, config);
    } catch (err) {
      console.error("Error removing item:", err.message);
      toast.error("Failed to remove item.", toastOptions);
      setCartItems(previousCartItems);
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
        clearCart,
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