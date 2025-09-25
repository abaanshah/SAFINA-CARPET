
// ===================================================================
// FILE: website/src/context/CartContext.jsx (FINAL, 100% COMPLETE)
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
  const [isLoading, setIsLoading] = useState(true); // isLoading is for the initial sync

  const API_URL = "http://localhost:5000/api/cart";

  const toastOptions = { /* ... your toast styles ... */ };
  
  // This useEffect syncs the cart from the DB when a user logs in
  useEffect(() => {
    const syncCart = async () => {
      if (user && token) {
        setIsLoading(true);
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get(API_URL, config);
          
          // This formats the data from the backend to what the frontend components expect
          const formattedItems = data.products.map(p => {
            if (!p.productId) return null; // Safety check for deleted products
            return {
                ...p.productId,
                _id: p.productId._id,
                quantity: p.quantity
            }
          }).filter(Boolean); // Filter out any null items

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

    const toastId = toast.loading('Adding to cart...', toastOptions);
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const quantityToAdd = productToAdd.quantity || 1;
      
      const { data } = await axios.post(API_URL, { productId: productToAdd._id, quantity: quantityToAdd }, config);

      const formattedItems = data.products.map(p => ({
        ...p.productId,
        _id: p.productId._id,
        quantity: p.quantity
      }));
      setCartItems(formattedItems);
      setIsCartOpen(true);
      
      toast.success(`${productToAdd.name} added to cart!`, { id: toastId, icon: '🛍️', ...toastOptions });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add item.";
      console.error("Error adding to cart:", errorMessage);
      toast.error(errorMessage, { id: toastId, ...toastOptions });
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    // This uses the optimistic update pattern we built before
    if (!user) return;
    const previousCartItems = [...cartItems];
    setCartItems((items) =>
      items.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Note: your backend PUT route for this is /api/cart/:productId
      await axios.put(`${API_URL}/${productId}`, { quantity: newQuantity }, config);
    } catch (err) {
      console.error("Error updating cart:", err.message);
      toast.error(err.response?.data?.message || "Failed to update quantity.", toastOptions);
      setCartItems(previousCartItems);
    }
  };

  const removeItem = async (productId, productName) => {
    // This also uses the optimistic update pattern
    if (!user) return;
    const previousCartItems = [...cartItems];
    setCartItems((items) => items.filter((item) => item._id !== productId));
    toast.success(`${productName || 'Item'} removed from cart.`, { icon: '🗑️', ...toastOptions });
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
       // Note: your backend DELETE route for this is /api/cart/:productId
      await axios.delete(`${API_URL}/${productId}`, config);
    } catch (err) {
      console.error("Error removing item:", err.message);
      toast.error("Failed to remove item.", toastOptions);
      setCartItems(previousCartItems);
    }
  };
  
  const clearCart = () => { setCartItems([]); };
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems, isCartOpen, clearCart, isLoading, addToCart,
        updateQuantity, removeItem, openCart, closeCart, cartCount, subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
