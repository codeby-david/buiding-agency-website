import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Users,
  Target,
  Heart,
  Shield,
  ChevronLeft,
  ChevronRight,
  Quote
} from "lucide-react";
import Navbar from "../components/Navbar";
import "./About.css";
import Footer from "../components/Footer";

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const testimonials = [
    {
      text: "The team delivered our dream home with precision and care. Their attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "Homeowner",
      project: "Lakeside Residence"
    },
    {
      text: "Working with this construction team was seamless. They completed our commercial project on time and within budget.",
      author: "Michael Chen",
      role: "Business Owner",
      project: "Office Complex"
    },
    {
      text: "Their innovative designs and sustainable approach made our renovation project truly special.",
      author: "Emma Rodriguez",
      role: "Interior Designer",
      project: "Heritage Home Restoration"
    }
  ];

  const teamMembers = [
    {
      name: "Robert Davis",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "With over 20 years in construction, Robert leads our vision for excellence.",
      specialties: ["Project Management", "Structural Engineering"]
    },
    {
      name: "Jennifer Kim",
      role: "Lead Architect",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Jennifer brings innovative design solutions to every project.",
      specialties: ["Modern Design", "Sustainable Architecture"]
    },
    {
      name: "Marcus Johnson",
      role: "Construction Manager",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      bio: "Marcus ensures every project meets our high standards for quality.",
      specialties: ["Quality Control", "Team Leadership"]
    },
    {
      name: "Lisa Patel",
      role: "Interior Design Specialist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Lisa creates beautiful, functional spaces that clients love.",
      specialties: ["Space Planning", "Material Selection"]
    }
  ];

  const values = [
    {
      icon: <Heart size={36} />,
      title: "Passion",
      description:
        "We love what we do and it shows in every project we complete."
    },
    {
      icon: <Shield size={36} />,
      title: "Integrity",
      description:
        "We're committed to honesty, transparency, and doing what's right."
    },
    {
      icon: <Target size={36} />,
      title: "Excellence",
      description: "We never settle for mediocrity and always strive for the best."
    },
    {
      icon: <Users size={36} />,
      title: "Collaboration",
      description: "We work closely with our clients to bring their vision to life."
    }
  ];

  const timelineData = [
    {
      year: "2010",
      title: "Company Founded",
      description:
        "Started with a small team and big dreams of transforming construction."
    },
    {
      year: "2013",
      title: "First Major Project",
      description:
        "Completed a 20-home development that set new standards in the community."
    },
    {
      year: "2016",
      title: "Expanded Services",
      description:
        "Added architectural design and interior design divisions to our company."
    },
    {
      year: "2019",
      title: "Sustainability Focus",
      description:
        "Commited to eco-friendly building practices and sustainable materials."
    },
    {
      year: "2023",
      title: "150+ Projects Completed",
      description:
        "Reached a milestone of over 150 successful projects across the region."
    }
  ];

  const stats = [
    { value: "150+", label: "Projects Completed" },
    { value: "12", label: "Years Experience" },
    { value: "50+", label: "Team Members" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <>
      <div className="about-page">
        <Navbar />

        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Building Dreams, Crafting Realities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              For over a decade, we've been transforming visions into exceptional
              spaces that stand the test of time.
            </motion.p>
            <motion.a
              href="/projects"
              className="cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              View Our Work <ArrowRight size={20} />
            </motion.a>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Story</h2>
              <p>From humble beginnings to industry leaders</p>
            </div>

            <div className="timeline">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${index === activeTimeline ? "active" : ""
                    }`}
                  onClick={() => setActiveTimeline(index)}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{item.year}</h4>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <div className="section-header">
              <h2>Meet Our Team</h2>
              <p>The talented professionals behind our success</p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                    <div className="team-overlay">
                      <div className="specialties">
                        {member.specialties.map((specialty, i) => (
                          <span key={i} className="specialty-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                    <p className="bio">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Values</h2>
              <p>The principles that guide everything we do</p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Hear from those we've had the pleasure of working with</p>
            </div>

            <div className="testimonial-container">
              <div className="testimonial-content">
                <Quote size={36} className="quote-icon" />
                <p className="testimonial-text">
                  {testimonials[activeTestimonial].text}
                </p>
                <div className="testimonial-author">
                  <h4>{testimonials[activeTestimonial].author}</h4>
                  <p>
                    {testimonials[activeTestimonial].role} •{" "}
                    {testimonials[activeTestimonial].project}
                  </p>
                </div>
              </div>

              <div className="testimonial-controls">
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      activeTestimonial === 0
                        ? testimonials.length - 1
                        : activeTestimonial - 1
                    )
                  }
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="testimonial-dots">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={index === activeTestimonial ? "active" : ""}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      activeTestimonial === testimonials.length - 1
                        ? 0
                        : activeTestimonial + 1
                    )
                  }
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-section">
          <div className="container">
            <div className="section-header">
              <h2>Get in Touch</h2>
              <p>We’d love to hear from you! Fill out the form below.</p>
            </div>

            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Your Phone (optional)" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="cta-button primary">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
