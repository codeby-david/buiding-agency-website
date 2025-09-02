import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { ZoomIn, X } from "lucide-react";
import "./Projects.css";

// ---- Helpers ----
const fallbackImg =
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=60";
const onImgError = (e) => {
  if (!e.target.dataset.fallback) {
    e.target.dataset.fallback = "1";
    e.target.src = fallbackImg;
  }
};

// ---- Data ----
const completedProjects = [
  {
    id: "luxury-villa",
    title: "Luxury Villa",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    location: "Beverly Hills, CA",
    completed: "June 2023",
    cost: "$1.5M",
    description:
      "A modern villa with eco-friendly design, infinity pool, and smart home integration.",
  },
  {
    id: "urban-apartments",
    title: "Urban Apartment Complex",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    location: "New York, NY",
    completed: "March 2023",
    cost: "$3.2M",
    description:
      "High-rise residential apartments with rooftop garden and luxury amenities.",
  },
  {
    id: "coastal-home",
    title: "Coastal Family Home",
    image:
      "https://images.unsplash.com/photo-1600566753052-dc5adc3dd44d?auto=format&fit=crop&w=1200&q=80",
    location: "Miami, FL",
    completed: "January 2023",
    cost: "$800k",
    description:
      "Beachfront home designed for comfort, durability, and stunning ocean views.",
  },
  {
    id: "office-tower",
    title: "Modern Office Tower",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    location: "Chicago, IL",
    completed: "October 2022",
    cost: "$4.5M",
    description:
      "50-story office building with energy-efficient systems and smart elevators.",
  },
  {
    id: "cottage",
    title: "Countryside Cottage",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
    location: "Nashville, TN",
    completed: "August 2022",
    cost: "$350k",
    description:
      "Rustic yet modern cottage surrounded by nature, built with sustainable wood.",
  },
  {
    id: "downtown-hotel",
    title: "Downtown Hotel",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    location: "Las Vegas, NV",
    completed: "May 2022",
    cost: "$6M",
    description:
      "Luxury hotel with 150 rooms, rooftop pool, and conference halls.",
  },
  {
    id: "mountain-cabin",
    title: "Mountain Cabin",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1200&q=80",
    location: "Denver, CO",
    completed: "February 2022",
    cost: "$500k",
    description:
      "Scenic cabin retreat designed for winter resilience and cozy interiors.",
  },
  {
    id: "eco-school",
    title: "Eco-Friendly School",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    location: "Austin, TX",
    completed: "December 2021",
    cost: "$2.1M",
    description:
      "A sustainable school campus powered by solar energy and rainwater harvesting.",
  },
  {
    id: "city-mall",
    title: "City Mall",
    image:
      "https://images.unsplash.com/photo-1542317854-f9596ae570f9?auto=format&fit=crop&w=1200&q=80",
    location: "San Francisco, CA",
    completed: "September 2021",
    cost: "$10M",
    description:
      "Multi-level shopping mall with smart parking and luxury retail outlets.",
  },
  {
    id: "healthcare-center",
    title: "Healthcare Center",
    image:
      "https://images.unsplash.com/photo-1576675784219-3e29f8c2f0e4?auto=format&fit=crop&w=1200&q=80",
    location: "Seattle, WA",
    completed: "July 2021",
    cost: "$3.7M",
    description:
      "State-of-the-art hospital facility with emergency and outpatient services.",
  },
];

const ongoingProjects = [
  // Reliable construction/ongoing images
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const cardsRef = useRef([]);

  // Animate-in on scroll (unobserve after first reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target); // prevent re-triggers
          }
        });
      },
      { threshold: 0.12 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="projects-page">
      <Navbar />

      {/* Hero */}
      <header className="projects-hero">
        <h1>Our Projects</h1>
        <p>From vision to reality — explore our completed work and ongoing builds</p>
      </header>

      {/* Completed Projects */}
      <section className="projects-section">
        <h2 className="section-title">Completed Projects</h2>
        <div className="projects-grid">
          {completedProjects.map((p, i) => (
            <article
              key={p.id}
              className={`project-card ${expandedId === p.id ? "expanded" : ""}`}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="project-image-container">
                <img
                  src={p.image}
                  alt={p.title}
                  className="project-image"
                  loading="lazy"
                  onError={onImgError}
                  onClick={() => setModalImage(p.image)}
                />
                <div className="project-overlay">
                  <button
                    type="button"
                    className="view-details-btn"
                    onClick={() => setModalImage(p.image)}
                  >
                    <ZoomIn size={18} /> Enlarge
                  </button>
                </div>
              </div>

              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.description}</p>

                <div
                  className={`expanded-details ${expandedId === p.id ? "show" : ""
                    }`}
                  aria-hidden={expandedId !== p.id}
                >
                  <p>
                    <strong>Location:</strong> {p.location}
                  </p>
                  <p>
                    <strong>Completed:</strong> {p.completed}
                  </p>
                  <p>
                    <strong>Cost:</strong> {p.cost}
                  </p>
                </div>

                <button
                  type="button"
                  className="learn-more-btn"
                  aria-expanded={expandedId === p.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(p.id);
                  }}
                >
                  {expandedId === p.id ? "Show Less" : "Learn More"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="projects-section">
        <h2 className="section-title">Ongoing Projects</h2>
        <div className="projects-grid ongoing-grid">
          {ongoingProjects.map((img, idx) => (
            <article
              key={`ongoing-${idx}`}
              className="project-card ongoing"
              ref={(el) =>
                (cardsRef.current[completedProjects.length + idx] = el)
              }
            >
              <div className="project-image-container">
                <img
                  src={img}
                  alt={`Ongoing Project ${idx + 1}`}
                  className="project-image"
                  loading="lazy"
                  onError={onImgError}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <button
            type="button"
            className="modal-close"
            onClick={() => setModalImage(null)}
          >
            <X size={32} />
          </button>
          <img src={modalImage} alt="Large view" className="modal-content" />
        </div>
      )}
    </div>
  );
}
