// FILE: routes/cartRoute.js (Corrected)
import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // Applies protection to all routes below

router.route("/")
  .get(getCart)
  .post(addToCart);

// --- THIS LINE IS THE FIX ---
// The route now accepts a productId in the URL
router.route("/:productId")
  .delete(removeFromCart)
  .put(updateCartItem);

export default router;