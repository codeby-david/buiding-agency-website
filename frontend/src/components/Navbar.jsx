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
  FaTachometerAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      // Close mobile menu if clicked outside
      if (isMobileMenuOpen && mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
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
    }, 300);
  };

  const keepDropdownOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when toggling mobile menu
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">🏗 BuildCo</div>

      {/* Hamburger menu for mobile */}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`} ref={mobileMenuRef}>
        <li>
          <Link to="/" onClick={handleNavLinkClick}><FaHome /> Home</Link>
        </li>
        <li>
          <Link to="/services" onClick={handleNavLinkClick}><FaTools /> Services</Link>
        </li>
        <li>
          <Link to="/projects" onClick={handleNavLinkClick}><FaProjectDiagram /> Projects</Link>
        </li>
        <li>
          <Link to="/about" onClick={handleNavLinkClick}><FaInfoCircle /> About Us</Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* Non-admin users see Booking button */}
            {!user?.isAdmin && (
              <li className="desktop-only">
                <Link to="/booking" className="btn-primary1" onClick={handleNavLinkClick}>
                  <FaBook /> Booking
                </Link>
              </li>
            )}

            {/* Admin/Owner sees Dashboard styled as button */}
            {user?.isAdmin && (
              <li className="desktop-only">
                <Link to="/dashboard" className="btn-primary1" onClick={handleNavLinkClick}>
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
            )}

            {/* User dropdown menu - hidden on mobile, shown in separate section */}
            <li
              className="user-menu-item desktop-only"
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
                  <Link to="/profile" className="dropdown-link" onClick={handleNavLinkClick}>
                    <FaUser /> Profile
                  </Link>

                  {!user?.isAdmin && (
                    <Link to="/my-bookings" className="dropdown-link" onClick={handleNavLinkClick}>
                      <FaClipboardList /> My Bookings
                    </Link>
                  )}

                  {user?.isAdmin && (
                    <Link to="/dashboard" className="dropdown-link" onClick={handleNavLinkClick}>
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      handleNavLinkClick();
                    }}
                    className="dropdown-link logout-btn"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </li>

            {/* Mobile user menu - appears at bottom of mobile menu */}
            <div className="mobile-user-menu mobile-only">
              <div className="mobile-user-info">
                <FaUserCircle className="mobile-user-icon" />
                <span className="mobile-user-name">{user?.name}</span>
              </div>
              <div className="mobile-user-links">
                <Link to="/profile" className="mobile-user-link" onClick={handleNavLinkClick}>
                  <FaUser /> Profile
                </Link>

                {!user?.isAdmin && (
                  <>
                    <Link to="/booking" className="mobile-user-link" onClick={handleNavLinkClick}>
                      <FaBook /> Booking
                    </Link>
                    <Link to="/my-bookings" className="mobile-user-link" onClick={handleNavLinkClick}>
                      <FaClipboardList /> My Bookings
                    </Link>
                  </>
                )}

                {user?.isAdmin && (
                  <Link to="/dashboard" className="mobile-user-link" onClick={handleNavLinkClick}>
                    <FaTachometerAlt /> Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    handleNavLinkClick();
                  }}
                  className="mobile-user-link logout-btn"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={handleNavLinkClick}><FaUser /> Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}