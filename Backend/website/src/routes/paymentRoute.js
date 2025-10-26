import express from 'express';
import {
  createOrder,
  verifyPayment,
  getPaymentDetails,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', protect, createOrder);

// Verify payment
router.post('/verify-payment', protect, verifyPayment);

// Get payment details
router.get('/payment/:paymentId', protect, getPaymentDetails);

export default router;