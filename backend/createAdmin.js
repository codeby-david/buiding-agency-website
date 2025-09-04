// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const plainPassword = "admin123"; // 👈 your admin password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existing = await User.findOne({ email: "admin@buildingapp.com" });
    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin User",
      email: "admin@buildingapp.com",
      phone: "0700000000",
      password: hashedPassword,
      isAdmin: true,
      role: "admin",
    });

    console.log("✅ Admin created:", admin);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
