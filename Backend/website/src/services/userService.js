import User from '../models/user.js';
import Order from '../models/order.js';
import Wishlist from '../models/wishlist.js';

/**
 * @desc    Get all customers with aggregated data
 * @access  Admin
 */
export const getAllCustomers = async () => {
  try {
    const customers = await User.aggregate([
      {
        $match: { isAdmin: false } // Only get customers, not other admins
      },
      {
        $lookup: {
          from: 'orders', // The name of the 'orders' collection
          localField: '_id',
          foreignField: 'user',
          as: 'orders'
        }
      },
      {
        $lookup: {
          from: 'wishlists', // The name of the 'wishlists' collection
          localField: '_id',
          foreignField: 'user',
          as: 'wishlist'
        }
      },
      {
        $unwind: {
          path: '$wishlist',
          preserveNullAndEmptyArrays: true // Keep users even if they have no wishlist
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          // isBlocked field removed to match your user model
          createdAt: 1, // "Registered" date
          lastLogin: 1,
          orderCount: { $size: '$orders' },
          wishlistCount: { $size: { $ifNull: ['$wishlist.products', []] } },
          lastOrderAt: { $max: '$orders.createdAt' } 
        }
      },
      {
        $sort: { createdAt: -1 } // Show newest customers first
      }
    ]);
    return customers;
  } catch (error) {
    console.error("Error in getAllCustomers service:", error);
    throw new Error('Could not retrieve customers');
  }
};