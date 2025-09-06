import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get current user's bookings
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new booking (with file upload support)
router.post("/", protect, upload.single("plotDoc"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      address,
      details,
      budget,
      startDate,
      endDate,
      plotSize,
      bedrooms,
      bathrooms,
      houseType,
    } = req.body;

    const booking = new Booking({
      name,
      email,
      phone,
      country,
      address,
      details,
      budget: Number(budget),
      startDate,
      endDate,
      plotSize: Number(plotSize),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      houseType,
      plotDoc: req.file ? req.file.filename : null,
      user: req.user._id, // attach logged-in user
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings (admin only)
router.get("/", protect, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 }).populate("user", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;