// FILE: routes/wishlistRoutes.js (Corrected)
import express from "express";
// --- ADDED THIS LINE ---
import { protect } from "../middleware/auth.js";
// -------------------------
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

// --- ADDED THIS LINE ---
// This applies the 'protect' middleware to ALL routes defined below in this file.
// It ensures only logged-in users can access their wishlist.
router.use(protect);
// -------------------------

// Now these routes are secure and will receive req.user
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;