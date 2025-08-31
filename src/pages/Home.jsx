import React, { useState, useEffect } from "react";
import "./Home.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // For navigation icons

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

  // Auto play every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="homepage">
      <video
        key={videos[current].src}
        className="background-video"
        src={videos[current].src}
        autoPlay
        muted
        loop
      />

      {/* Dark overlay */}
      <div className="overlay"></div>

      {/* Slide Content */}
      <div className="content">
        <h1>{videos[current].heading}</h1>
        <p>{videos[current].text}</p>
        <button className="cta-btn">Book a Consultation</button>
      </div>

      {/* Navigation Arrows */}
      <div className="controls">
        <button onClick={prevSlide}><ChevronLeft size={35} /></button>
        <button onClick={nextSlide}><ChevronRight size={35} /></button>
      </div>

      {/* Slide indicators */}
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
  );
};

export default HomePage;
