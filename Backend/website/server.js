// server.js

import app from "./src/app.js";
import config from "./src/config/index.js";
import connectDB from "./src/config/db.js";

const PORT = config.PORT || 5000;

// Connect DB
connectDB();

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running in ${config.NODE_ENV || "production"} mode`);
  console.log(`🌐 Listening on port ${PORT}`);
});
