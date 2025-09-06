import Booking from "../models/Booking.js";

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Public
export const createBooking = async (req, res) => {
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

    const plotDoc = req.file ? req.file.filename : null;

    const booking = await Booking.create({
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
      plotDoc,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

//  Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
