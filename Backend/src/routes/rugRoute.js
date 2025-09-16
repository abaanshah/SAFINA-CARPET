import express from "express";
import { getRugs, getRugById } from "../controllers/rugController.js";

const router = express.Router();

// Fetch all rugs
router.get("/", getRugs);

// Fetch single rug by ID
router.get("/:id", getRugById);

export default router;
