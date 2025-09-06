import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCalendarAlt,
  FaMoneyBill,
  FaRulerCombined,
  FaBed,
  FaBath,
} from "react-icons/fa";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

// Manual JWT decode (fallback)
const manualJwtDecode = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Manual JWT decode failed:", error);
    return null;
  }
};

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please login as admin.");
          setLoading(false);
          return;
        }

        // Decode token
        const decoded = manualJwtDecode(token);
        if (!decoded || !decoded.isAdmin) {
          setError("Access denied. Admins only."); // ❌ Show message inside dashboard
          setLoading(false);
          return;
        }

        // Fetch bookings from backend
        const res = await api.get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Fetch bookings error:", err);
        if (err.response && err.response.status === 401) {
          setError("❌ Unauthorized. Your session may have expired.");
        } else {
          setError("❌ Failed to load bookings. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="owner-dashboard">
        <h2 className="dashboard-title">ADMIN DASHBOARD - CUSTOMER BOOKINGS</h2>

        {loading ? (
          <p className="loading">Loading bookings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          <div className="booking-list">
            {bookings.map((b) => (
              <div key={b._id} className="booking-card">
                <h3>
                  <FaHome /> {b.houseType} Project
                </h3>
                <p>
                  <FaUser /> <strong>{b.name}</strong>
                </p>
                <p>
                  <FaEnvelope /> {b.email}
                </p>
                <p>
                  <FaPhone /> {b.phone}
                </p>
                <p>
                  <FaMoneyBill /> Budget: ${b.budget}
                </p>
                <p>
                  <FaRulerCombined /> Plot: {b.plotSize} sqm
                </p>
                <p>
                  <FaBed /> Bedrooms: {b.bedrooms} | <FaBath /> Bathrooms: {b.bathrooms}
                </p>
                <p>
                  <FaCalendarAlt /> {b.startDate} → {b.endDate}
                </p>
                <p>
                  <strong>Address:</strong> {b.address}, {b.country}
                </p>
                <p>
                  <strong>Details:</strong> {b.details || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
