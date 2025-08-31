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
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // auto-slide videos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // reset typing when slide changes
  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
  }, [current]);

  // typing animation
  useEffect(() => {
    if (charIndex < videos[current].text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + videos[current].text.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="homepage">
      {/* Background Videos */}
      {videos.map((video, index) => (
        <video
          key={index}
          className={`background-video ${index === current ? "active" : ""}`}
          src={video.src}
          autoPlay
          muted
          loop
        />
      ))}

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Slide Content */}
      <div className="content">
        <h1>{videos[current].heading}</h1>
        <p className="typing-text">{displayText}</p>
        <p className="sub-text">Quality • Innovation • Trust</p>
        <Link to="/booking">
          <button className="cta-btn">Book a Consultation</button>
        </Link>
      </div>

      {/* Navigation Arrows */}
      <div className="controls">
        <button onClick={prevSlide}><ChevronLeft size={35} /></button>
        <button onClick={nextSlide}><ChevronRight size={35} /></button>
      </div>

      {/* Slide Indicators */}
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
