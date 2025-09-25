// FILE: controllers/wishlistController.js (Corrected and Final Version)
import Wishlist from "../models/wishlist.js";

// Helper function to safely get the user ID from the request
const getUserIdFromRequest = (req) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new Error("CRITICAL: User ID is missing in request!");
  }
  return userId;
};

// Get the logged-in user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    
    // Find the wishlist for the SPECIFIC user and populate the product details
    let wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    // If no wishlist exists for this user, create one FOR THEM
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    console.error("--- GET WISHLIST CRASH ---", err);
    res.status(500).json({ message: "Error fetching wishlist", error: err.message });
  }
};

// Add a product to the logged-in user's wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.body;
    
    // Find the user's wishlist and add the new productId.
    // 'upsert: true' creates a new wishlist FOR THIS USER if one doesn't already exist.
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    ).populate("products");

    res.status(200).json(updatedWishlist);
  } catch (err) {
    console.error("--- ADD TO WISHLIST CRASH ---", err);
    res.status(500).json({ message: "Error adding to wishlist", error: err.message });
  }
};

// Remove a product from the logged-in user's wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.params;

    // Find the user's wishlist and remove the productId from the 'products' array.
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!updatedWishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(updatedWishlist);
  } catch (err) {
    console.error("--- REMOVE FROM WISHLIST CRASH ---", err);
    res.status(500).json({ message: "Error removing from wishlist", error: err.message });
  }
};