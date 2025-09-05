import React, { useState, useEffect, useRef } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);

    // Redirect to home
    navigate("/");

    // Reload to update navbar everywhere
    window.location.reload();
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const closeDropdown = () => {
    // Add delay before closing
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000000000); // 300ms delay
  };

  const keepDropdownOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
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
            <li
              className="user-menu-item"
              ref={dropdownRef}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <div className="user-menu">
                <FaUserCircle className="user-icon" />
                <span className="user-name">{user?.name}</span>
                <div
                  className={`user-dropdown ${isDropdownOpen ? 'active' : ''}`}
                  onMouseEnter={keepDropdownOpen}
                  onMouseLeave={closeDropdown}
                >
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