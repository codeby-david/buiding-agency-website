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
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCalendarAlt,
  FaFileUpload,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Booking.css";
import Footer from "../components/Footer";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    details: "",
    budget: "",
    startDate: "",
    endDate: "",
    plotSize: "",
    bedrooms: "",
    bathrooms: "",
    plotDoc: null,
  });

  const [houseType, setHouseType] = useState("Cottage");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  // Animation setup
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
    if (key === "plotDoc") {
      setForm((s) => ({ ...s, plotDoc: e.target.files[0] }));
    } else {
      setForm((s) => ({ ...s, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
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
      err.budget = "Enter a valid budget (min ksh50,000)";
    if (!form.startDate) err.startDate = "Project start date is required";
    if (!form.endDate) err.endDate = "Preferred completion date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      err.endDate = "Completion date must be after start date";
    if (!form.plotSize || isNaN(Number(form.plotSize)) || Number(form.plotSize) <= 0)
      err.plotSize = "Enter a valid plot size";
    if (!form.bedrooms || isNaN(Number(form.bedrooms)) || Number(form.bedrooms) < 1)
      err.bedrooms = "Enter number of bedrooms";
    if (!form.bathrooms || isNaN(Number(form.bathrooms)) || Number(form.bathrooms) < 1)
      err.bathrooms = "Enter number of bathrooms";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setSubmitting(true);
    try {
      // Get the authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Please log in to make a booking");
      }

      // Prepare FormData
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });
      formData.append("houseType", houseType);

      // Send request with authentication
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit booking");
      }

      const data = await res.json();
      console.log("Booking saved:", data);

      setSuccessMsg("✅ Your booking request was submitted. We'll contact you shortly!");
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        address: "",
        details: "",
        budget: "",
        startDate: "",
        endDate: "",
        plotSize: "",
        bedrooms: "",
        bathrooms: "",
        plotDoc: null,
      });
      setHouseType("Cottage");
      setErrors({});
    } catch (err) {
      console.error("Booking error:", err);
      setErrors({ submit: err.message || "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="booking-page">
        <video autoPlay loop muted playsInline className="bg-video2">
          <source src="/videos/construction4.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>

        <Navbar />

        <main className="booking-main">
          <div className={`form-container ${visible ? "fade-in-up" : ""}`}>
            <div className="form-header">
              <FaHome /> <h2>🏠 House Construction Booking</h2>
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
                    placeholder="+254 7000000000"
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
                    <option value="" >Select your country</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Somalia">Somalia</option>
                    <option value="Egypt">Egypt</option>
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
                    placeholder="Street / Plot "
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
                    placeholder="Extra details (road, nearby landmarks...)"
                    value={form.details}
                    onChange={handleChange("details")}
                  />
                </div>
                {/* Project Start Date */}
                <div className="form-group">
                  <FaCalendarAlt className="icon" />
                  <input
                    type="date"
                    placeholder="Project Start Date"
                    value={form.startDate}
                    onChange={handleChange("startDate")}
                    aria-invalid={!!errors.startDate}
                    aria-describedby={errors.startDate ? "startDate-error" : null}
                  />
                  {errors.startDate && (
                    <div id="startDate-error" className="field-error">
                      {errors.startDate}
                    </div>
                  )}
                </div>
                {/* Preferred Completion Date */}
                <div className="form-group">
                  <FaCalendarAlt className="icon" />
                  <input
                    type="date"
                    placeholder="Preferred Completion Date"
                    value={form.endDate}
                    onChange={handleChange("endDate")}
                    aria-invalid={!!errors.endDate}
                    aria-describedby={errors.endDate ? "endDate-error" : null}
                  />
                  {errors.endDate && (
                    <div id="endDate-error" className="field-error">
                      {errors.endDate}
                    </div>
                  )}
                </div>
                {/* Plot Size */}
                <div className="form-group">
                  <FaRulerCombined className="icon" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Plot Size (sq. meters)"
                    value={form.plotSize}
                    onChange={handleChange("plotSize")}
                    aria-invalid={!!errors.plotSize}
                    aria-describedby={errors.plotSize ? "plotSize-error" : null}
                  />
                  {errors.plotSize && (
                    <div id="plotSize-error" className="field-error">
                      {errors.plotSize}
                    </div>
                  )}
                </div>
                {/* Bedrooms */}
                <div className="form-group">
                  <FaBed className="icon" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of Bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange("bedrooms")}
                    aria-invalid={!!errors.bedrooms}
                    aria-describedby={errors.bedrooms ? "bedrooms-error" : null}
                  />
                  {errors.bedrooms && (
                    <div id="bedrooms-error" className="field-error">
                      {errors.bedrooms}
                    </div>
                  )}
                </div>
                {/* Bathrooms */}
                <div className="form-group">
                  <FaBath className="icon" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of Bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange("bathrooms")}
                    aria-invalid={!!errors.bathrooms}
                    aria-describedby={errors.bathrooms ? "bathrooms-error" : null}
                  />
                  {errors.bathrooms && (
                    <div id="bathrooms-error" className="field-error">
                      {errors.bathrooms}
                    </div>
                  )}
                </div>
                {/* Plot Document Upload */}
                <div className="form-group full-width">
                  <FaFileUpload className="icon" />
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange("plotDoc")}
                    aria-describedby="plotDoc-help"
                    style={{ paddingLeft: "2.5rem", paddingTop: "0.7rem" }}
                  />
                  <small id="plotDoc-help" style={{ color: "#888", marginLeft: "2.5rem" }}>
                    (Optional) Upload plot document (PDF, JPG, PNG)
                  </small>
                  {form.plotDoc && (
                    <div style={{ color: "#ff8000", marginLeft: "2.5rem", fontSize: "0.95rem" }}>
                      Selected: {form.plotDoc.name}
                    </div>
                  )}
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
                  <button onClick={() => setSuccessMsg("")} className="close-btn">
                    ×
                  </button>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}