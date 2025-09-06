import User from "../models/User.js";
import jwt from "jsonwebtoken";

//  Generate JWT Token including isAdmin
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET || "fallbackSecret", {
    expiresIn: "30d",
  });
};

// --- Register Controller ---
export const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    let user;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = await User.findOne({ phone: phone.trim().replace(/\D/g, "") });
    }

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.isAdmin);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login controller error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
