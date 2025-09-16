// src/middleware/errorMiddleware.js

/**
 * @description Middleware to handle not-found routes (404 errors).
 * It creates a new error object and passes it to the next middleware.
 */
export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * @description Generic error handler middleware.
 * It catches all errors passed from other middleware or route handlers.
 */
export const errorHandler = (err, req, res, next) => {
  // Check if the response status code is already set. If so, use it; otherwise, default to 500.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // In development, we include the stack trace for debugging. In production, we hide it.
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
