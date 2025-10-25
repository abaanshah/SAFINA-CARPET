import express from "express";
import cors from "cors";
import session from "express-session";

// --- 1. Import Passport and your new config function ---
import passport from "passport";
import { configurePassport } from './config/passport.js';

// It's good practice to import models to prevent potential Mongoose errors
import Order from "./models/order.js";
import Rug from "./models/rug.js";
// Routes
import orderRoute from "./routes/orderRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import testRoute from "./routes/testRoute.js";
import materialRoute from "./routes/materialRoute.js";
import rugRoutes from "./routes/rugRoute.js";
import authRoutes from "./routes/authRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware Setup
app.use(
  cors({
  	origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  	credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  session({
  	secret: process.env.SESSION_SECRET || "supersecret",
  	resave: false,
  	saveUninitialized: false,
  })
);

// --- 2. Initialize Passport ---
// This MUST be called after 'app = express()'
configurePassport(app);


// API Routes
app.use("/api/test", testRoute);
app.use("/api/rugs", rugRoutes);
app.use("/api/materials", materialRoute);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users",userRoute);

// Root route for health checks
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;

