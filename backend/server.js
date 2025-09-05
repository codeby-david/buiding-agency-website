import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// ✅ Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173",   // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// DB connect
mongoose.connect("mongodb+srv://admin:42276888@myapp.g20pxzq.mongodb.net/?retryWrites=true&w=majority&appName=myapp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
