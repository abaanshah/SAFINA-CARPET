// FILE: controllers/cartController.js (Corrected)
import Cart from "../models/cart.js";

// Helper function to safely get the user ID from the request
const getUserIdFromRequest = (req) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new Error("CRITICAL: User ID is missing in request!");
  }
  return userId;
};

// --- No changes to getCart or addToCart ---
export const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    let cart = await Cart.findOne({ user: userId }).populate("products.productId");
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
      return res.status(200).json(cart);
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("--- GET CART CRASH ---", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }
    const index = cart.products.findIndex(p => p.productId.toString() === productId);
    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    const populatedCart = await cart.populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error("--- ADD TO CART CRASH ---", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// --- THIS FUNCTION IS NOW CORRECTED ---
export const updateCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.params; // Get productId from the URL
    const { quantity } = req.body;   // Get new quantity from the request body

    if (quantity < 1) {
      // If quantity is less than 1, just remove the item instead
      return removeFromCart(req, res);
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(p => p.productId.toString() === productId);

    if (index > -1) {
      cart.products[index].quantity = quantity;
      await cart.save();
      const populatedCart = await cart.populate('products.productId');
      return res.status(200).json(populatedCart);
    }

    res.status(404).json({ message: "Product not in cart" });
  } catch (err) {
    console.error("--- UPDATE CART CRASH ---", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// --- No changes to removeFromCart ---
export const removeFromCart = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    const populatedCart = await cart.populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error("--- REMOVE FROM CART CRASH ---", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};