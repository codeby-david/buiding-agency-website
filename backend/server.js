import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";  // ✅ Add this if you have it

dotenv.config();
connectDB();

const app = express();

// Middleware for JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);   // ✅ Fixed
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
