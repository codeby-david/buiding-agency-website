import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authmiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Public booking
router.post("/", upload.single("plotDoc"), createBooking);

// Admin can see all bookings
router.get("/", protect, admin, getAllBookings);

export default router;