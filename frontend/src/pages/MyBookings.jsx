import React, { useState, useEffect } from "react";
import { FaHome, FaCalendarAlt, FaMoneyBill, FaRulerCombined, FaBed, FaBath, FaUser, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:5000/api/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (error) {
        setError("An error occurred while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="status-confirmed" />;
      case "pending":
        return <FaClock className="status-pending" />;
      case "cancelled":
        return <FaTimesCircle className="status-cancelled" />;
      default:
        return <FaClock className="status-pending" />;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bookings-container">
          <div className="loading">Loading your bookings...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bookings-container">
        <div className="bookings-header">
          <h1><FaCalendarAlt /> My Bookings</h1>
          <p>Manage and view all your construction project bookings</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <h2>No bookings yet</h2>
            <p>You haven't made any bookings yet. Start your construction project today!</p>
            <a href="/booking" className="btn-primary">Book Now</a>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3><FaHome /> {booking.houseType} Project</h3>
                  <div className={`status ${booking.status}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-group">
                    <h4>Project Details</h4>
                    <p><FaMoneyBill /> <strong>Budget:</strong> ${booking.budget}</p>
                    <p><FaRulerCombined /> <strong>Plot Size:</strong> {booking.plotSize} sqm</p>
                    <p><FaBed /> <strong>Bedrooms:</strong> {booking.bedrooms}</p>
                    <p><FaBath /> <strong>Bathrooms:</strong> {booking.bathrooms}</p>
                  </div>

                  <div className="detail-group">
                    <h4>Timeline</h4>
                    <p><FaCalendarAlt /> <strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><FaCalendarAlt /> <strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>

                  <div className="detail-group">
                    <h4>Contact Info</h4>
                    <p><FaUser /> <strong>{booking.name}</strong></p>
                    <p><FaEnvelope /> {booking.email}</p>
                    <p><FaPhone /> {booking.phone}</p>
                  </div>

                  {booking.address && (
                    <div className="detail-group">
                      <h4>Location</h4>
                      <p>{booking.address}</p>
                      {booking.country && <p>{booking.country}</p>}
                    </div>
                  )}

                  {booking.details && (
                    <div className="detail-group">
                      <h4>Additional Details</h4>
                      <p>{booking.details}</p>
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  <button className="btn-secondary">View Details</button>
                  {booking.status === "pending" && (
                    <button className="btn-danger">Cancel Booking</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}