import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaProjectDiagram,
  FaInfoCircle,
  FaBook,
  FaUser,
} from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
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
        <li>
          <Link to="/login"><FaUser /> Login/Register</Link>
        </li>
      </ul>
    </nav>
  );
}
