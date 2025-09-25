// src/config/db.js
import mongoose from "mongoose";

/**
 * @description Establishes a connection to the MongoDB database.
 * The connection string is retrieved from environment variables for security.
 */
const ConnectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    // Log any connection errors and exit the process with a failure code
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default ConnectDB;
