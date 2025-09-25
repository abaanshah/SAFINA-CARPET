// FILE: src/routes/orderRoutes.js

import express from 'express';
import { protect } from '../middleware/auth.js';
import { createOrder, getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

// All routes in this file will be protected and require a valid token
router.use(protect);

// Route to get the logged-in user's orders
router.route('/myorders').get(getMyOrders);

// Route to create a new order
router.route('/').post(createOrder);


export default router;