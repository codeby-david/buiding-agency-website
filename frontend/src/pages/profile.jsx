import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaSave, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      console.log("Loaded user:", userObj);
      setUser(userObj);
      setFormData(prev => ({
        ...prev,
        name: userObj.name || "",
        email: userObj.email || "",
        phone: userObj.phone || ""
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditMode(false);
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="loading">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1><FaUser /> Profile</h1>
            {!editMode ? (
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            ) : (
              <button
                className="cancel-btn"
                onClick={() => {
                  setEditMode(false);
                  setError("");
                  setMessage("");
                  setFormData(prev => ({
                    ...prev,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                  }));
                }}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group2">
              <label><FaUser /> Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>

            <div className="form-group2">
              <label><FaEnvelope /> Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
                required
              />
            </div>

            <div className="form-group2">
              <label><FaPhone /> Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <>
                <div className="password-section">
                  <h3>Change Password</h3>

                  <div className="form-group2">
                    <label><FaLock /> Current Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group2">
                    <label><FaLock /> New Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div className="form-group2">
                    <label><FaLock /> Confirm New Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  <FaSave /> Save Changes
                </button>
              </>
            )}
          </form>

          <div className="user-info">
            <h3>Account Information</h3>
            <p><strong>User ID:</strong> {user._id}</p>
            <p><strong>Account Type:</strong> {user.isAdmin ? "Administrator" : "Regular User"}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
