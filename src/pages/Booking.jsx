import React, { useEffect, useState } from "react";
import "./Booking.css";
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

export default function BookingForm() {
  // form state (controlled inputs)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    details: "",
  });

  const [houseType, setHouseType] = useState("Cottage");
  const [budget, setBudget] = useState(150000);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});

  // entrance animation trigger
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.trim().length < 6) err.phone = "Valid phone is required";
    if (!form.country) err.country = "Please choose a country";
    if (!form.address.trim()) err.address = "Address / plot is required";
    // details optional
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      // small shake animation by toggling class
      const container = document.querySelector(".form-container");
      if (container) {
        container.classList.remove("shake");
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        container.offsetWidth;
        container.classList.add("shake");
      }
      return;
    }
    setSubmitting(true);
    try {
      // simulate server request - replace with API call
      await new Promise((r) => setTimeout(r, 900));
      setSuccessMsg("Your booking request was submitted. We'll contact you shortly!");
      // reset lightly (keep selections)
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        address: "",
        details: "",
      });
      setHouseType("Cottage");
      setBudget(150000);
      setErrors({});
      // subtle confetti/visual (check icon animate)
      const successEl = document.querySelector(".submit-success");
      if (successEl) {
        successEl.classList.add("pop");
        setTimeout(() => successEl.classList.remove("pop"), 900);
      }
    } catch (err) {
      setErrors({ submit: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="booking-page">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/videos/construction.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />

      <main className="booking-main">
        <div className={`form-container ${visible ? "fade-in-up" : ""}`} role="region" aria-labelledby="booking-heading">
          <h2 id="booking-heading">House Construction Booking</h2>
          <p className="subtitle">Book your dream home construction — tell us where and we'll take care of the rest.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <div className="field-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <FaGlobe className="icon" />
                <select required value={form.country} onChange={handleChange("country")} aria-invalid={!!errors.country}>
                  <option value="">Select your country</option>
                  <option value="Kenya">Kenya</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
                {errors.country && <div className="field-error">{errors.country}</div>}
              </div>

              <div className="form-group full-width">
                <FaMapMarkerAlt className="icon" />
                <input
                  type="text"
                  placeholder="Street / Plot / Landmark"
                  value={form.address}
                  onChange={handleChange("address")}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <div className="field-error">{errors.address}</div>}
              </div>

              <div className="form-group full-width">
                <textarea
                  placeholder="e.g., near XYZ school, access road, terrain, utilities..."
                  value={form.details}
                  onChange={handleChange("details")}
                />
              </div>
            </div>

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
                      <span className="opt-icon" aria-hidden>
                        {opt.icon}
                      </span>
                      <span className="opt-label">{opt.label}</span>
                      {active && <span className="opt-check" aria-hidden><FaCheckCircle /></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="budget-section">
              <label htmlFor="budget-range">Budget Range</label>
              <div className="budget-row">
                <input
                  id="budget-range"
                  type="range"
                  min="50000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
                <div className="budget-value" aria-live="polite">{fmt(budget)}</div>
              </div>
              <div className="progress-bar" aria-hidden>
                <div className="progress-fill" style={{ width: `${(budget - 50000) / (500000 - 50000) * 100}%` }} />
              </div>
            </div>

            {errors.submit && <div className="field-error">{errors.submit}</div>}

            <div className="submit-row">
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Booking Request"}
              </button>
            </div>

            {successMsg && (
              <div className="submit-success" role="status">
                <FaCheckCircle className="success-icon" /> {successMsg}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}