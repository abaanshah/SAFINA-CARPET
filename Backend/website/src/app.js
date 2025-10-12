// FILE: src/app.js (Corrected)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import Order from './models/order.js'; // <-- Add this to prevent MissingSchemaError

// ... later in the file, with your other app.use() calls

// --- ADD THIS LINE TO REGISTER YOUR RUG MODEL ---
// This ensures Mongoose knows what a "Rug" is before any routes are used.
import Rug from "./models/rug.js";
// ------------------------------------------------

// Routes
import orderRoute from './routes/orderRoute.js'; 
import wishlistRoute from "./routes/wishlistRoute.js";
import testRoute from "./routes/testRoute.js";
import materialRoute from "./routes/materialRoute.js";
import rugRoutes from "./routes/rugRoute.js";
import authRoutes from "./routes/authRoute.js";
import cartRoute from "./routes/cartRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin:[process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  })
  );
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  
  // Session setup
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "supersecret",
      resave: false,
      saveUninitialized: false,
    })
    );
    
    // Routes
    app.use("/api/test", testRoute);
    app.use("/api/rugs", rugRoutes);
    app.use("/api/materials", materialRoute);
    app.use("/api/auth", authRoutes);
    app.use("/api/cart", cartRoute);
    app.use("/api/wishlist", wishlistRoute);
    app.use('/api/orders', orderRoute); // <-- Add this
    app.use('/api/appointments', appointmentRoute);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;