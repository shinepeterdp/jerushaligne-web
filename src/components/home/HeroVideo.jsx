import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import "../../styles/HeroVideoSection.css";

const slides = [
  {
    eyebrow: "German-UK Technology",
    title: <>The Invisible<br />Upgrade</>,
    description: "Medically led dentistry for those who value subtle, natural results — fresh, not fake. Subtle smile improvements, delivered safely and transparently.",
    sub: "Discover the art of looking refreshed, not redone.",
    cta: { label: "Book Free Consultation", href: "/appointment" },
    ctaSecondary: { label: "See How It Works", href: "/how-it-works" },
  },
  {
    eyebrow: "Precision Aligners",
    title: <>Your Perfect<br />Smile Awaits</>,
    description: "Clear aligners crafted with cutting-edge German-UK technology. Comfortable, invisible, and designed around your unique smile journey.",
    sub: "Transform your confidence — one aligner at a time.",
    cta: { label: "Start Your Journey", href: "/appointment" },
    ctaSecondary: { label: "View Results", href: "/gallery" },
  },
  {
    eyebrow: "Across Tamil Nadu",
    title: <>World-Class<br />Care, Nearby</>,
    description: "Multiple specialist clinics across Tamil Nadu bringing you precision dental care. Expert doctors, standardised excellence at every outlet.",
    sub: "Find your nearest Jerushaligne clinic today.",
    cta: { label: "Find a Clinic", href: "/our-outlets" },
    ctaSecondary: { label: "Meet Our Team", href: "/about" },
  },
];

const AUTO_DELAY = 5000;

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
   Each element: exits UP (fast), enters from BOTTOM (slow ease)
   Staggered so they cascade one-by-one
───────────────────────────────────────── */
const WRAP = {
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.0 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

// Standard items: eyebrow, desc, sub, buttons
const LINE = {
  initial: { opacity: 0, y: 32, filter: "blur(4px)" },
  enter: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: -20, filter: "blur(3px)",
    transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] },
  },
};

// Title: bigger movement, longer duration for drama
const TITLE = {
  initial: { opacity: 0, y: 52, filter: "blur(8px)" },
  enter: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -28, filter: "blur(8px)",
    transition: { duration: 0.24, ease: [0.55, 0, 1, 0.45] },
  },
};

export default function HeroVideoSection() {
  const [hvs_index, setHvsIndex] = useState(0);
  const hvs_timer = useRef(null);
  const hvs_total = slides.length;

  /* ── Scroll parallax ── */
  const hvs_sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hvs_sectionRef,
    offset: ["start start", "end start"],
  });

  const hvs_videoY         = useSpring(useTransform(scrollYProgress, [0,1], ["0%","20%"]),    { stiffness:60, damping:20 });
  const hvs_videoScale     = useSpring(useTransform(scrollYProgress, [0,1], [1, 1.12]),        { stiffness:60, damping:20 });
  const hvs_contentY       = useSpring(useTransform(scrollYProgress, [0,1], ["0%","-18%"]),   { stiffness:55, damping:18 });
  const hvs_contentOpacity = useSpring(useTransform(scrollYProgress, [0,0.5], [1, 0]),         { stiffness:80, damping:20 });
  const hvs_badgeY         = useSpring(useTransform(scrollYProgress, [0,1], ["0px","-40px"]), { stiffness:40, damping:14 });
  const hvs_tagY           = useSpring(useTransform(scrollYProgress, [0,1], ["0px","30px"]),  { stiffness:40, damping:14 });
  const hvs_blob1Y         = useTransform(scrollYProgress, [0,1], ["0%","-30%"]);
  const hvs_blob2Y         = useTransform(scrollYProgress, [0,1], ["0%","25%"]);

  /* ── Page-load entrance ── */
  const hvs_inViewRef = useRef(null);
  const hvs_isInView  = useInView(hvs_inViewRef, { once: true, margin: "-80px" });

  /* ── Auto-advance ── */
  const hvs_startAuto = () => {
    clearInterval(hvs_timer.current);
    hvs_timer.current = setInterval(() => {
      setHvsIndex((p) => (p + 1) % hvs_total);
    }, AUTO_DELAY);
  };

  useEffect(() => {
    hvs_startAuto();
    return () => clearInterval(hvs_timer.current);
  }, []);

  const hvs_goTo = (idx) => { setHvsIndex(idx); hvs_startAuto(); };
  const hvs_prev = () => hvs_goTo((hvs_index - 1 + hvs_total) % hvs_total);
  const hvs_next = () => hvs_goTo((hvs_index + 1) % hvs_total);

  const slide = slides[hvs_index];

  return (
    <section className="hvs-section" ref={hvs_sectionRef}>

      {/* ══ LEFT ══ */}
      <div className="hvs-left" ref={hvs_inViewRef}>
        <motion.div className="hvs-blob hvs-blob--1" style={{ y: hvs_blob1Y }} />
        <motion.div className="hvs-blob hvs-blob--2" style={{ y: hvs_blob2Y }} />

        <motion.div
          className="hvs-left-inner"
          style={{ y: hvs_contentY, opacity: hvs_contentOpacity }}
        >
          {/*
            AnimatePresence mode="wait":
            → old slide exits COMPLETELY before new one enters
            → gives clean staggered bottom-to-top cascade
          */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`slide-${hvs_index}`}
              className="hvs-inner-stack"
              variants={WRAP}
              initial="initial"
              animate={hvs_isInView ? "enter" : "initial"}
              exit="exit"
            >
              {/* 1. Eyebrow */}
              <motion.span variants={LINE} className="hvs-eyebrow">
                {slide.eyebrow}
              </motion.span>

              {/* 2. Title — biggest bounce */}
              <motion.h1 variants={TITLE} className="hvs-title">
                {slide.title}
              </motion.h1>

              {/* 3. Description */}
              <motion.p variants={LINE} className="hvs-desc">
                {slide.description}
              </motion.p>

              {/* 4. Sub-line */}
              <motion.p variants={LINE} className="hvs-sub">
                {slide.sub}
              </motion.p>

              {/* 5. CTA buttons */}
              <motion.div variants={LINE} className="hvs-cta-row">
                <motion.a
                  href={slide.cta.href}
                  className="hvs-btn-primary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {slide.cta.label}
                </motion.a>
                <motion.a
                  href={slide.ctaSecondary.href}
                  className="hvs-btn-ghost"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {slide.ctaSecondary.label} →
                </motion.a>
              </motion.div>

              {/* 6. Controls */}
              <motion.div variants={LINE} className="hvs-controls">
                <button className="hvs-arrow" onClick={hvs_prev} aria-label="Previous">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <div className="hvs-dots">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`hvs-dot ${i === hvs_index ? "hvs-dot--active" : ""}`}
                      onClick={() => hvs_goTo(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button className="hvs-arrow" onClick={hvs_next} aria-label="Next">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
                <div className="hvs-progress-wrap">
                  <div className="hvs-progress-bar" key={hvs_index} />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ══ RIGHT — Video ══ */}
      <div className="hvs-right">
        <motion.div
          className="hvs-video-wrap"
          style={{ y: hvs_videoY, scale: hvs_videoScale }}
        >
          <video
            className="hvs-video"
            src="/videos/hero-smile.mp4"
            autoPlay muted loop playsInline
            poster="/images/hero-poster.webp"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <img
            className="hvs-video-fallback"
            src="https://placehold.co/1100x700/ffd700/1a3a2a?text=Jerushaligne+Hero"
            alt="Jerushaligne"
            style={{ display: "none" }}
          />
        </motion.div>

        {/* Floating badge */}
        <motion.div
          className="hvs-badge"
          style={{ y: hvs_badgeY }}
          initial={{ opacity: 0, x: -30, scale: 0.85 }}
          animate={{ opacity: 1, x: 0,   scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22,1,0.36,1] }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <motion.span
            className="hvs-badge-icon"
            animate={{ rotate: [0,-8,8,-4,0] }}
            transition={{ delay: 1.8, duration: 0.7, ease: "easeInOut" }}
          >😁</motion.span>
          <div>
            <strong>10,000+ Smiles</strong>
            <p>Transformed across Tamil Nadu</p>
          </div>
        </motion.div>

        {/* Corner tag */}
        <motion.div
          className="hvs-corner-tag"
          style={{ y: hvs_tagY }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,   scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22,1,0.36,1] }}
          whileHover={{ scale: 1.06 }}
        >
          <motion.span
            animate={{ rotate: [0,15,-10,5,0] }}
            transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
          >🦷</motion.span>
          German-UK Certified
        </motion.div>
      </div>
    </section>
  );
}