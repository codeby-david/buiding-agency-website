import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    details: { type: String },
    budget: { type: Number, required: true },
    startDate: { type: String, required: true },  // keep as string if frontend sends numbers
    endDate: { type: String, required: true },
    plotSize: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    houseType: { type: String, required: true },
    plotDoc: { type: String }, // file name if uploaded
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
