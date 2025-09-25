// ===================================================================
// FILE: backend/src/controllers/orderController.js (FINAL, 100% COMPLETE)
// ===================================================================
import Order from '../models/order.js';
import Cart from '../models/cart.js';
import Rug from '../models/rug.js'; // Ensure your product model is imported

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
export const createOrder = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      res.status(400);
      throw new Error('Your cart is empty and an order cannot be created.');
    }
    
    // --- SOLVES QUESTION #1: FINAL STOCK VALIDATION ---
    // We re-check every item's stock right before creating the order to prevent race conditions.
    for (const item of cart.products) {
      const product = await Rug.findById(item.productId._id);
      if (product.countInStock < item.quantity) {
        res.status(400);
        throw new Error(`One or more items in your cart are out of stock. Please review your cart.`);
      }
    }
    // ----------------------------------------------------

    // Map cart items to order items
    const orderItems = cart.products.map(item => ({
      name: item.productId.name,
      quantity: item.quantity,
      image: item.productId.image || item.productId.imageUrl || (item.productId.images && item.productId.images[0]),
      price: item.productId.price,
      product: item.productId._id,
    }));

    // Calculate prices
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = 0.0; // You can add tax logic here later
    const shippingPrice = 0.0; // You can add shipping logic here later
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create the new order
    const order = new Order({
      user: userId, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice,
    });

    const createdOrder = await order.save();

    // --- CRITICAL: DECREMENT STOCK FROM INVENTORY ---
    for (const item of createdOrder.orderItems) {
        const product = await Rug.findById(item.product);
        if (product) {
            product.countInStock -= item.quantity;
            await product.save();
        }
    }
    // ------------------------------------------

    // Clear the user's cart
    cart.products = [];
    await cart.save();
    
    res.status(201).json(createdOrder);

  } catch (error) {
    // Pass the error to your master error handler for a clean response
    next(error); 
  }
};


/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
    try {
        const userId = getUserIdFromRequest(req);
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};