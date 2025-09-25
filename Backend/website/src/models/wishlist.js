// FILE: models/wishlist.js (Corrected)
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  // --- ADDED THIS ENTIRE BLOCK ---
  // This links the wishlist to a specific user and ensures each user has only one.
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    unique: true 
  },
  // --------------------------------

  // --- SIMPLIFIED THIS BLOCK ---
  // Storing just an array of product IDs is more efficient for a wishlist.
  products: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Rug", //make sure your product model is named "Product"
    required: true 
  }],
  // -----------------------------
  
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);