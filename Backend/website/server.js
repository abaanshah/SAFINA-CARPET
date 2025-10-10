// 1. We only need to import the app and the PORT from our new config
import app from "./src/app.js";
import config from "./src/config/index.js";
import connectDB from "./src/config/db.js";

const PORT = config.PORT;

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running in ${config.NODE_ENV} mode at http://localhost:${PORT}`);
});

