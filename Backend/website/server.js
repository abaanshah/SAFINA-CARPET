import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
