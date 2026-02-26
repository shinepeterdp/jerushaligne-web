import { useState, useEffect, useRef } from "react";
import {
  motion,
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

/* ── Stagger variants for content entrance ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroVideoSection() {
  const [hvs_index, setHvsIndex] = useState(0);
  const [hvs_animating, setHvsAnimating] = useState(false);
  const hvs_timer = useRef(null);
  const hvs_total = slides.length;

  /* ── Scroll + Parallax setup ── */
  const hvs_sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hvs_sectionRef,
    offset: ["start start", "end start"],
  });

  // VIDEO — moves up slower than scroll (classic parallax: drifts +15% down range)
  const hvs_videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const hvs_videoYSpring = useSpring(hvs_videoY, { stiffness: 60, damping: 20 });

  // VIDEO SCALE — subtly zooms in as you scroll
  const hvs_videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const hvs_videoScaleSpring = useSpring(hvs_videoScale, { stiffness: 60, damping: 20 });

  // LEFT CONTENT — moves up faster than the video (opposite parallax direction)
  const hvs_contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const hvs_contentYSpring = useSpring(hvs_contentY, { stiffness: 55, damping: 18 });

  // LEFT CONTENT opacity — fades as you scroll away
  const hvs_contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const hvs_contentOpacitySpring = useSpring(hvs_contentOpacity, { stiffness: 80, damping: 20 });

  // BADGE — floats with a slight opposite-to-video drift + gentle bob
  const hvs_badgeY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const hvs_badgeYSpring = useSpring(hvs_badgeY, { stiffness: 40, damping: 14 });

  // CORNER TAG — drifts downward slightly
  const hvs_tagY = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
  const hvs_tagYSpring = useSpring(hvs_tagY, { stiffness: 40, damping: 14 });

  // BLOBS — each moves at a different speed for depth
  const hvs_blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const hvs_blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  /* ── InView for entrance animation ── */
  const hvs_inViewRef = useRef(null);
  const hvs_isInView = useInView(hvs_inViewRef, { once: true, margin: "-80px" });

  /* ── Slider logic ── */
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

  const hvs_goTo = (idx) => {
    setHvsAnimating(true);
    setTimeout(() => {
      setHvsIndex(typeof idx === "function" ? idx(hvs_index) : idx);
      setHvsAnimating(false);
    }, 320);
    hvs_startAuto();
  };

  const hvs_prev = () => hvs_goTo((hvs_index - 1 + hvs_total) % hvs_total);
  const hvs_next = () => hvs_goTo((hvs_index + 1) % hvs_total);

  const slide = slides[hvs_index];

  return (
    <section className="hvs-section" ref={hvs_sectionRef}>

      {/* ══════════ LEFT — Content (30%) ══════════ */}
      <div className="hvs-left" ref={hvs_inViewRef}>

        {/* Blobs with independent parallax */}
        <motion.div className="hvs-blob hvs-blob--1" style={{ y: hvs_blob1Y }} />
        <motion.div className="hvs-blob hvs-blob--2" style={{ y: hvs_blob2Y }} />

        {/* Content slides up + fades on scroll */}
        <motion.div
          className="hvs-left-inner"
          style={{ y: hvs_contentYSpring, opacity: hvs_contentOpacitySpring }}
        >
          {/* Entrance stagger on mount */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hvs_isInView ? "show" : "hidden"}
            className="hvs-inner-stack"
          >
            {/* Eyebrow */}
            <motion.span
              variants={itemVariants}
              className={`hvs-eyebrow ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}
            >
              {slide.eyebrow}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className={`hvs-title ${hvs_animating ? "hvs-slide-out" : "hvs-slide-in"}`}
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`hvs-desc ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}
            >
              {slide.description}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`hvs-sub ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className={`hvs-cta-row ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}
            >
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

            {/* Controls */}
            <motion.div variants={itemVariants} className="hvs-controls">
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
        </motion.div>
      </div>

      {/* ══════════ RIGHT — Video (70%) ══════════ */}
      <div className="hvs-right">

        {/* Video with parallax — moves slower than scroll + scales */}
        <motion.div
          className="hvs-video-wrap"
          style={{ y: hvs_videoYSpring, scale: hvs_videoScaleSpring }}
        >
          <video
            className="hvs-video"
            src="/videos/hero-smile.mp4"
            autoPlay
            muted
            loop
            playsInline
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

        {/* Floating badge — bobs upward on scroll + entrance animation */}
        <motion.div
          className="hvs-badge"
          style={{ y: hvs_badgeYSpring }}
          initial={{ opacity: 0, x: -30, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <motion.span
            className="hvs-badge-icon"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ delay: 1.8, duration: 0.7, ease: "easeInOut" }}
          >
            😁
          </motion.span>
          <div>
            <strong>10,000+ Smiles</strong>
            <p>Transformed across Tamil Nadu</p>
          </div>
        </motion.div>

        {/* Corner tag — drifts down on scroll + entrance */}
        <motion.div
          className="hvs-corner-tag"
          style={{ y: hvs_tagYSpring }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -10, 5, 0] }}
            transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
          >
            🦷
          </motion.span>
          German-UK Certified
        </motion.div>
      </div>
    </section>
  );
}