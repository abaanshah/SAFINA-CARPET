import React, { useState, useContext, useEffect, createContext, useMemo } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
// 1. Import the CartContext
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeItem, 
    subtotal 
  } = useContext(CartContext);

  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + shipping;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-999 overflow-hidden">
      <div className="absolute inset-0 " onClick={closeCart}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-stone-50 shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-6 bg-white">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-6 w-6 text-red-900" />
              <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: 'Jost, sans-serif'}}>Your Shopping Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Discover our beautiful collection of rugs and carpets.</p>
                <button
                  onClick={closeCart}
                  className="bg-red-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex-shrink-0">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/f8f8f8/333333?text=Image+Not+Found" }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-3 capitalize">
                            {item.size} &bull; {item.color}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <span className="font-semibold text-lg text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
              <div className="space-y-2">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-red-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button className="w-full bg-red-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-900 transition-colors text-lg">
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-red-800 py-3 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
