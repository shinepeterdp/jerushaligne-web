import React, { useState, useEffect } from "react";
import "../styles/happy-smiles.css";

export default function HappySmilesSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  /* ESC + BACK BUTTON CLOSE */
  useEffect(() => {
    if (!activeVideo) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };

    const handleBack = () => setActiveVideo(null);

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("popstate", handleBack);
    window.history.pushState({ video: true }, "");

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("popstate", handleBack);
    };
  }, [activeVideo]);

  return (
    <section id="happy-smiles" className="happy-smiles">
      {/* floating particles */}
      <div className="smile-particles">
        <span>✨</span>
        <span>🦷</span>
        <span>✨</span>
        <span>🦷</span>
      </div>

      <div className="container">
        <p className="eyebrow">Real Patient Transformations</p>
        <h2>Happy Smiles That Speak for Themselves</h2>
        <p className="sub">
          Authentic smile transformations achieved through precision aligner
          treatment and expert dental care.
        </p>

        {/* ROW 1 */}
        <div className="marquee marquee-left">
          <div className="track">
            {topRowSmiles.map((s, i) => (
              <SmileCard key={i} {...s} onPlay={setActiveVideo} />
            ))}
            {topRowSmiles.map((s, i) => (
              <SmileCard key={`dup-${i}`} {...s} onPlay={setActiveVideo} />
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="marquee marquee-right">
          <div className="track">
            {bottomRowSmiles.map((s, i) => (
              <SmileCard key={i} {...s} onPlay={setActiveVideo} />
            ))}
            {bottomRowSmiles.map((s, i) => (
              <SmileCard key={`dup-${i}`} {...s} onPlay={setActiveVideo} />
            ))}
          </div>
        </div>
      </div>

      {/* VIDEO POPUP */}
      {activeVideo && (
        <div className="video-modal">
          <div
            className="video-overlay"
            onClick={() => setActiveVideo(null)}
          />
          <div className="video-box">
            <button className="close-btn" onClick={() => setActiveVideo(null)}>
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Patient Testimonial"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= CARD ================= */

function SmileCard({ img, name, treatment, type, youtubeId, size, onPlay }) {
  const isVideo = type === "youtube";

  return (
    <article className={`smile-card ${size} ${isVideo ? "video-card" : ""}`}>
      {isVideo ? (
        <button
          className="video-thumb"
          onClick={() => onPlay(youtubeId)}
        >
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={`${name} video`}
          />
          <div className="play-badge">▶</div>
        </button>
      ) : (
        <img src={img} alt={`${name} smile result`} />
      )}

      <div className="info">
        <h4>{name}</h4>
        <span>{treatment}</span>
      </div>
    </article>
  );
}

/* ================= DATA ================= */

const topRowSmiles = [
  {
    name: "S. Kumar",
    treatment: "Clear Aligners",
    type: "youtube",
    youtubeId: "LSYk6LJSHTU",
    size: "wide",
  },
  {
    name: "Priya R",
    treatment: "Smile Correction",
    type: "image",
    img: "/images/happy-smiles/vishwa.jpg",
    size: "normal",
  },
  {
    name: "Sam S",
    treatment: "Invisalign",
    type: "youtube",
    youtubeId: "-aLWVxobhLY",
    size: "normal",
  },
  {
    name: "S. Kumar",
    treatment: "Clear Aligners",
    type: "youtube",
    youtubeId: "NdXACmLpE2U",
    size: "wide",
  },
];

const bottomRowSmiles = [
  {
    name: "S. Kumar",
    treatment: "Clear Aligners",
    type: "youtube",
    youtubeId: "LSYk6LJSHTU",
    size: "wide",
  },
  {
    name: "Priya R",
    treatment: "Smile Correction",
    type: "image",
    img: "/images/happy-smiles/co2.webp", // ✅ FIXED (was "co2")
    size: "normal",
  },
  {
    name: "Sam S",
    treatment: "Invisalign",
    type: "youtube",
    youtubeId: "-aLWVxobhLY",
    size: "normal",
  },
  {
    name: "Viswanathan",
    treatment: "Braces",
    type: "image",
    img: "/images/happy-smiles/vishwa.jpg",
    size: "square",
  },
  {
    name: "S. Kumar",
    treatment: "Clear Aligners",
    type: "youtube",
    youtubeId: "Y4xZApKieqQ",
    size: "wide",
  },
];
