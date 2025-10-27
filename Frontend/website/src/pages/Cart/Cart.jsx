// ===================================================================
// FILE: src/pages/CartPage.jsx (Corrected with useNavigate)
// ===================================================================
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
// --- 1. Import useNavigate instead of Link ---
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, subtotal, cartCount } =
    useContext(CartContext);
  // --- 2. Initialize the navigate function ---
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 mt-[12vh] min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>

        {/* --- 3. This is now a <button> that uses navigate on click --- */}
        <button
          onClick={() => navigate("/catalog")}
          className="bg-red-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-900 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[15vh] mb-[10vh] p-4 min-h-screen">
      <h1
        className="text-4xl font-bold text-gray-900 mb-8 text-center"
        style={{ fontFamily: "Jost, sans-serif" }}
      >
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              // ... your item mapping logic is perfect, no changes needed here ...
              <div
                key={item._id}
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={
                    item.image
                      ? `https://safina-carpet-backend-web-h0o5.onrender.com/${item.image.split("\\").pop()}`
                      : "https://placehold.co/128x128/f8f8f8/333333?text=No+Image"
                  }
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                />
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.size || "Standard"}, Color:{" "}
                    {item.color || "Default"}
                  </p>
                  <p className="text-md font-bold text-gray-800 mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-100 transition disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id, item.name)}
                    className="text-gray-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="font-semibold text-right w-24 ml-4 hidden sm:block">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl font-semibold border-b pb-4">
              Order Summary
            </h2>
            <div className="flex justify-between items-center my-4">
              <span className="text-lg text-gray-600">
                Subtotal ({cartCount} items)
              </span>
              <span className="text-xl font-bold text-gray-900">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-gray-600">Shipping</span>
              <span className="text-lg font-bold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-extrabold text-red-800">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* We will also change the checkout button to use this better pattern */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-800 text-white font-bold py-3 mt-6 rounded-lg hover:bg-red-900 transition text-lg uppercase tracking-wider"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
