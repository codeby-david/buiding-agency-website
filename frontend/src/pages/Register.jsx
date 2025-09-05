import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // 🔗 Axios instance
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("All fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate phone number (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid phone number (at least 10 digits)");
      return;
    }

    // Validate password strength
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ FIXED: Changed endpoint from "/users/register" to "/auth/register"
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email.toLowerCase().trim(),
        phone: cleanPhone,
        password: form.password
      });

      alert("Registration successful! Please login.");
      console.log("✅ Registered user:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);

      if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid registration data");
      } else if (err.response?.status === 409) {
        setError("Email or phone number already exists");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.request) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join us to book your dream house</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <FaPhone className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (e.g., 1234567890)"
              value={form.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          {error && <div className="field-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}