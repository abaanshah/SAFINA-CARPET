import express from "express";
import { fetchAllMaterials, addMaterial } from "../controllers/materialController.js";

const router = express.Router();

router.get("/", fetchAllMaterials);
router.post("/", addMaterial);

export default router;
