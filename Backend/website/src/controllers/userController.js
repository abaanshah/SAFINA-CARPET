import * as userService from '../services/userService.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Get all customers for the admin panel
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await userService.getAllCustomers();
  res.json(customers);
});