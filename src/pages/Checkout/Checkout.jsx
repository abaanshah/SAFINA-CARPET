// ===================================================================
// FILE: src/pages/Checkout/Checkout.jsx (Corrected)
// -------------------------------------------------------------------
// This version now connects to your CartContext to display the
// real items from the user's cart.
// ===================================================================
import React, { useContext, useState, useEffect } from 'react';
// 1. Import the CartContext
import { CartContext } from '../../context/CartContext'; // Adjust path if needed
import { Lock } from 'lucide-react';

const CheckOut = () => {
  // 2. Get the real cart data from the context
  const { cartItems, subtotal, cartCount } = useContext(CartContext);
  
  // State for the shipping form
  const [shippingDetails, setShippingDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In the next step, this function will send the shippingDetails and cartItems
    // to the backend to create an order and initiate payment.
    console.log("Placing order with details:", shippingDetails);
    alert("(Placeholder) Proceeding to payment gateway...");
  };

  const shipping = subtotal > 500 ? 0 : 99; // Your shipping logic
  const total = subtotal + shipping;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[12vh]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 tracking-tight" style={{fontFamily: 'Jost, sans-serif'}}>
            Checkout
          </h1>
          <p className="mt-2 text-lg text-gray-600">Complete your purchase</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center h-[40vh] flex flex-col justify-center items-center">
             <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty.</h2>
             <p className="text-gray-500 mt-2">There's nothing to check out yet.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
            {/* Left Column: Shipping Details */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="sm:col-span-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" id="firstName" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                {/* Last Name */}
                <div className="sm:col-span-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" id="lastName" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                {/* Email */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" name="address" id="address" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                {/* City */}
                <div className="sm:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" id="city" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                {/* Pincode */}
                <div className="sm:col-span-1">
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input type="text" name="pincode" id="pincode" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
                 {/* Phone */}
                 <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" name="phone" id="phone" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800" />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-8 lg:mt-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary ({cartCount} {cartCount > 1 ? 'items' : 'item'})</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4 border" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/f8f8f8/333333?text=Rug" }} />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-2 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-red-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button type="submit" className="w-full mt-8 bg-red-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-900 transition-colors text-lg flex items-center justify-center">
                <Lock className="w-5 h-5 mr-2" />
                Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckOut;