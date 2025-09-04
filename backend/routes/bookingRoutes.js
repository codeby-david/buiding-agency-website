// routes/bookingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);        // logged-in user
router.get("/my", protect, getMyBookings);       // user’s own bookings
router.get("/", protect, admin, getAllBookings); // admin only

// 👇 IMPORTANT: export default router
export default router;
