import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "../components/Navbar";
import "./Services.css";

const carouselImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
  "../images/project1.jpg",
  "../images/project2.jpg",
];

const services = [
  {
    title: "House Design & Architecture",
    description: "We create modern and sustainable house designs tailored to your needs.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFyY2hpdGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Construction & Building",
    description: "From foundation to finishing, we deliver quality construction services.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your old house into a modern, comfortable living space.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlbm92YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Interior Design",
    description: "Beautiful interior designs that combine elegance with functionality.",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Landscaping",
    description: "Enhance your outdoors with professional landscaping and gardening.",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Consultation & Project Management",
    description: "Expert guidance and management to ensure your project succeeds.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdCUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80",
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const elementsRef = useRef([]);
  const transitionTimer = useRef(null);

  // Auto slide for carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // Changed to 10 seconds

    return () => {
      clearInterval(interval);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, [currentIndex]);

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

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);

    // Clear any existing timer
    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    // Set timer to reset transitioning state after animation completes
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

    // Clear any existing timer
    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    // Set timer to reset transitioning state after animation completes
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);

    // Clear any existing timer
    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    // Set timer to reset transitioning state after animation completes
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  };

  return (
    <>
      <div className="services-page">
        {/* Carousel with full-screen effect */}
        <div className="carousel-container">
          <div className="carousel-overlay"></div>
          <Navbar transparent={true} />

          <div className="carousel">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''} ${index === (currentIndex - 1 + carouselImages.length) % carouselImages.length ? 'prev' : ''}`}
              >
                <img
                  src={image}
                  alt={`Featured Project ${index + 1}`}
                  className="carousel-image"
                  loading="lazy"
                />
                <div className="slide-overlay"></div>
              </div>
            ))}

            <div className="carousel-content">
              <h2>Building Dreams Into Reality</h2>
              <p>Expert construction and design services for your perfect home</p>
            </div>

            <button
              className="carousel-btn left"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="carousel-btn right"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>

            {/* <div className="carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div> */}
          </div>
        </div>

        {/* Services Section */}
        <div className="page-content">
          <h2 className="services-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card fade-in-up"
                ref={(el) => (elementsRef.current[index] = el)}
              >
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                    loading="lazy"
                    onClick={() => setModalImage(service.image)}
                  />
                  <div className="service-overlay">
                    <button
                      className="view-details-btn"
                      onClick={() => setModalImage(service.image)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className="cta-section fade-in-up"
            ref={(el) => elementsRef.current.push(el)}
          >
            <h2>Let's Build Your Dream Home</h2>
            <p>Contact us today and start your journey to a better home.</p>
            <a href="/contact" className="cta-btn">Get in Touch</a>
          </div>
        </div>

        {/* Modal */}
        {modalImage && (
          <div className="modal" onClick={() => setModalImage(null)}>
            <button className="modal-close" onClick={() => setModalImage(null)}>
              <X size={32} />
            </button>
            <img src={modalImage} alt="Large view" className="modal-content" />
          </div>
        )}
      </div>
    </>
  );
}