// ===================================================================
// FILE: backend/src/controllers/cartController.js (Simplified & Robust Logic)
// ===================================================================
import Cart from "../models/cart.js";
import Rug from "../models/rug.js";

const getUserIdFromRequest = (req) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new Error("CRITICAL: User ID is missing in request!");
  }
  return userId;
};

// @desc    Get the user's cart
export const getCart = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    let cart = await Cart.findOne({ user: userId }).populate("products.productId");
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add an item to the cart
export const addToCart = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId, quantity: qtyToAdd } = req.body;

    const [cart, product] = await Promise.all([
      Cart.findOne({ user: userId }),
      Rug.findById(productId)
    ]);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    let userCart = cart;
    if (!userCart) {
      // This is a new cart. Check stock for the new item.
      if (product.countInStock < qtyToAdd) {
        res.status(400);
        throw new Error("Not enough items in stock.");
      }
      userCart = new Cart({ user: userId, products: [{ productId, quantity: qtyToAdd }] });
    } else {
      // Cart already exists. Check if the item is already in the cart.
      const existingItem = userCart.products.find(p => p.productId.toString() === productId);

      if (existingItem) {
        // Item is already in cart. Check if adding more exceeds stock.
        const newTotalQuantity = existingItem.quantity + qtyToAdd;
        if (product.countInStock < newTotalQuantity) {
          res.status(400);
          throw new Error("Not enough items in stock.");
        }
        existingItem.quantity = newTotalQuantity;
      } else {
        // Item is new to the cart. Check stock for the new item.
        if (product.countInStock < qtyToAdd) {
          res.status(400);
          throw new Error("Not enough items in stock.");
        }
        userCart.products.push({ productId, quantity: qtyToAdd });
      }
    }
    
    await userCart.save();
    const populatedCart = await userCart.populate('products.productId');
    res.status(200).json(populatedCart);

  } catch (error) {
    next(error);
  }
};

// @desc    Update an item's quantity in the cart
export const updateCartItem = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return removeFromCart(req, res, next);
    }

    const [cart, product] = await Promise.all([
      Cart.findOne({ user: userId }),
      Rug.findById(productId)
    ]);
    
    if (!cart || !product) {
      res.status(404);
      throw new Error("Cart or Product not found");
    }
    
    if (product.countInStock < quantity) {
      res.status(400);
      throw new Error("Not enough items in stock.");
    }

    const itemToUpdate = cart.products.find(p => p.productId.toString() === productId);

    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      await cart.save();
      const populatedCart = await cart.populate('products.productId');
      return res.status(200).json(populatedCart);
    } else {
      res.status(404);
      throw new Error("Product not in cart");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove an item from the cart
export const removeFromCart = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    const populatedCart = await cart.populate('products.productId');
    res.status(200).json(populatedCart);
  } catch (error) {
    next(error);
  }
};