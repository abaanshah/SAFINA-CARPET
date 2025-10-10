import express from "express";
import { createRug, getRugs, getRugById } from "../controllers/rugController.js";
import { protect} from "../middleware/auth.js";
import {admin} from "../middleware/adminMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.route("/").get(getRugs);
router.route("/:id").get(getRugById);

// Admin-only route
router.route("/").post(protect, admin, uploadMiddleware, createRug);

// --- THE FIX IS HERE ---
// This line tells other files that the 'router' is the main, default thing being exported.
export default router;
