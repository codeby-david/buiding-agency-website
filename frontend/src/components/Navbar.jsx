import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaProjectDiagram,
  FaInfoCircle,
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
  FaClipboardList
} from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state
    setIsLoggedIn(false);
    setUser(null);

    // Redirect to home
    navigate("/");

    // Reload to update navbar everywhere
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">🏗 BuildCo</div>

      {/* Links */}
      <ul className="nav-links">
        <li>
          <Link to="/"><FaHome /> Home</Link>
        </li>
        <li>
          <Link to="/services"><FaTools /> Services</Link>
        </li>
        <li>
          <Link to="/projects"><FaProjectDiagram /> Projects</Link>
        </li>
        <li>
          <Link to="/about"><FaInfoCircle /> About Us</Link>
        </li>
        <li>
          <Link to="/booking" className="btn-primary1">
            <FaBook /> Booking
          </Link>
        </li>

        {isLoggedIn ? (
          // Show when user is logged in
          <>
            {/* Show My Bookings only for non-admin users */}
            {!user?.isAdmin && (
              <li>
                <Link to="/my-bookings">
                  <FaClipboardList /> My Bookings
                </Link>
              </li>
            )}

            {/* User dropdown menu */}
            <li className="user-menu-item">
              <div className="user-menu">
                <FaUserCircle className="user-icon" />
                <span className="user-name">{user?.name}</span>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-link">
                    <FaUser /> Profile
                  </Link>

                  {/* Show My Bookings only for non-admin users in dropdown too */}
                  {!user?.isAdmin && (
                    <Link to="/my-bookings" className="dropdown-link">
                      <FaClipboardList /> My Bookings
                    </Link>
                  )}

                  <button onClick={handleLogout} className="dropdown-link logout-btn">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </li>
          </>
        ) : (
          // Show when user is not logged in
          <li>
            <Link to="/login"><FaUser /> Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}