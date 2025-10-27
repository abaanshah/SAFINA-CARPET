import express from "express";
import cors from "cors";
import session from "express-session";
import config from "./config/index.js";
import { configurePassport } from "./config/passport.js";

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
import paymentRoute from "./routes/paymentRoute.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware Setup
app.use(
  cors({
    origin: [
      config.FRONTEND_URL || "http://localhost:5173",
      config.ADMIN_URL || "http://localhost:8080",
      "http://localhost:3000", // Additional fallback for development
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/payments", paymentRoute);

// Root route for health checks
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;

