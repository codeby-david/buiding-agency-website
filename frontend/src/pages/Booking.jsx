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
import Footer from "../components/Footer";
import api from "../api/axios"; // 🔗 Axios instance
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
      err.budget = "Enter a valid budget (min $50,000)";
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
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });
      formData.append("houseType", houseType);

      // Attach JWT token
      const token = localStorage.getItem("token");
      const res = await api.post("/bookings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMsg("✅ Your booking request was submitted!");
      console.log("Booking saved:", res.data);

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
      console.error(err.response?.data || err.message);
      setErrors({ submit: err.response?.data?.message || "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="booking-page">
        {/* Video background */}
        <video autoPlay loop muted playsInline className="bg-video2">
          <source src="/videos/construction4.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>

        <Navbar />

        <main className="booking-main">
          <div className={`form-container ${visible ? "fade-in-up" : ""}`}>
            <div className="form-header">
              <FaHome className="rain-icon" />
              <h2>🏠 House Construction Booking</h2>
              <p className="subtitle">
                Book your dream home construction — tell us where and we'll handle the rest.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* all your inputs stay the same */}
              {/* ... */}
              <div className="submit-row">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? <span className="spinner"></span> : "Submit Booking Request"}
                </button>
              </div>

              {errors.submit && <div className="field-error">{errors.submit}</div>}
              {successMsg && (
                <div className="submit-success">
                  <FaCheckCircle className="success-icon" /> {successMsg}
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
