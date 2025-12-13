// Hero.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import GradientButton from "./GradientButton";
import "../styles/hero.css";

import binila from "../assets/images/home/hero/binila-dr.png";
import bladbin from "../assets/images/home/hero/bladbin-dr.png";
import team from "../assets/images/home/hero/team.jpg";

export default function Hero({
  eyebrow = "Premium Dental Care",
  title = "Bright smiles. Gentle care.",
  subtitle = "High-end dental treatments with cutting-edge equipment and a patient-first experience.",
  slides = defaultSlides,
  autoplayInterval = 5000,
}) {
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);

  /* autoplay */
  useEffect(() => {
    const id = setInterval(() => {
      if (!hoverRef.current) {
        setIndex((i) => (i + 1) % slides.length);
      }
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [slides.length, autoplayInterval]);

  return (
    <section id="home" className="hero">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Jerushaligne Dental Clinic",
            telephone: "+91 98765 43210",
          }),
        }}
      />

      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <span className="hero-eyebrow">{eyebrow}</span>

          <h1 className="hero-title">
            <span>Premium</span>
            {title}
          </h1>

          <p className="hero-subtitle">{subtitle}</p>

          <div className="hero-actions">
            <GradientButton href="#book">Book Appointment</GradientButton>
            <a href="#services" className="hero-secondary-btn">
              Our Treatments
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <strong>Working Hours</strong>
              <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
            </div>
            <div>
              <strong>Phone</strong>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div
          className="hero-slider"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          {slides.map((slide, i) => {
            const pos =
              i === index ? "center" : i === (index + 1) % slides.length ? "right" : "left";

            return (
              <figure key={slide.id} className={`hero-slide ${pos}`}>
                <img src={slide.img} alt="Jerushaligne Dental Clinic" />
              </figure>
            );
          })}

          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultSlides = [
  { id: "1", img: binila },
  { id: "2", img: bladbin },
  { id: "3", img: team },
];
