import React, { useState, useEffect, useRef } from "react";
import "./Services.css";

const carouselImages = [
  "/images/project1.jpg",
  "/images/project2.jpg",
  "/images/project3.jpg",
];

const services = [
  {
    title: "House Design & Architecture",
    description: "We create modern and sustainable house designs tailored to your needs.",
    image: "/images/service1.jpg",
  },
  {
    title: "Construction & Building",
    description: "From foundation to finishing, we deliver quality construction services.",
    image: "/images/service2.jpg",
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your old house into a modern, comfortable living space.",
    image: "/images/service3.jpg",
  },
  {
    title: "Interior Design",
    description: "Beautiful interior designs that combine elegance with functionality.",
    image: "/images/service4.jpg",
  },
  {
    title: "Landscaping",
    description: "Enhance your outdoors with professional landscaping and gardening.",
    image: "/images/service5.jpg",
  },
  {
    title: "Consultation & Project Management",
    description: "Expert guidance and management to ensure your project succeeds.",
    image: "/images/service6.jpg",
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const elementsRef = useRef([]);

  // Auto slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="services-page">
      {/* Carousel */}
      <h2 className="carousel-title">Featured Projects</h2>
      <div className="carousel">
        <img
          src={carouselImages[currentIndex]}
          alt="Featured Project"
          className="carousel-image"
          loading="lazy"
          onClick={() => setModalImage(carouselImages[currentIndex])}
        />
        <button
          className="carousel-btn left"
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + carouselImages.length) % carouselImages.length
            )
          }
        >
          ❮
        </button>
        <button
          className="carousel-btn right"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % carouselImages.length)
          }
        >
          ❯
        </button>
      </div>

      {/* Services Section */}
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card fade-in-up"
            ref={(el) => (elementsRef.current[index] = el)}
          >
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
              loading="lazy"
              onClick={() => setModalImage(service.image)}
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div
        className="cta-section fade-in-up"
        ref={(el) => elementsRef.current.push(el)}
      >
        <h2>Let’s Build Your Dream Home</h2>
        <p>Contact us today and start your journey to a better home.</p>
        <a href="/contact" className="cta-btn">Get in Touch</a>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Large view" className="modal-content" />
        </div>
      )}
    </div>
  );
}
