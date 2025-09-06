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
  FaClipboardList,
  FaTachometerAlt
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
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000000000);
  };

  const keepDropdownOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="logo">🏗 BuildCo</div>

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

        {isLoggedIn ? (
          <>
            {/* ✅ Non-admin users see Booking + My Bookings */}
            {!user?.isAdmin && (
              <>
                <li>
                  <Link to="/booking" className="btn-primary1">
                    <FaBook /> Booking
                  </Link>
                </li>
                <li>
                  <Link to="/my-bookings">
                    <FaClipboardList /> My Bookings
                  </Link>
                </li>
              </>
            )}

            {/* ✅ Admin/Owner sees Dashboard styled as button */}
            {user?.isAdmin && (
              <li>
                <Link to="/dashboard" className="btn-primary1">
                  <FaTachometerAlt /> Dashboard
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
                  className={`user-dropdown ${isDropdownOpen ? "active" : ""}`}
                  onMouseEnter={keepDropdownOpen}
                  onMouseLeave={closeDropdown}
                >
                  <Link to="/profile" className="dropdown-link">
                    <FaUser /> Profile
                  </Link>

                  {!user?.isAdmin && (
                    <Link to="/my-bookings" className="dropdown-link">
                      <FaClipboardList /> My Bookings
                    </Link>
                  )}

                  {user?.isAdmin && (
                    <Link to="/dashboard" className="dropdown-link">
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="dropdown-link logout-btn"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login"><FaUser /> Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
