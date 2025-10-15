import Cart from "../models/cart.js";
import Rug from "../models/rug.js";

const getUserIdFromRequest = (req) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new Error("CRITICAL: User ID is missing in request!");
  }
  return userId;
};

// @desc    Get the user's cart
export const getCart = async (req, res, next) => {
  try {
    const userId = getUserIdFromRequest(req);
    // FIX: Made the populate call more explicit for robustness
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "products.productId",
      model: "Rug", // Explicitly tell Mongoose to use the "Rug" model
    });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add an item to the cart
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
      if (product.countInStock < qtyToAdd) {
        res.status(400);
        throw new Error("Not enough items in stock.");
      }
      userCart = new Cart({ user: userId, products: [{ productId, quantity: qtyToAdd }] });
    } else {
      const existingItem = userCart.products.find(p => p.productId.toString() === productId);
      if (existingItem) {
        const newTotalQuantity = existingItem.quantity + qtyToAdd;
        if (product.countInStock < newTotalQuantity) {
          res.status(400);
          throw new Error("Not enough items in stock.");
        }
        existingItem.quantity = newTotalQuantity;
      } else {
        if (product.countInStock < qtyToAdd) {
          res.status(400);
          throw new Error("Not enough items in stock.");
        }
        userCart.products.push({ productId, quantity: qtyToAdd });
      }
    }
    
    await userCart.save();

    // --- THIS IS THE FIX ---
    // Instead of doing another complex populate call which can fail for admins,
    // we will manually build the correct response. This is more efficient and robust.
    const finalCart = userCart.toObject(); // Convert Mongoose doc to a plain object
    
    // Find the item we just added/updated
    const updatedItemIndex = finalCart.products.findIndex(p => p.productId.toString() === productId);
    if (updatedItemIndex > -1) {
        // Replace the simple productId with the full product details we already fetched
        finalCart.products[updatedItemIndex].productId = product.toObject();
    }
    
    // Now, populate the rest of the items that might have been in the cart before
    const populatedCart = await Cart.populate(finalCart, { path: "products.productId", model: "Rug" });
    
    res.status(200).json(populatedCart);

  } catch (error) {
    next(error);
  }
};

// @desc    Update an item's quantity in the cart
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
      // FIX: Made the populate call more explicit for robustness
      const populatedCart = await cart.populate({
        path: "products.productId",
        model: "Rug",
      });
      return res.status(200).json(populatedCart);
    } else {
      res.status(404);
      throw new Error("Product not in cart");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove an item from the cart
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
    // FIX: Made the populate call more explicit for robustness
    const populatedCart = await cart.populate({
      path: "products.productId",
      model: "Rug",
    });
    res.status(200).json(populatedCart);
  } catch (error) {
    next(error);
  }
};

