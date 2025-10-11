import express from "express";
// 1. Import the new updateRug and deleteRug controller functions
import { createRug, getRugs, getRugById, updateRug, deleteRug } from "../controllers/rugController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/adminMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// --- Routes for the collection of rugs ---
router.route("/")
  .get(getRugs) // GET /api/rugs - Fetches all rugs (Public)
  .post(protect, admin, uploadMiddleware, createRug); // POST /api/rugs - Creates a new rug (Admin Only)

// --- Routes for a specific rug by ID ---
router.route("/:id")
  .get(getRugById) // GET /api/rugs/:id - Fetches a single rug (Public)
  .put(protect, admin, updateRug) // 2. Added PUT route for updating a rug (Admin Only)
  .delete(protect, admin, deleteRug); // 3. Added DELETE route for deleting a rug (Admin Only)

export default router;

