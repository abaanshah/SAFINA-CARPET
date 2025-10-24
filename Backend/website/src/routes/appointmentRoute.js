// FILE: Backend/website/src/routes/appointmentRoute.js
import express from "express";
import {
  bookAppointment,
  checkAvailability,
  getUserAppointments,
  cancelAppointment,
  getAvailableDates
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/availability", checkAvailability);
router.get("/available-dates", getAvailableDates);

// Protected routes (require authentication)
router.post("/book", protect, bookAppointment);
router.get("/my", protect, getUserAppointments);
router.put("/:id/cancel", protect, cancelAppointment);

export default router;