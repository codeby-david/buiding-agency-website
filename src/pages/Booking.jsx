import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaMapMarkerAlt,
  FaGlobe,
  FaWarehouse,
  FaLandmark,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Booking.css";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    details: "",
    budget: "",
  });

  const [houseType, setHouseType] = useState("Cottage");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  // Rain drops for animation
  const [rainDrops, setRainDrops] = useState([]);
  useEffect(() => {
    const drops = [];
    for (let i = 0; i < 30; i++) {
      drops.push({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 1.5,
      });
    }
    setRainDrops(drops);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const houseOptions = [
    { id: "Cottage", label: "Cottage", icon: <FaHome /> },
    { id: "Bungalow", label: "Bungalow", icon: <FaWarehouse /> },
    { id: "Mansion", label: "Mansion", icon: <FaLandmark /> },
    { id: "Duplex", label: "Duplex", icon: <FaBuilding /> },
  ];

  const handleChange = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.trim().length < 6)
      err.phone = "Valid phone is required";
    if (!form.country) err.country = "Please choose a country";
    if (!form.address.trim()) err.address = "Address / plot is required";
    if (!form.budget || isNaN(Number(form.budget)) || Number(form.budget) < 50000)
      err.budget = "Enter a valid budget (min $50,000)";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      const container = document.querySelector(".form-container");
      if (container) {
        container.classList.remove("shake");
        container.offsetWidth;
        container.classList.add("shake");
      }
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSuccessMsg(
        "✅ Your booking request was submitted. We'll contact you shortly!"
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        address: "",
        details: "",
        budget: "",
      });
      setHouseType("Cottage");
      setErrors({});
    } catch {
      setErrors({ submit: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
        poster="/images/rainy-house-fallback.jpg"
      >
        <source src="/videos/construction4.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
      <div className="rain-effect">
        {rainDrops.map((drop, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          />
        ))}
      </div>
      <Navbar />

      <main className="booking-main">
        <div
          className={`form-container ${visible ? "fade-in-up" : ""}`}
          role="region"
          aria-labelledby="booking-heading"
        >
          <div className="form-header">
            <span className="rain-icon" role="img" aria-label="rain">
              <FaHome />
            </span>
            <h2 id="booking-heading">🏠 House Construction Booking</h2>
            <p className="subtitle">
              Book your dream home construction — tell us where and we'll handle the rest.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : null}
                />
                {errors.name && (
                  <div id="name-error" className="field-error">
                    {errors.name}
                  </div>
                )}
              </div>
              {/* Email */}
              <div className="form-group">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : null}
                />
                {errors.email && (
                  <div id="email-error" className="field-error">
                    {errors.email}
                  </div>
                )}
              </div>
              {/* Phone */}
              <div className="form-group">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : null}
                />
                {errors.phone && (
                  <div id="phone-error" className="field-error">
                    {errors.phone}
                  </div>
                )}
              </div>
              {/* Country */}
              <div className="form-group">
                <FaGlobe className="icon" />
                <select
                  required
                  value={form.country}
                  onChange={handleChange("country")}
                  aria-invalid={!!errors.country}
                  aria-describedby={errors.country ? "country-error" : null}
                >
                  <option value="">Select your country</option>
                  <option value="Kenya">Kenya</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
                {errors.country && (
                  <div id="country-error" className="field-error">
                    {errors.country}
                  </div>
                )}
              </div>
              {/* Address */}
              <div className="form-group full-width">
                <FaMapMarkerAlt className="icon" />
                <input
                  type="text"
                  placeholder="Street / Plot / Landmark"
                  value={form.address}
                  onChange={handleChange("address")}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "address-error" : null}
                />
                {errors.address && (
                  <div id="address-error" className="field-error">
                    {errors.address}
                  </div>
                )}
              </div>
              {/* Details */}
              <div className="form-group full-width">
                <textarea
                  placeholder="Extra details (terrain, road, nearby landmarks...)"
                  value={form.details}
                  onChange={handleChange("details")}
                />
              </div>
            </div>
            {/* House Type */}
            <div className="house-type">
              <label>Type of House:</label>
              <div className="options" role="list">
                {houseOptions.map((opt) => {
                  const active = houseType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="listitem"
                      aria-pressed={active}
                      className={`option-btn ${active ? "active" : ""}`}
                      onClick={() => setHouseType(opt.id)}
                    >
                      <span className="opt-icon">{opt.icon}</span>
                      <span className="opt-label">{opt.label}</span>
                      {active && (
                        <span className="opt-check">
                          <FaCheckCircle />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Budget */}
            <div className="form-group" style={{ maxWidth: 220 }}>
              <FaHome className="icon" />
              <input
                id="budget-input"
                type="number"
                min="50000"
                step="1000"
                placeholder="Enter your budget"
                value={form.budget}
                onChange={handleChange("budget")}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : null}
              />
              {errors.budget && (
                <div id="budget-error" className="field-error">
                  {errors.budget}
                </div>
              )}
            </div>
            {errors.submit && (
              <div className="field-error">{errors.submit}</div>
            )}
            {/* Submit */}
            <div className="submit-row">
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? <span className="spinner"></span> : "Submit Booking Request"}
              </button>
            </div>
            {/* Success */}
            {successMsg && (
              <div className="submit-success" role="status">
                <FaCheckCircle className="success-icon" /> {successMsg}
                <button
                  onClick={() => setSuccessMsg("")}
                  className="close-btn"
                  aria-label="Dismiss success message"
                >
                  ×
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}