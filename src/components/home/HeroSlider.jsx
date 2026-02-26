import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
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

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Format seconds → m:ss ── */
function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function HeroVideoSection() {
  /* ── Slider state ── */
  const [hvs_index, setHvsIndex] = useState(0);
  const [hvs_animating, setHvsAnimating] = useState(false);
  const hvs_timer = useRef(null);
  const hvs_total = slides.length;

  /* ── Video controls state ── */
  const hvs_videoRef = useRef(null);
  const [hvs_playing, setHvsPlaying] = useState(true);
  const [hvs_muted, setHvsMuted] = useState(true);
  const [hvs_progress, setHvsProgress] = useState(0);
  const [hvs_duration, setHvsDuration] = useState(0);
  const [hvs_currentTime, setHvsCurrentTime] = useState(0);
  const [hvs_volume, setHvsVolume] = useState(1);
  const [hvs_showVolume, setHvsShowVolume] = useState(false);
  const [hvs_controlsVisible, setHvsControlsVisible] = useState(false);
  const hvs_hideTimer = useRef(null);

  /* ── Scroll + Parallax setup ── */
  const hvs_sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hvs_sectionRef,
    offset: ["start start", "end start"],
  });

  const hvs_videoY          = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const hvs_videoYSpring    = useSpring(hvs_videoY, { stiffness: 60, damping: 20 });
  const hvs_videoScale      = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const hvs_videoScaleSpring= useSpring(hvs_videoScale, { stiffness: 60, damping: 20 });
  const hvs_contentY        = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const hvs_contentYSpring  = useSpring(hvs_contentY, { stiffness: 55, damping: 18 });
  const hvs_contentOpacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const hvs_contentOpacitySpring = useSpring(hvs_contentOpacity, { stiffness: 80, damping: 20 });
  const hvs_badgeY          = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const hvs_badgeYSpring    = useSpring(hvs_badgeY, { stiffness: 40, damping: 14 });
  const hvs_tagY            = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
  const hvs_tagYSpring      = useSpring(hvs_tagY, { stiffness: 40, damping: 14 });
  const hvs_blob1Y          = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const hvs_blob2Y          = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const hvs_inViewRef = useRef(null);
  const hvs_isInView  = useInView(hvs_inViewRef, { once: true, margin: "-80px" });

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

  /* ── Video control handlers ── */
  const hvs_togglePlay = useCallback(() => {
    const v = hvs_videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setHvsPlaying(true); }
    else          { v.pause(); setHvsPlaying(false); }
  }, []);

  const hvs_toggleMute = useCallback(() => {
    const v = hvs_videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setHvsMuted(v.muted);
  }, []);

  const hvs_onTimeUpdate = useCallback(() => {
    const v = hvs_videoRef.current;
    if (!v || !v.duration) return;
    setHvsCurrentTime(v.currentTime);
    setHvsProgress((v.currentTime / v.duration) * 100);
  }, []);

  const hvs_onLoadedMetadata = useCallback(() => {
    setHvsDuration(hvs_videoRef.current?.duration || 0);
  }, []);

  const hvs_onSeek = useCallback((e) => {
    const v = hvs_videoRef.current;
    if (!v) return;
    const pct = parseFloat(e.target.value);
    v.currentTime = (pct / 100) * v.duration;
    setHvsProgress(pct);
  }, []);

  const hvs_onVolumeChange = useCallback((e) => {
    const v = hvs_videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    v.muted  = val === 0;
    setHvsVolume(val);
    setHvsMuted(val === 0);
  }, []);

  /* Show controls on hover, hide after 2.5s idle */
  const hvs_showControls = useCallback(() => {
    setHvsControlsVisible(true);
    clearTimeout(hvs_hideTimer.current);
    hvs_hideTimer.current = setTimeout(() => setHvsControlsVisible(false), 2500);
  }, []);

  const hvs_keepControls = useCallback(() => {
    clearTimeout(hvs_hideTimer.current);
    setHvsControlsVisible(true);
  }, []);

  const hvs_startHideTimer = useCallback(() => {
    hvs_hideTimer.current = setTimeout(() => setHvsControlsVisible(false), 2500);
  }, []);

  const slide = slides[hvs_index];

  return (
    <section className="hvs-section" ref={hvs_sectionRef}>

      {/* ══════════ LEFT — Content (30%) ══════════ */}
      <div className="hvs-left" ref={hvs_inViewRef}>
        <motion.div className="hvs-blob hvs-blob--1" style={{ y: hvs_blob1Y }} />
        <motion.div className="hvs-blob hvs-blob--2" style={{ y: hvs_blob2Y }} />

        <motion.div
          className="hvs-left-inner"
          style={{ y: hvs_contentYSpring, opacity: hvs_contentOpacitySpring }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hvs_isInView ? "show" : "hidden"}
            className="hvs-inner-stack"
          >
            <motion.span variants={itemVariants} className={`hvs-eyebrow ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}>
              {slide.eyebrow}
            </motion.span>

            <motion.h1 variants={itemVariants} className={`hvs-title ${hvs_animating ? "hvs-slide-out" : "hvs-slide-in"}`}>
              {slide.title}
            </motion.h1>

            <motion.p variants={itemVariants} className={`hvs-desc ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}>
              {slide.description}
            </motion.p>

            <motion.p variants={itemVariants} className={`hvs-sub ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}>
              {slide.sub}
            </motion.p>

            <motion.div variants={itemVariants} className={`hvs-cta-row ${hvs_animating ? "hvs-fade-out" : "hvs-fade-in"}`}>
              <motion.a href={slide.cta.href} className="hvs-btn-primary"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                {slide.cta.label}
              </motion.a>
              <motion.a href={slide.ctaSecondary.href} className="hvs-btn-ghost"
                whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                {slide.ctaSecondary.label} →
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="hvs-controls">
              <button className="hvs-arrow" onClick={hvs_prev} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="hvs-dots">
                {slides.map((_, i) => (
                  <button key={i} className={`hvs-dot ${i === hvs_index ? "hvs-dot--active" : ""}`}
                    onClick={() => hvs_goTo(i)} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <button className="hvs-arrow" onClick={hvs_next} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <div className="hvs-progress-wrap">
                <div className="hvs-progress-bar" key={hvs_index} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════ RIGHT — Video (70%) ══════════ */}
      <div
        className="hvs-right"
        onMouseMove={hvs_showControls}
        onMouseEnter={hvs_showControls}
        onMouseLeave={() => { clearTimeout(hvs_hideTimer.current); setHvsControlsVisible(false); }}
        onTouchStart={hvs_showControls}
      >
        {/* Parallax video wrap */}
        <motion.div className="hvs-video-wrap" style={{ y: hvs_videoYSpring, scale: hvs_videoScaleSpring }}>
          <video
            ref={hvs_videoRef}
            className="hvs-video"
            src="/videos/banner-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.webp"
            onTimeUpdate={hvs_onTimeUpdate}
            onLoadedMetadata={hvs_onLoadedMetadata}
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
          />
          <img className="hvs-video-fallback"
            src="/images/hero/fallback-img.webp"
            alt="Jerushaligne" style={{ display: "none" }} />
        </motion.div>

        {/* ── GHOST VIDEO CONTROLS ── */}
        <AnimatePresence>
          {hvs_controlsVisible && (
            <motion.div
              className="hvs-vc-bar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={hvs_keepControls}
              onMouseLeave={hvs_startHideTimer}
            >
              {/* Seek bar */}
              <div className="hvs-vc-seek-wrap">
                <input
                  type="range"
                  className="hvs-vc-seek"
                  min="0" max="100" step="0.1"
                  value={hvs_progress}
                  onChange={hvs_onSeek}
                />
                <div className="hvs-vc-seek-fill" style={{ width: `${hvs_progress}%` }} />
              </div>

              {/* Bottom row */}
              <div className="hvs-vc-row">
                {/* Left — play + time */}
                <div className="hvs-vc-left">
                  {/* Play / Pause */}
                  <button className="hvs-vc-btn" onClick={hvs_togglePlay} aria-label={hvs_playing ? "Pause" : "Play"}>
                    {hvs_playing ? (
                      /* Pause icon */
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      /* Play icon */
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                    )}
                  </button>

                  {/* Time */}
                  <span className="hvs-vc-time">
                    {formatTime(hvs_currentTime)} / {formatTime(hvs_duration)}
                  </span>
                </div>

                {/* Right — volume + mute */}
                <div className="hvs-vc-right">
                  {/* Volume slider — shows on hover */}
                  <div
                    className={`hvs-vc-volume-wrap ${hvs_showVolume ? "hvs-vc-volume-wrap--open" : ""}`}
                    onMouseEnter={() => setHvsShowVolume(true)}
                    onMouseLeave={() => setHvsShowVolume(false)}
                  >
                    <AnimatePresence>
                      {hvs_showVolume && (
                        <motion.div
                          className="hvs-vc-volume-slider"
                          initial={{ opacity: 0, scaleY: 0.6 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0.6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <input
                            type="range"
                            className="hvs-vc-vol-range"
                            min="0" max="1" step="0.01"
                            value={hvs_muted ? 0 : hvs_volume}
                            onChange={hvs_onVolumeChange}
                            orient="vertical"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mute toggle */}
                    <button className="hvs-vc-btn" onClick={hvs_toggleMute} aria-label={hvs_muted ? "Unmute" : "Mute"}>
                      {hvs_muted || hvs_volume === 0 ? (
                        /* Muted icon */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                      ) : (
                        /* Volume icon */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Corner tag */}
        <motion.div className="hvs-corner-tag" style={{ y: hvs_tagYSpring }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}>
          <motion.span animate={{ rotate: [0, 15, -10, 5, 0] }}
            transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}>
            🦷
          </motion.span>
          German-UK Certified
        </motion.div>
      </div>
    </section>
  );
}