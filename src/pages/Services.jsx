import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ArrowRight,
  UserPlus,
  ClipboardCheck,
  Hammer,
  Home,
  Smile,
} from "lucide-react";
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
    longDescription:
      "Our architectural services include conceptual design, detailed planning, 3D visualization, and permit acquisition. We focus on sustainable materials and energy-efficient designs that reduce environmental impact while creating beautiful living spaces.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    features: ["Custom Home Design", "3D Visualization", "Sustainable Solutions", "Permit Assistance"],
  },
  {
    title: "Construction & Building",
    description:
      "From foundation to finishing, we deliver quality construction services with precision and expertise.",
    longDescription:
      "Our construction team manages every aspect of your project with meticulous attention to detail. We use high-quality materials and proven techniques to ensure structural integrity and longevity. Regular progress updates and strict timeline management keep your project on track.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    features: ["Quality Materials", "Timeline Management", "Skilled Craftsmanship", "Project Supervision"],
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transform your old house into a modern, comfortable living space with our expert renovation services.",
    longDescription:
      "We specialize in transforming outdated spaces into modern masterpieces. Our renovation process includes careful planning to minimize disruption, structural assessments, and creative solutions to maximize your space's potential while maintaining its character.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    features: ["Space Optimization", "Structural Updates", "Modernization", "Minimal Disruption"],
  },
  {
    title: "Interior Design",
    description: "Beautiful, functional interiors that reflect your lifestyle.",
    longDescription:
      "From spatial planning to finishes and lighting, we create interiors that balance comfort, utility, and style.",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=600&q=80",
    features: ["Space Planning", "Custom Furniture", "Lighting Design", "Material & Color Selection"],
  },
  {
    title: "Landscape Design",
    description: "Turn outdoor areas into stunning, livable spaces.",
    longDescription:
      "We plan gardens, hardscapes, and water features with sustainable irrigation for year-round enjoyment.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    features: ["Garden Design", "Outdoor Living", "Water Features", "Eco Irrigation"],
  },
  // ✅ NEW service added
  {
    title: "Smart Home & MEP Engineering",
    description: "Modern building systems and smart-home automation that save energy and boost comfort.",
    longDescription:
      "We design and coordinate Mechanical, Electrical, and Plumbing (MEP) with smart-home automation—security, lighting, HVAC zoning, and energy monitoring—so your home runs efficiently.",
    image:
      "https://images.unsplash.com/photo-1555617117-08fda9f3a6e1?auto=format&fit=crop&w=600&q=80",
    features: ["HVAC & Electrical Plans", "Smart Lighting & Security", "Energy Monitoring", "Plumbing Layouts"],
  },
];

const steps = [
  { icon: <UserPlus size={40} />, title: "Register", text: "Create an account or contact us to get started." },
  { icon: <ClipboardCheck size={40} />, title: "Consultation", text: "Share goals, budget, and timeline with our team." },
  { icon: <Hammer size={40} />, title: "Design & Build", text: "We design, plan, and construct with clear milestones." },
  { icon: <Home size={40} />, title: "Delivery", text: "Final walkthrough and handover of your project." },
  { icon: <Smile size={40} />, title: "After Support", text: "Post-project support and maintenance guidance." },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const elementsRef = useRef([]);

  // ==== Animated stats ====
  const statsRef = useRef(null);
  const [stats, setStats] = useState({ projects: 0, clients: 0, awards: 0, years: 0 });
  const hasAnimated = useRef(false);
  const statTargets = { projects: 200, clients: 50, awards: 12, years: 10 };
  const statDuration = 1800; // ms

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Scroll animations for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    elementsRef.current.forEach((el) => el && observer.observe(el));
    return () => elementsRef.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  // Start stats animation when stats section enters view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (!hasAnimated.current && entries[0]?.isIntersecting) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min(1, (now - start) / statDuration);
            setStats({
              projects: Math.round(progress * statTargets.projects),
              clients: Math.round(progress * statTargets.clients),
              awards: Math.round(progress * statTargets.awards),
              years: Math.round(progress * statTargets.years),
            });
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const toggleServiceExpansion = (index) =>
    setExpandedService(expandedService === index ? null : index);

  return (
    <div className="services-page">
      {/* ===== Carousel ===== */}
      <div className="carousel-container">
        <div className="carousel-overlay"></div>
        <Navbar transparent={true} />
        <div className="carousel">
          {carouselImages.map((img, i) => (
            <div key={i} className={`carousel-slide ${i === currentIndex ? "active" : ""}`}>
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

          <button
            className="carousel-btn left"
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
            }
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="carousel-btn right"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselImages.length)}
          >
            <ChevronRight size={32} />
          </button>

          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <div
                key={i}
                className={`indicator ${i === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Services ===== */}
      <div className="page-content" id="services">
        <div className="section-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Comprehensive solutions from concept to completion</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className={`service-card ${expandedService === i ? "expanded" : ""}`}
              ref={(el) => (elementsRef.current[i] = el)}
            >
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                  onClick={() => setModalImage(service.image)}
                />
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

                <div className="service-actions">
                  {expandedService === i && <a href="/contact" className="service-cta-btn">Request This Service</a>}
                  <button className="expand-service-btn" onClick={() => toggleServiceExpansion(i)}>
                    {expandedService === i ? "Show Less" : "Learn More"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Animated Stats ===== */}
      <div className="stats-section" ref={statsRef}>
        <div className="stat-item">
          <h3>{stats.projects}+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-item">
          <h3>{stats.clients}+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stat-item">
          <h3>{stats.awards}</h3>
          <p>Awards Won</p>
        </div>
        <div className="stat-item">
          <h3>{stats.years}+</h3>
          <p>Years of Experience</p>
        </div>
      </div>

      {/* ===== Steps to Get Our Services ===== */}
      <div className="steps-section">
        <h2 className="steps-title">How to Get Our Services</h2>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Modal ===== */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <button className="modal-close" onClick={() => setModalImage(null)}>
            <X size={32} />
          </button>
          <img src={modalImage} alt="Large view" className="modal-content" />
        </div>
      )}
    </div>
  );
}
