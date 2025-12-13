// Hero.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import GradientButton from "./GradientButton";
import binila from "../assets/images/home/hero/binila-dr.png";
import bladbin from "../assets/images/home/hero/bladbin-dr.png";
import team from "../assets/images/home/hero/team.jpg";

/**
 * Hero.jsx — animated hero with particles + transitions
 *
 * Replaces your current Hero file. Tune heroMinHeight prop to change height.
 */

export default function Hero({
  eyebrow = "Premium Dental Care",
  title = "Bright smiles. Gentle care.",
  subtitle = "High-end dental treatments with cutting-edge equipment and a patient-first experience.",
  slides = defaultSlides,
  autoplayInterval = 5000,
  heroMinHeight = "92vh",
}) {
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);
  const interactionRef = useRef(0);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);
  const followerRef = useRef(null);
  const rafRef = useRef(null);

  // responsive particle count
  const [particleCount, setParticleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 20
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 640) setParticleCount(6);
      else if (window.innerWidth < 768) setParticleCount(10);
      else if (window.innerWidth < 1024) setParticleCount(14);
      else setParticleCount(20);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(!!(mq && mq.matches));
    handler();
    mq && mq.addEventListener && mq.addEventListener("change", handler);
    return () => mq && mq.removeEventListener && mq.removeEventListener("change", handler);
  }, []);

  // autoplay slider
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const tick = () => {
      const now = Date.now();
      if (hoverRef.current) return;
      if (now - (interactionRef.current || 0) < Math.max(600, autoplayInterval / 2)) return;
      setIndex((i) => (i + 1) % slides.length);
    };
    intervalRef.current = setInterval(tick, autoplayInterval);
    return () => clearInterval(intervalRef.current);
  }, [slides, autoplayInterval]);

  const touchInteraction = () => {
    interactionRef.current = Date.now();
  };

  const getPos = (i) => {
    const n = slides.length;
    const diff = ((i - index) % n + n) % n;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === n - 1) return "left";
    return "back";
  };

  // SVG particle icons (small gradient tooth / sparkle / brush)
  const svgToUrl = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const TOOTH_SVG =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>` +
    `<defs><linearGradient id='tg' x1='0' x2='1'><stop offset='0' stop-color='%23FFF9EA'/><stop offset='1' stop-color='%23FFD07A'/></linearGradient></defs>` +
    `<path fill='url(%23tg)' stroke='%23FFB84D' stroke-width='0.7' d='M12 12c0 0-2 12 12 22 14-10 12-22 12-22 0-8-10-10-12-10s-12 2-12 10z'/>` +
    `</svg>`;
  const SPARKLE_SVG =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>` +
    `<defs><radialGradient id='sg'><stop offset='0' stop-color='%23FFFFFF'/><stop offset='1' stop-color='%23FFF6D9'/></radialGradient></defs>` +
    `<path fill='url(%23sg)' d='M24 4l3.5 7.4L36 14l-8.5 2L24 24l-3.5-7.6L12 14l8.5-2z'/>` +
    `</svg>`;
  const BRUSH_SVG =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>` +
    `<defs><linearGradient id='bg' x1='0' x2='1'><stop offset='0' stop-color='%23FFE6B3'/><stop offset='1' stop-color='%23FFB84D'/></linearGradient></defs>` +
    `<rect x='6' y='22' rx='2' width='24' height='6' fill='url(%23bg)'/><rect x='30' y='12' width='4' height='14' rx='1.2' fill='%23FFECC9' transform='rotate(-25 30 12)'/>` +
    `</svg>`;

  const particleIconUrls = {
    tooth: svgToUrl(TOOTH_SVG),
    sparkle: svgToUrl(SPARKLE_SVG),
    brush: svgToUrl(BRUSH_SVG),
  };

  // generate particles
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const type = t < 0.55 ? "tooth" : t < 0.85 ? "sparkle" : "brush";
      const size = Math.round(10 + Math.random() * 34);
      // bias near right half so they complement the slider
      const left = Math.round(Math.random() * 68 + (Math.random() > 0.65 ? 18 : 6));
      const top = Math.round(Math.random() * 78 + 4);
      const duration = +(4 + Math.random() * 8).toFixed(2);
      const delay = +(Math.random() * 2).toFixed(2);
      const opacity = +(0.36 + Math.random() * 0.6).toFixed(2);
      const dx = (Math.random() * 160 - 80).toFixed(1);
      const dy = (Math.random() * 80 - 40).toFixed(1);
      const rotate = Math.floor(Math.random() * 360);
      const glow = type === "sparkle" ? "rgba(255,255,244,0.98)" : "rgba(255,200,110,0.9)";
      arr.push({ id: `p${i}`, type, size, left, top, duration, delay, opacity, dx, dy, rotate, glow });
    }
    return arr;
  }, [particleCount]);

  // cursor follower (tiny tooth)
  useEffect(() => {
    if (!heroRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;
    let mx = -9999, my = -9999, fx = -9999, fy = -9999;
    const hero = heroRef.current;
    const follower = followerRef.current;
    if (!follower) return;

    const onMove = (e) => {
      if (e.touches) { follower.style.opacity = "0"; return; }
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      follower.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onLeave = () => { follower.style.opacity = "0"; if (raf) { cancelAnimationFrame(raf); raf = null; } };

    const step = () => {
      fx += (mx - fx) * 0.16;
      fy += (my - fy) * 0.16;
      follower.style.transform = `translate(${Math.round(fx)}px, ${Math.round(fy)}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(step);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onMove);
    hero.addEventListener("mouseleave", onLeave);
    hero.addEventListener("touchstart", onLeave, { passive: true });
    hero.addEventListener("touchmove", onLeave, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      hero.removeEventListener("touchstart", onLeave);
      hero.removeEventListener("touchmove", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // small JSON-LD for SEO (clinic basic)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Jerushaligne Dental Clinic",
    "telephone": "+91 98765 43210",
    "address": { "@type": "PostalAddress", "addressLocality": "Seynamvilai", "addressRegion": "TN", "addressCountry": "IN" }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero"
      style={{ minHeight: heroMinHeight }}
      className="relative overflow-hidden"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* background base */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        zIndex: 0,
        background: "radial-gradient(900px 420px at 10% 20%, rgba(255,245,225,0.6), transparent 10%), linear-gradient(180deg,#FFF7EA 0%, #FFE8B8 50%, #FFD07A 100%)"
      }} />

      {/* floating blobs for depth */}
      <div aria-hidden style={{ position: "absolute", left: "12%", top: "18%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(255,238,205,0.14), transparent 40%)", filter: "blur(30px)", zIndex: 2, animation: reducedMotion ? "none" : "blobFloat 10s ease-in-out infinite" }} />
      <div aria-hidden style={{ position: "absolute", right: "8%", bottom: "14%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(255,216,140,0.10), transparent 45%)", filter: "blur(36px)", zIndex: 2, animation: reducedMotion ? "none" : "blobFloat 12s ease-in-out 1.6s infinite" }} />

      {/* particles layer (in front of images but behind text) */}
      {!reducedMotion && (
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 18 }}>
          {particles.map((p) => {
            const style = {
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundImage: `url("${particleIconUrls[p.type]}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              opacity: p.opacity,
              transform: `translate3d(-50%,-50%,0) rotate(${p.rotate}deg)`,
              animation: `particleFloat ${p.duration}s cubic-bezier(.2,.8,.2,1) ${p.delay}s infinite, glowPulse ${Math.max(3, p.duration/2)}s ease-in-out ${p.delay/1.6}s infinite`,
              willChange: "transform, opacity, filter",
              ["--dx"]: `${p.dx}px`,
              ["--dy"]: `${p.dy}px`,
              ["--glow"]: p.glow,
              filter: p.type === "sparkle" ? `drop-shadow(0 0 ${Math.max(8, p.size/5)}px ${p.glow}) blur(0.35px)` : `drop-shadow(0 0 ${Math.max(8, p.size/6)}px ${p.glow})`
            };
            if (p.type === "sparkle") style.mixBlendMode = "screen";
            return <span key={p.id} style={style} data-dx={p.dx} data-dy={p.dy} />;
          })}
        </div>
      )}


      {/* main content (text above particles & images) */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center" style={{ zIndex: 20 }}>
        {/* left - copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-amber-700 shadow-sm"
               style={{ background: "linear-gradient(90deg, rgba(250,204,21,0.18), rgba(250,204,21,0.06))", animation: reducedMotion ? "none" : "fadeUp .5s ease both .1s" }}>
            {eyebrow}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900" style={{ animation: reducedMotion ? "none" : "fadeUp .6s ease both .18s" }}>
            <span className="block text-amber-700">Premium</span>
            <span className="block">{title}</span>
          </h1>

          <p className="mt-4 text-gray-700 max-w-xl text-lg" style={{ animation: reducedMotion ? "none" : "fadeUp .7s ease both .26s" }}>{subtitle}</p>

          <div className="mt-6 flex gap-4 items-center" style={{ animation: reducedMotion ? "none" : "fadeUp .75s ease both .34s" }}>
            <GradientButton href="#book">Book Appointment</GradientButton>
            <a href="#services" className="inline-flex items-center px-5 py-2.5 rounded-2xl border border-gray-300 text-sm text-gray-700 bg-white/30 backdrop-blur-sm hover:bg-white hover:shadow-md transition">
              Our Treatments
            </a>
          </div>

          <div className="mt-6 flex gap-10 text-sm text-gray-700" style={{ animation: reducedMotion ? "none" : "fadeUp .8s ease both .42s" }}>
            <div>
              <div className="font-semibold">Working Hours</div>
              <div>Mon - Sat: 9:00 AM - 6:00 PM</div>
            </div>
            <div>
              <div className="font-semibold">Phone</div>
              <div><a href="tel:+919876543210" className="text-gray-700 hover:underline">+91 98765 43210</a></div>
            </div>
          </div>
        </div>

        {/* right - slider images */}
        <div className="relative flex justify-center md:justify-end" aria-hidden>
          <div
            className="w-full max-w-xl h-[480px] flex items-center justify-center relative overflow-visible"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
            style={{ pointerEvents: "none" }}
          >
            {slides.map((s, i) => {
              const pos = getPos(i);
              const styleMap = {
                center: { tx: "translateX(0%)", ty: "translateY(0%)", scale: 1, rotate: 0, z: 30, w: "36rem", h: "26rem", anim: "slideInCenter .6s cubic-bezier(.2,.9,.2,1) both" },
                left: { tx: "translateX(-30%)", ty: "translateY(10%)", scale: 0.92, rotate: 3, z: 20, w: "22rem", h: "20rem", anim: "slideInSide .6s cubic-bezier(.2,.9,.2,1) both" },
                right: { tx: "translateX(30%)", ty: "translateY(10%)", scale: 0.92, rotate: -3, z: 20, w: "22rem", h: "20rem", anim: "slideInSide .6s cubic-bezier(.2,.9,.2,1) both" },
                back: { tx: "translateX(0%)", ty: "translateY(28%)", scale: 0.82, rotate: 0, z: 10, w: "20rem", h: "18rem", anim: "" },
              };
              const st = styleMap[pos];
              const overlay = pos === "center";

              return (
                <figure
                  key={s.id}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: st.w,
                    height: st.h,
                    transform: `translate(-50%,-50%) ${st.tx} ${st.ty} scale(${st.scale}) rotate(${st.rotate}deg)`,
                    zIndex: st.z,
                    boxShadow: "0 28px 60px -26px rgba(0,0,0,0.18)",
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#fff",
                    transition: "all 520ms cubic-bezier(.2,.9,.2,1)",
                    willChange: "transform, opacity",
                    animation: reducedMotion ? "none" : st.anim
                  }}
                >
                  <img src={s.img} alt={`clinic ${i + 1}`} className="w-full h-full object-cover block" loading="lazy" />
                  {overlay && <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,235,205,0.08))", pointerEvents: "none" }} />}
                </figure>
              );
            })}

            {/* accessible offscreen controls (keyboard/sr only) */}
            <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} aria-hidden={false}>
              <button onClick={() => { touchInteraction(); setIndex((i) => (i - 1 + slides.length) % slides.length); }} aria-label="Previous slide">Prev</button>
              <button onClick={() => { touchInteraction(); setIndex((i) => (i + 1) % slides.length); }} aria-label="Next slide">Next</button>
            </div>

            {/* indicators in front of images */}
            <div style={{ position: "absolute", bottom: "-28px", left: "50%", transform: "translateX(-50%)", zIndex: 60, display: "flex", gap: 12 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { touchInteraction(); setIndex(i); }}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === index ? 36 : 8,
                    height: i === index ? 10 : 8,
                    borderRadius: 9999,
                    transition: "all 260ms cubic-bezier(.2,.9,.2,1)",
                    background: i === index ? "linear-gradient(90deg,#FFB84D,#FFA300)" : "#E6E6E6",
                    boxShadow: i === index ? "0 10px 20px rgba(255,150,30,0.12)" : "none",
                    transform: i === index ? "translateY(-4px)" : "translateY(0)",
                    border: "none",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    animation: i === index && !reducedMotion ? "indicatorBounce 1200ms infinite" : "none"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* cursor follower tooth (top layer) */}
      {!reducedMotion && (
        <div ref={followerRef} aria-hidden style={{
          position: "absolute", left: 0, top: 0, width: 28, height: 28, pointerEvents: "none", zIndex: 90, opacity: 0, transform: "translate(-1000px,-1000px) translate(-50%,-50%)",
          transition: "opacity 220ms ease"
        }}>
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-hidden>
            <defs>
              <linearGradient id="fg" x1="0" x2="1">
                <stop offset="0" stopColor="#FFF9EA" />
                <stop offset="1" stopColor="#FFD07A" />
              </linearGradient>
            </defs>
            <path d="M12 12c0 0-2 12 12 22 14-10 12-22 12-22 0-8-10-10-12-10s-12 2-12 10z" fill="url(#fg)" stroke="#FFB84D" strokeWidth="0.8" />
          </svg>
        </div>
      )}

      {/* keyframes & styles */}
      <style>{`
        /* entrance */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px) } to { opacity:1; transform:none } }
        /* subtle blob float */
        @keyframes blobFloat { 0%{transform:translateY(0)}50%{transform:translateY(-18px) scale(1.02)}100%{transform:translateY(0)} }
        /* particle movement */
        @keyframes particleFloat {
          0% { transform: translate3d(-50%,-50%,0) translate(0,0) rotate(0deg) scale(1); opacity: 0.25; }
          40% { transform: translate3d(-50%,-50%,0) translate(calc(var(--dx) * 0.35), calc(var(--dy) * 0.25)) rotate(180deg) scale(1.06); opacity: 1; }
          80% { transform: translate3d(-50%,-50%,0) translate(calc(var(--dx) * -0.22), calc(var(--dy) * 0.6)) rotate(300deg) scale(0.96); opacity: 0.6; }
          100% { transform: translate3d(-50%,-50%,0) translate(0,0) rotate(360deg) scale(1); opacity: 0.25; }
        }
        /* particle glow pulse */
        @keyframes glowPulse {
          0% { filter: drop-shadow(0 0 6px var(--glow)); opacity: 0.8; transform: translate3d(-50%,-50%,0) scale(0.98);}
          50% { filter: drop-shadow(0 0 20px var(--glow)); opacity: 1; transform: translate3d(-50%,-50%,0) scale(1.06);}
          100% { filter: drop-shadow(0 0 6px var(--glow)); opacity: 0.8; transform: translate3d(-50%,-50%,0) scale(0.98);}
        }
        /* images slide entrance */
        @keyframes slideInCenter {
          0% { opacity: 0; transform: translate(-50%,-60%) scale(.98); }
          60% { opacity: 1; transform: translate(-50%,-50%) scale(1.02); }
          100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes slideInSide {
          0% { opacity: 0; transform: translate(-50%,-62%) scale(.96); }
          60% { opacity: 1; transform: translate(-50%,-50%) scale(1.01); }
          100% { opacity: 1; transform: translate(-50%,-50%) scale(.92); }
        }
        /* indicator bounce */
        @keyframes indicatorBounce {
          0%{ transform: translateY(-4px) scaleX(1); }
          50%{ transform: translateY(-8px) scaleX(1.06); }
          100%{ transform: translateY(-4px) scaleX(1); }
        }
        /* accessible prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0s !important; }
        }
        /* mobile adjustments */
        @media (max-width: 640px) {
          section#home { min-height: 68vh; }
          .max-w-7xl { padding-left: 12px; padding-right: 12px; }
        }
      `}</style>
    </section>
  );
}

/* default slides (replace with your assets) */
const defaultSlides = [
  { id: "s1", img: binila },
  { id: "s2", img: bladbin },
  { id: "s3", img: team },
];
