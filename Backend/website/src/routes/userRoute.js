import express from 'express';
import { getAllCustomers } from '../controllers/userController.js';
import {protect} from '../middleware/auth.js' ; // Make sure this path is correct
import { admin } from '../middleware/adminMiddleware.js'; // Make sure this path is correct

const router = express.Router();

// GET /api/users - Get all customers (Admin Only)
router.route('/').get(protect, admin, getAllCustomers);

export default router;
