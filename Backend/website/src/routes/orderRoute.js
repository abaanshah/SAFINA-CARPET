import express from 'express';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/adminMiddleware.js'; 

// --- UPDATED: Import the correct controller functions ---
import { 
    createOrder, 
    getMyOrders,
    getOrders,
    updateOrderStatus // Changed from updateOrderToDelivered
} from '../controllers/orderController.js';

const router = express.Router();

// --- USER-SPECIFIC ROUTES ---
// These routes are protected, but accessible by any logged-in user.
router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, createOrder);


// --- ADMIN-ONLY ROUTES ---
// These routes require the user to be both logged in (protect) AND an admin (admin).

// GET /api/orders - Get all orders (no change)
router.route('/').get(protect, admin, getOrders); 

// --- UPDATED: This route is now more flexible ---
// PUT /api/orders/:id/status - Updates the order's status to any valid state
router.route('/:id/status').put(protect, admin, updateOrderStatus);


export default router;

