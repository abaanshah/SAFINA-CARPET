// ===================================================================
// FILE: src/pages/MyOrdersPage.jsx (Enhanced UI/UX Version)
// ===================================================================
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ChevronDown,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

// --- A Helper Component for Status Badges ---
const StatusBadge = ({ isPaid, isDelivered }) => {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
        <CheckCircle size={16} className="mr-2" />
        Delivered
      </span>
    );
  }
  if (isPaid) {
    return (
      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
        <Truck size={16} className="mr-2" />
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
      <Clock size={16} className="mr-2" />
      Awaiting Payment
    </span>
  );
};

// --- A Helper Component for the Loading Skeleton ---
const OrderSkeleton = () => (
  <div className="bg-white p-6 shadow-lg rounded-xl animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
    </div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // To track which order is open
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(
          "https://safina-carpet-backend-web-h0o5.onrender.com/api/orders/myorders",
          config
        );
        // Sort orders by most recent first
        setOrders(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      // Simulate loading for a better feel
      setTimeout(() => fetchOrders(), 500);
    }
  }, [token]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-[15vh] p-4 min-h-screen">
        <h1
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          My Orders
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  mb-[10vh] p-4 min-h-screen">
      <h1
        className="text-4xl font-bold text-gray-900 mb-8 text-center"
        style={{ fontFamily: "Jost, sans-serif" }}
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto text-gray-300" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            No Orders Yet
          </h2>
          <p className="mt-2 text-gray-500">
            Looks like you haven't placed any orders. Let's change that!
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-block bg-red-800 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleOrderDetails(order._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono text-sm text-gray-800">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Date Placed</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <StatusBadge
                    isPaid={order.isPaid}
                    isDelivered={order.isDelivered}
                  />
                  <p className="text-2xl font-bold text-red-800">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Collapsible Order Details */}
              <div
                className={`transition-all duration-500 ease-in-out max-h-0 overflow-hidden ${
                  expandedOrderId === order._id ? "max-h-screen" : ""
                }`}
              >
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">Items Ordered</h4>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={
                            item.image
                              ? `https://safina-carpet-backend-web-h0o5.onrender.com/${item.image
                                  .split("\\")
                                  .pop()}`
                              : "https://placehold.co/128x128/f8f8f8/333333?text=No+Image"
                          }
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x ₹
                            {item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ₹
                          {(item.quantity * item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-2">
                      Shipping Address
                    </h4>
                    <p className="text-gray-600">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage; // Renamed for consistency
