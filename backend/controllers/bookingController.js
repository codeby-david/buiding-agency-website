import Booking from "../models/Booking.js";

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Private
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date } = req.body;

    const booking = await Booking.create({
      user: req.user._id, // from protect middleware
      name,
      email,
      phone,
      service,
      date,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// @desc   Get logged-in user's bookings
// @route  GET /api/bookings/my
// @access Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// @desc   Get all bookings (admin only)
// @route  GET /api/bookings
// @access Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all bookings", error: error.message });
  }
};
