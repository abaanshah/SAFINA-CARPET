// FILE: backend/src/middleware/auth.js (Corrected)
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch full user from DB, but without their password for security
    const user = await User.findById(decoded.id || decoded._id).select("-password");
    if (!user) return res.status(401).json({ msg: "User not found" });

    // --- THIS IS THE FIX ---
    // Instead of just attaching the ID, we attach the entire user object.
    // This makes the user's name, email, and isAdmin status available to the next functions.
    req.user = user; 

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is invalid" });
  }
};