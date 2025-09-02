import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import "./Services.css";

const carouselImages = [
  "./images/luxury-home.jpg",
  "./images/energy-home.jpg",
  "./images/family-home.jpg",
];

const services = [
  {
    title: "House Design & Architecture",
    description: "We create modern and sustainable house designs tailored to your needs.",
    longDescription: "Our architectural services include conceptual design, detailed planning, 3D visualization, and permit acquisition. We focus on sustainable materials and energy-efficient designs that reduce environmental impact while creating beautiful living spaces.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Custom Home Design", "3D Visualization", "Sustainable Solutions", "Permit Assistance"]
  },
  {
    title: "Construction & Building",
    description: "From foundation to finishing, we deliver quality construction services with precision and expertise.",
    longDescription: "Our construction team manages every aspect of your project with meticulous attention to detail. We use high-quality materials and proven techniques to ensure structural integrity and longevity. Regular progress updates and strict timeline management keep your project on track.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Quality Materials", "Timeline Management", "Skilled Craftsmanship", "Project Supervision"]
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your old house into a modern, comfortable living space with our expert renovation services.",
    longDescription: "We specialize in transforming outdated spaces into modern masterpieces. Our renovation process includes careful planning to minimize disruption, structural assessments, and creative solutions to maximize your space's potential while maintaining its character.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Space Optimization", "Structural Updates", "Modernization", "Minimal Disruption"]
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const elementsRef = useRef([]);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.1 }
    );
    elementsRef.current.forEach(el => el && observer.observe(el));
    return () => elementsRef.current.forEach(el => el && observer.unobserve(el));
  }, []);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const toggleServiceExpansion = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="services-page">
      {/* Carousel */}
      <div className="carousel-container">
        <div className="carousel-overlay"></div>
        <Navbar transparent={true} />
        <div className="carousel">
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className={`carousel-slide ${i === currentIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Slide ${i}`} className="carousel-image" />
              <div className="slide-overlay"></div>
            </div>
          ))}

          <div className="carousel-content">
            <h2>Building Dreams Into Reality</h2>
            <p>Expert construction and design services for your perfect home</p>
            <a href="#services" className="carousel-cta-btn">
              Explore Our Services <ArrowRight size={20} />
            </a>
          </div>

          <button className="carousel-btn left" onClick={handlePrev}><ChevronLeft size={32} /></button>
          <button className="carousel-btn right" onClick={handleNext}><ChevronRight size={32} /></button>

          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <div
                key={i}
                className={`indicator ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              ></div>
            ))}
          </div>
        </div>

      </div>

      {/* Services Section */}
      <div className="page-content" id="services">
        <div className="section-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Comprehensive solutions from concept to completion</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className={`service-card ${expandedService === i ? 'expanded' : ''}`}
              ref={el => elementsRef.current[i] = el}
            >
              <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-image" onClick={() => setModalImage(service.image)} />
                <div className="service-overlay">
                  <button className="view-details-btn" onClick={() => setModalImage(service.image)}>
                    <ZoomIn size={20} /> Enlarge
                  </button>
                </div>
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {expandedService === i && (
                  <div className="expanded-content">
                    <p>{service.longDescription}</p>
                    <div className="service-features">
                      <h4>What We Offer:</h4>
                      <ul>
                        {service.features.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Buttons always rendered here */}
                <div className="service-actions">
                  {expandedService === i && (
                    <a href="/contact" className="service-cta-btn">Request This Service</a>
                  )}
                  <button
                    className="expand-service-btn"
                    onClick={() => toggleServiceExpansion(i)}
                  >
                    {expandedService === i ? 'Show Less' : 'Learn More'}
                  </button>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <button className="modal-close" onClick={() => setModalImage(null)}><X size={32} /></button>
          <img src={modalImage} alt="Large view" className="modal-content" />
        </div>
      )}
    </div>
  );
}
