// FILE: backend/src/middleware/adminMiddleware.js (New File)

export const admin = (req, res, next) => {
  // This middleware runs AFTER the 'protect' middleware, so we can
  // safely assume that req.user exists and has been attached.
  if (req.user && req.user.isAdmin) {
    // If the user object is there AND they have the isAdmin flag,
    // allow the request to proceed to the controller.
    next();
  } else {
    // If they are not an admin, block the request with a "Forbidden" error.
    res.status(403).json({ message: 'Forbidden: Not authorized as an admin' });
  }
};