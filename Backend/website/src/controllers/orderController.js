import Order from '../models/order.js';
import Cart from '../models/cart.js';
import Rug from '../models/rug.js'; // Ensure your product model is imported
import asyncHandler from 'express-async-handler'; // Using asyncHandler for cleaner error handling

// Helper to safely get user ID
const getUserIdFromRequest = (req) => {
  const userId = req.user?._id;
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
export const createOrder = asyncHandler(async (req, res) => {
    const userId = getUserIdFromRequest(req);
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      res.status(400);
      throw new Error('Your cart is empty and an order cannot be created.');
    }
    
    // Final stock validation before creating the order
    for (const item of cart.products) {
      const product = await Rug.findById(item.productId._id);
      if (product.countInStock < item.quantity) {
        res.status(400);
        throw new Error(`One or more items in your cart are out of stock. Please review your cart.`);
      }
    }

    // Map cart items to order items
    const orderItems = cart.products.map(item => ({
      name: item.productId.name,
      quantity: item.quantity,
      image: item.productId.imageUrl, // Use imageUrl for consistency
      price: item.productId.price,
      product: item.productId._id,
    }));

    // Calculate prices
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = 0.0;
    const shippingPrice = 0.0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create the new order
    const order = new Order({
      user: userId, orderItems, shippingAddress, paymentMethod, totalPrice,
    });

    const createdOrder = await order.save();

    // Decrement stock from inventory
    for (const item of createdOrder.orderItems) {
        const product = await Rug.findById(item.product);
        if (product) {
            product.countInStock -= item.quantity;
            await product.save();
        }
    }

    // Clear the user's cart
    await Cart.updateOne({ user: userId }, { $set: { products: [] } });
    
    res.status(201).json(createdOrder);
});


/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
    const userId = getUserIdFromRequest(req);
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getOrders = asyncHandler(async (req, res) => {
  // Populate the 'user' field to get the user's name and email for the admin table
  const orders = await Order.find({}).populate('user', 'id name email');
  res.json(orders);
});

/**
 * @desc    Update an order's status (e.g., to Shipped, Delivered)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const { newStatus, courierName, trackingNumber } = req.body;

    order.orderStatus = newStatus;

    // If the order is being marked as "Shipped", add the tracking info
    if (newStatus === 'Shipped') {
      order.shippingInfo = {
        courierName: courierName,
        trackingNumber: trackingNumber,
        shippingDate: new Date(),
      };
    }
    
    // If the order is "Delivered", set the delivery flags
    if (newStatus === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

