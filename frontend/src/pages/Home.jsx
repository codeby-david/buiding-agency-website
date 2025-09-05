import React, { useState, useEffect } from "react";
import "./Home.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';
import { motion } from "framer-motion";

// Import house images (you'll need to add these to your project)
import StarterHomeImg from "/images/starter-home.jpg";
import FamilyHomeImg from "/images/family-home.jpg";
import CustomHomeImg from "/images/custom-home.jpg";
import LuxuryHomeImg from "/images/luxury-home.jpg";
import MultiGenHomeImg from "/images/multigen-home.jpg";
import EnergyHomeImg from "/images/energy-home.jpg";
import Footer from "../components/Footer";

const videos = [
  {
    src: "/videos/construction1.mp4",
    heading: "Building Dreams, One Home at a Time",
    text: "We specialize in crafting modern, durable, and affordable housing solutions."
  },
  {
    src: "/videos/construction2.mp4",
    heading: "Sustainable Construction",
    text: "Using eco-friendly materials and energy-efficient designs for a greener future."
  },
  {
    src: "/videos/construction3.mp4",
    heading: "Trusted by Hundreds of Families",
    text: "Our track record of completed projects speaks for itself."
  },
  {
    src: "/videos/construction4.mp4",
    heading: "From Foundation to Finish",
    text: "We handle every stage of your construction journey with excellence."
  }
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide videos every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  return (
    <>
      {/* Hero section with video background */}
      <div className="hero-section">
        <Navbar />
        <div className="bg-video-wrap">
          {videos.map((video, index) => (
            <video
              key={index}
              className={`bg-video ${index === current ? "is-active" : ""}`}
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
            />
          ))}
          <div className="bg-scrim" />
        </div>

        {/* Foreground content */}
        <div className="homepage">
          <div key={current} className="content">
            <h1 className="typing-text">{videos[current].heading}</h1>
            <p className="typing-sub">{videos[current].text}</p>
            <p className="sub-text">Quality • Innovation • Trust</p>
            <Link to="/booking">
              <button className="cta-btn">Book a Consultation</button>
            </Link>
          </div>

          <div className="controls">
            <button onClick={prevSlide}><ChevronLeft size={35} /></button>
            <button onClick={nextSlide}><ChevronRight size={35} /></button>
          </div>

          {/* Dots */}
          <div className="dots">
            {videos.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Rest of the page content */}
      <div className="page-content">
        {/* ---------------- ABOUT SECTION ---------------- */}
        <motion.section
          className="about-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Building the Future, With Integrity and Discipline</h2>
          <p>
            At BuildCo Solutions, we believe in building homes that stand the test of time.
            With over 15 years of industry experience, we've successfully delivered 500+ projects
            that combine structural excellence with timeless design. Our team of skilled craftsmen,
            architects, and project managers work together to create durable, efficient, and
            beautiful homes for families across the region.
          </p>
          <div className="stats-container">
            <div className="stat">
              <h3>500+</h3>
              <p>Homes Built</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="stat">
              <h3>120+</h3>
              <p>Skilled Craftsmen</p>
            </div>
          </div>
        </motion.section>

        {/* ---------------- PRICING SECTION (House Construction) ---------------- */}
        <motion.section
          className="pricing-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Transparent Construction Pricing</h2>
          <p className="section-subtitle">Honest pricing for quality homes built with integrity and discipline</p>
          <div className="pricing-grid">
            <motion.div whileHover={{ scale: 1.05 }} className="price-card">
              <div className="house-image">
                <img src={StarterHomeImg} alt="Starter Home" />
              </div>
              <div className="price-header">
                <h3>Starter Home</h3>
                <p>Perfect for first-time homeowners</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">2.3M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> Basic finishes & standard materials</li>
                <li><FaCheckCircle className="check-icon" /> 2-3 bedroom layout</li>
                <li><FaCheckCircle className="check-icon" /> Standard foundation</li>
                <li><FaCheckCircle className="check-icon" /> Energy-efficient windows</li>
                <li><FaCheckCircle className="check-icon" /> 1-year construction warranty</li>
              </ul>
              <button className="price-btn">Get Quote</button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="price-card">
              <div className="house-image">
                <img src={FamilyHomeImg} alt="Family Home" />
              </div>
              <div className="price-header">
                <h3>Family Home</h3>
                <p>Spacious design for growing families</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">4.2M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> Mid-grade finishes</li>
                <li><FaCheckCircle className="check-icon" /> 3-4 bedrooms + family room</li>
                <li><FaCheckCircle className="check-icon" /> Enhanced insulation</li>
                <li><FaCheckCircle className="check-icon" /> Quality cabinetry</li>
                <li><FaCheckCircle className="check-icon" /> 2-year construction warranty</li>
              </ul>
              <button className="price-btn">Get Quote</button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="price-card featured">
              <div className="popular-badge">MOST POPULAR</div>
              <div className="house-image">
                <img src={CustomHomeImg} alt="Custom Home" />
              </div>
              <div className="price-header">
                <h3>Custom Home</h3>
                <p>Tailored to your specific needs</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">8.5M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> Premium finishes throughout</li>
                <li><FaCheckCircle className="check-icon" /> Custom floor plan design</li>
                <li><FaCheckCircle className="check-icon" /> High-efficiency HVAC system</li>
                <li><FaCheckCircle className="check-icon" /> Professional landscaping package</li>
                <li><FaCheckCircle className="check-icon" /> 5-year construction warranty</li>
              </ul>
              <button className="price-btn featured-btn">Get Quote</button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="price-card">
              <div className="house-image">
                <img src={LuxuryHomeImg} alt="Luxury Home" />
              </div>
              <div className="price-header">
                <h3>Luxury Home</h3>
                <p>Exceptional quality with premium details</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">15M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> High-end finishes & custom details</li>
                <li><FaCheckCircle className="check-icon" /> Architectural design services</li>
                <li><FaCheckCircle className="check-icon" /> Smart home technology integration</li>
                <li><FaCheckCircle className="check-icon" /> Premium hardwood flooring</li>
                <li><FaCheckCircle className="check-icon" /> 10-year structural warranty</li>
              </ul>
              <Link to="/about">
                <button className="price-btn">Get Quote</button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="price-card">
              <div className="house-image">
                <img src={MultiGenHomeImg} alt="Multi-Generational Home" />
              </div>
              <div className="price-header">
                <h3>Multi-Generational</h3>
                <p>Designed for extended family living</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">18M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> Separate living quarters</li>
                <li><FaCheckCircle className="check-icon" /> Dual master suites</li>
                <li><FaCheckCircle className="check-icon" /> Soundproofing between units</li>
                <li><FaCheckCircle className="check-icon" /> Separate utility connections</li>
                <li><FaCheckCircle className="check-icon" /> 7-year construction warranty</li>
              </ul>
              <button className="price-btn">Get Quote</button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="price-card">
              <div className="house-image">
                <img src={EnergyHomeImg} alt="Energy Plus Home" />
              </div>
              <div className="price-header">
                <h3>Energy Plus Home</h3>
                <p>Ultra-efficient sustainable building</p>
              </div>
              <div className="price-amount">
                <span className="currency">Ksh</span>
                <span className="amount">20M</span>
                <span className="period">starting from</span>
              </div>
              <ul>
                <li><FaCheckCircle className="check-icon" /> Net-zero energy ready</li>
                <li><FaCheckCircle className="check-icon" /> Solar panel preparation</li>
                <li><FaCheckCircle className="check-icon" /> Superior insulation & air sealing</li>
                <li><FaCheckCircle className="check-icon" /> Energy recovery ventilation</li>
                <li><FaCheckCircle className="check-icon" /> 10-year warranty + energy performance guarantee</li>
              </ul>
              <button className="price-btn">Get Quote</button>
            </motion.div>
          </div>
        </motion.section>

        {/* ---------------- TESTIMONIALS SECTION ---------------- */}
        <motion.section
          className="testimonials-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Trusted by Families Across the Region</h2>
          <p className="section-subtitle">Hear what our clients have to say about their dream homes</p>
          <div className="testimonials-grid">
            <motion.div whileHover={{ scale: 1.05 }} className="testimonial-card">
              <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>“BuildCo Solutions delivered our family home ahead of schedule and within budget. Their attention to detail and quality craftsmanship is evident in every corner of our new home.”</p>
              <div className="client-info">
                <div className="avatar"></div>
                <div className="client-details">
                  <h4>SARAH WAIRIMU</h4>
                  <p>Homeowner, Ruiru</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="testimonial-card">
              <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>“We were impressed with the disciplined approach and integrity of the construction team. They kept us informed throughout the process and delivered exactly what was promised.”</p>
              <div className="client-info">
                <div className="avatar"></div>
                <div className="client-details">
                  <h4>DAVID MATHENGE</h4>
                  <p>Homeowner, Westlands</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="testimonial-card">
              <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>“The custom design process was seamless, and the result is a home that perfectly fits our lifestyle. The quality of construction is exceptional - we couldn't be happier.”</p>
              <div className="client-info">
                <div className="avatar"></div>
                <div className="client-details">
                  <h4>ROBERT THUO</h4>
                  <p>Homeowner, Nakuru</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;