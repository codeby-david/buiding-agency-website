import express from "express";
import multer from "multer";
import { createBooking, getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("plotDoc"), createBooking);
router.get("/", getAllBookings);

export default router;
