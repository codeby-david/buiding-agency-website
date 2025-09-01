import React, { useEffect } from "react";
import "./Services.css";

import designImg from "../images/design.jpg";
import constructionImg from "../images/construction.jpg";
import renovationImg from "../images/renovation.jpg";
import interiorImg from "../images/interior.jpg";
import landscapingImg from "../images/landscaping.jpg";
import consultationImg from "../images/consultation.jpg";

export default function ServicesPage() {
  const services = [
    {
      title: "House Design & Architecture",
      description: "We create modern and functional house designs tailored to your needs.",
      image: designImg,
    },
    {
      title: "Construction & Building",
      description: "Professional building services ensuring quality and durability.",
      image: constructionImg,
    },
    {
      title: "Renovation & Remodeling",
      description: "Transform your existing house with our expert renovation team.",
      image: renovationImg,
    },
    {
      title: "Interior Design",
      description: "Stylish and functional interior design for every room.",
      image: interiorImg,
    },
    {
      title: "Landscaping",
      description: "Beautiful outdoor spaces to complement your new home.",
      image: landscapingImg,
    },
    {
      title: "Consultation & Project Management",
      description: "Expert guidance from planning to project completion.",
      image: consultationImg,
    },
  ];

  // Fade-in animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="services-page">
      <div className="hero">
        <h1>Our Services</h1>
        <p>Building your dream home with quality, safety, and care.</p>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="cta">
        <h2>Ready to start your project?</h2>
        <button>Contact Us</button>
      </div>
    </div>
  );
}
