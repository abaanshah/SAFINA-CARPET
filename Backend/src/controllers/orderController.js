// FILE: src/controllers/orderController.js (Corrected)

import Order from '../models/order.js';
import Cart from '../models/cart.js';

// Helper to safely get user ID
const getUserIdFromRequest = (req) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new Error("CRITICAL: User ID is missing in request!");
  }
  return userId;
};

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { shippingAddress, paymentMethod } = req.body;

    // The path here MUST match your Cart model's schema.
    // If your cart model has `ref: 'Rug'`, the path is 'products.productId'
    const cart = await Cart.findOne({ user: userId }).populate('products.productId');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty. Cannot create an order.' });
    }

    // Map cart items to order items
    const orderItems = cart.products.map(item => {
      if (!item.productId) {
        throw new Error('Cart contains an invalid item. Could not find product details.');
      }
      return {
        name: item.productId.name,
        quantity: item.quantity,
        // --- THIS IS THE FIX ---
        // Be flexible: use 'image', or the first image from an 'images' array, or 'imageUrl'.
        image: item.productId.image || (item.productId.images && item.productId.images[0]) || item.productId.imageUrl,
        price: item.productId.price,
        product: item.productId._id,
      }
    });

    // Calculate prices
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = 0.0;
    const shippingPrice = 0.0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create the new order
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear the user's cart
    cart.products = [];
    await cart.save();
    
    res.status(201).json(createdOrder);

  } catch (err) {
    console.error("--- CREATE ORDER CRASH ---", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (err) {
        console.error("--- GET MY ORDERS CRASH ---", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};