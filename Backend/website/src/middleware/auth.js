import jwt from "jsonwebtoken";
import User from "../models/user.js";
import config from '../config/index.js'; // 1. Import from our new config file

const JWT_SECRET = config.JWT_SECRET; // 2. Get the secret from the config object

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    
    // 3. This verification will now work correctly
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id || decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "Not authorized, user not found" });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// Also include the admin middleware for completeness
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

