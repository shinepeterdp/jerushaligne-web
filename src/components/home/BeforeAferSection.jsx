import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/before-after-carousel.css";

const patients = [
  {
    name: "R. Meena",
    age: "31 yrs",
    procedure: "Smile Correction",
    duration: "6 months",
    date: "Jul 2025",
    before: "/images/before-after/patient2-before.webp",
    after: "/images/before-after/patient2-after.webp",
    result: "Gap closure and midline correction completed",
  },
  {
    name: "S. Kumar",
    age: "24 yrs",
    procedure: "Clear Aligner Treatment",
    duration: "8 months",
    date: "Aug 2025",
    before: "/images/before-after/patient1-before.webp",
    after: "/images/before-after/patient1-after.webp",
    result: "Overbite corrected, full smile alignment achieved",
  },
    {
    name: "A. Joseph",
    age: "19 yrs",
    procedure: "Teeth Alignment",
    duration: "10 months",
    date: "Jun 2025",
    before: "/images/dental-aligns/before.jpg",
    after: "/images/dental-aligns/after.jpg",
    result: "Crowding resolved, confident smile restored",
  },
];

const FALLBACK_BEFORE = "https://placehold.co/700x500/f3f4f6/9ca3af?text=Before";
const FALLBACK_AFTER  = "https://placehold.co/700x500/fef3c7/d97706?text=After";

export default function BeforeAfterCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % patients.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  const patient = patients[active];
  const next = () => setActive((p) => (p + 1) % patients.length);
  const prev = () => setActive((p) => (p === 0 ? patients.length - 1 : p - 1));

  return (
    <section
      className="bac-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="bac-container">

        {/* ── HEADER — centered ── */}
        <motion.div
          className="bac-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="bac-eyebrow">Real Patient Results</span>
          <h2 className="bac-title">
            Transformations That<br />Speak for Themselves
          </h2>
          <p className="bac-subtitle">
            Precision German–UK aligner technology. Expert-led treatment.
            Smiles that last a lifetime.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="bac-grid">

          {/* LEFT — patient card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${active}`}
              className="bac-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bac-card-top-bar" />
              <span className="bac-card-tag">Patient Details</span>

              <div className="bac-name-row">
                <h3 className="bac-name">{patient.name}</h3>
                <span className="bac-age">{patient.age}</span>
              </div>

              <div className="bac-details">
                {[
                  { icon: "🦷", label: "Procedure", value: patient.procedure },
                  { icon: "⏱",  label: "Duration",  value: patient.duration  },
                  { icon: "📅", label: "Completed", value: patient.date      },
                ].map((d) => (
                  <div className="bac-detail" key={d.label}>
                    <span className="bac-detail-icon">{d.icon}</span>
                    <div>
                      <span className="bac-detail-label">{d.label}</span>
                      <span className="bac-detail-value">{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bac-result">
                <span>✨</span>
                <p>{patient.result}</p>
              </div>

              <p className="bac-consent">
                Images shared with patient consent. Individual results may vary.
              </p>

              <a href="/book-appointment" className="bac-cta">
                Book Your Consultation
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — before / after images */}
          <div className="bac-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={`imgs-${active}`}
                className="bac-images"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
              >
                <div className="bac-img-box">
                  <img src={patient.before} alt="Before"
                    onError={(e) => { e.target.src = FALLBACK_BEFORE; }} />
                  <span className="bac-img-label bac-img-label--before">Before</span>
                </div>

                <div className="bac-img-box">
                  <img src={patient.after} alt="After"
                    onError={(e) => { e.target.src = FALLBACK_AFTER; }} />
                  <span className="bac-img-label bac-img-label--after">After</span>
                </div>

                {/* <div className="bac-verified">
                  <span>⭐</span> Verified Result
                </div> */}
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="bac-controls">
              <button className="bac-arrow" onClick={prev} aria-label="Prev">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="bac-dots">
                {patients.map((_, i) => (
                  <button key={i}
                    className={`bac-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Patient ${i + 1}`}
                  />
                ))}
              </div>
              <button className="bac-arrow" onClick={next} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}