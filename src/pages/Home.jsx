import React, { useState, useEffect } from "react";
import "./Home.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


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
    }, 10000);
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
      {/* Background video layer */}
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
          {/* 👇 Add typing effect classes */}
          <h1 className="typing-text">{videos[current].heading}</h1>
          <p className="typing-sub">{videos[current].text}</p>
          <p className="sub-text">Quality • Innovation • Trust</p>
          <Link to="/booking">
            <button className="cta-btn">Book a Consultation</button>
          </Link>
        </div>

        {/* Controls */}
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
    </>
  );
};

export default HomePage;
