import React, { useState, useEffect } from "react";
import "./Services.css";

import designImg from "../images/design.jpg";
import constructionImg from "../images/construction.jpg";
import renovationImg from "../images/renovation.jpg";
import interiorImg from "../images/interior.jpg";
import landscapingImg from "../images/landscaping.jpg";
import consultationImg from "../images/consultation.jpg";

import project1 from "../images/project1.jpg";
import project2 from "../images/project2.jpg";
import project3 from "../images/project3.jpg";

export default function ServicesPage() {
  const services = [
    { title: "House Design & Architecture", description: "We create modern and functional house designs tailored to your needs.", image: designImg },
    { title: "Construction & Building", description: "Professional building services ensuring quality and durability.", image: constructionImg },
    { title: "Renovation & Remodeling", description: "Transform your existing house with our expert renovation team.", image: renovationImg },
    { title: "Interior Design", description: "Stylish and functional interior design for every room.", image: interiorImg },
    { title: "Landscaping", description: "Beautiful outdoor spaces to complement your new home.", image: landscapingImg },
    { title: "Consultation & Project Management", description: "Expert guidance from planning to project completion.", image: consultationImg },
  ];

  const featuredProjects = [project1, project2, project3];
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const length = featuredProjects.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  // Auto slide every 5s
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  // Fade-in animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="services-page">
      {/* Carousel */}
      <div className="carousel">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
        {featuredProjects.map((img, index) => (
          <div key={index} className={index === current ? "carousel-item active" : "carousel-item"}>
            {index === current && (
              <img
                src={img}
                alt={`Project ${index + 1}`}
                loading="lazy"
                onClick={() => { setModalOpen(true); setModalImage(img); }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal for carousel */}
      {modalOpen && (
        <div className="modal" onClick={() => setModalOpen(false)}>
          <img src={modalImage} alt="Large Project" />
        </div>
      )}

      {/* Hero Section */}
      <div className="hero">
        <h1>Our Services</h1>
        <p>Building your dream home with quality, safety, and care.</p>
      </div>

      {/* Services Cards */}
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} loading="lazy" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h2>Ready to start your project?</h2>
        <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          Contact Us
        </button>
      </div>

      {/* Contact Section Placeholder */}
      <div id="contact" style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Contact Form</h2>
        {/* Add your contact form here */}
      </div>
    </div>
  );
}
