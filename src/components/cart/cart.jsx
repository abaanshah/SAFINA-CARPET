// ===================================================================
// FILE: Cart.jsx (Updated)
// -------------------------------------------------------------------
// This is your original Cart component, now connected to the CartContext.
// It no longer needs dummy data.
// ===================================================================
import React, { useContext } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
// 1. Import the CartContext
import { CartContext } from '../../context/CartContext'; // Adjust path if needed

const Cart = () => {
  // 2. Get all data and functions from the context, instead of props or local state
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeItem, 
    subtotal 
  } = useContext(CartContext);

  const shipping = subtotal > 500 ? 0 : 99; // Your shipping logic
  const total = subtotal + shipping;

  // The component will now show/hide based on the context's state
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-999 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 " onClick={closeCart}></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Discover our beautiful collection of rugs and carpets</p>
                <button
                  onClick={closeCart}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4 border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageUrl || "https://placehold.co/100x100/f8f8f8/333333?text=Rug"}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 capitalize">
                        {item.size} &bull; {item.color}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <span className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                     <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors self-start"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Order Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-red-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-900 transition-colors">
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
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
