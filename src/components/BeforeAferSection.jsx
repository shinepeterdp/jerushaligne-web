// BeforeAfter.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * BeforeAfter.jsx — corrected & improved
 *
 * Props:
 *  - beforeSrc (string)
 *  - afterSrc  (string)
 *  - patientName, procedure, date
 *  - demo (bool) show play/pause demo control
 *
 * Features fixed:
 *  - overlay shows afterSrc (was using beforeSrc)
 *  - pointer events for reliable drag on desktop & touch
 *  - improved demo animation with sensible speed
 *  - wheel nudging when container is focused/hovered (scroll-to-slide UX)
 *  - accessible keyboard controls
 *  - JSON-LD for SEO kept
 */

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  patientName = "Patient",
  procedure = "Smile Makeover (Aligners)",
  date = "",
  demo = true,
}) {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const draggingRef = useRef(false);
  const rafRef = useRef(null);

  // position = percentage width of overlay (after image visible width)
  const [position, setPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  // accessibility labels
  const beforeAlt = `${patientName} before ${procedure}`;
  const afterAlt = `${patientName} after ${procedure}`;

  // JSON-LD for SEO (ImageObjects)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${patientName} — Before & After (${procedure})`,
    image: [
      { "@type": "ImageObject", url: beforeSrc, caption: `${patientName} — before (${procedure})` },
      { "@type": "ImageObject", url: afterSrc, caption: `${patientName} — after (${procedure})` },
    ],
  };

  // clamp helper
  const clamp = (v) => Math.min(98, Math.max(2, v));

  // Unified pointer handlers (uses Pointer Events when available)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // compute percent from clientX
    const getPct = (clientX) => {
      const r = container.getBoundingClientRect();
      let x = clientX - r.left;
      let pct = (x / r.width) * 100;
      return clamp(pct);
    };

    // pointer down (mouse / touch / pen)
    const onPointerDown = (ev) => {
      // accept only left button for mouse
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      draggingRef.current = true;
      container.classList.add("ba-grabbing");
      // capture pointer if available
      if (container.setPointerCapture && ev.pointerId) {
        try { container.setPointerCapture(ev.pointerId); } catch (e) {}
      }
      const clientX = ev.clientX ?? (ev.touches && ev.touches[0] && ev.touches[0].clientX);
      if (typeof clientX === "number") setPosition(getPct(clientX));
      ev.preventDefault();
    };

    const onPointerMove = (ev) => {
      if (!draggingRef.current) return;
      const clientX = ev.clientX ?? (ev.touches && ev.touches[0] && ev.touches[0].clientX);
      if (typeof clientX === "number") {
        setPosition((p) => {
          // disable CSS transition during drag by using state only
          return getPct(clientX);
        });
      }
      ev.preventDefault();
    };

    const onPointerUp = (ev) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      container.classList.remove("ba-grabbing");
      // release capture
      if (container.releasePointerCapture && ev.pointerId) {
        try { container.releasePointerCapture(ev.pointerId); } catch (e) {}
      }
    };

    // wheel support: nudge when focused or hovered
    const onWheel = (ev) => {
      // only nudge if container focused or mouse is over container
      const rect = container.getBoundingClientRect();
      const mx = ev.clientX;
      const my = ev.clientY;
      const over = mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom;
      const focused = document.activeElement === container;
      if (!over && !focused) return;
      ev.preventDefault();
      setPosition((p) => clamp(p + (ev.deltaY > 0 ? 4 : -4)));
    };

    // Use pointer events if supported
    if (window.PointerEvent) {
      container.addEventListener("pointerdown", onPointerDown, { passive: false });
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp, { passive: false });
    } else {
      // fallback
      container.addEventListener("mousedown", onPointerDown, { passive: false });
      window.addEventListener("mousemove", onPointerMove, { passive: false });
      window.addEventListener("mouseup", onPointerUp, { passive: false });
      container.addEventListener("touchstart", onPointerDown, { passive: false });
      window.addEventListener("touchmove", onPointerMove, { passive: false });
      window.addEventListener("touchend", onPointerUp, { passive: false });
    }

    // wheel
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (window.PointerEvent) {
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      } else {
        container.removeEventListener("mousedown", onPointerDown);
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("mouseup", onPointerUp);
        container.removeEventListener("touchstart", onPointerDown);
        window.removeEventListener("touchmove", onPointerMove);
        window.removeEventListener("touchend", onPointerUp);
      }
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  // keyboard accessibility (only when container focused)
  useEffect(() => {
    const onKey = (e) => {
      if (!containerRef.current || document.activeElement !== containerRef.current) return;
      if (e.key === "ArrowLeft") { setPosition((p) => clamp(p - 6)); e.preventDefault(); }
      if (e.key === "ArrowRight") { setPosition((p) => clamp(p + 6)); e.preventDefault(); }
      if (e.key === "Home") { setPosition(2); e.preventDefault(); }
      if (e.key === "End") { setPosition(98); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // demo autoplay: smooth back-and-forth
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      return;
    }

    let dir = 1; // 1 -> move right, -1 -> left
    let last = performance.now();

    const step = (now) => {
      const dt = now - last;
      last = now;
      // speedFactor tuned for pleasant speed (percent per ms)
      const speed = 0.025; // about 25% per second
      setPosition((prev) => {
        let next = prev + dir * dt * speed;
        if (next >= 92) { next = 92; dir = -1; }
        if (next <= 8) { next = 8; dir = 1; }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying]);

  // ensure we cancel RAF on unmount
  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };
  }, []);

  // inline styles where needed
  const handleLeft = `${position}%`;
  const overlayStyle = {
    width: `${position}%`,
    transition: draggingRef.current || isPlaying ? "none" : "width 220ms cubic-bezier(.2,.9,.2,1)",
  };

  return (
    <section id="before-after" className="relative bg-gradient-to-b from-white to-amber-50/30 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left copy */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Before &amp; After — Patient Smiles</h2>
            <p className="text-gray-700 mb-4 max-w-xl">
              Real patient results. Slide the handle to compare the smile before and after treatment.
              All patients gave consent to share their photos.
            </p>

            <dl className="text-sm text-gray-700 space-y-2">
              <div><dt className="font-semibold inline">Patient</dt><dd className="inline ml-2">{patientName}</dd></div>
              <div><dt className="font-semibold inline">Procedure</dt><dd className="inline ml-2">{procedure}</dd></div>
              {date && (<div><dt className="font-semibold inline">Date</dt><dd className="inline ml-2">{date}</dd></div>)}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500 text-white font-semibold shadow hover:scale-[1.01] transition">Book Consultation</a>

              {demo && (
                <button
                  onClick={() => setIsPlaying((s) => !s)}
                  aria-pressed={isPlaying}
                  className="inline-flex items-center px-3 py-2 rounded-full bg-white border text-gray-800 shadow hover:bg-amber-50 transition"
                >
                  {isPlaying ? "Pause Demo" : "Play Demo"}
                </button>
              )}
            </div>
          </div>

          {/* Interactive slider */}
          <div className="relative">
            <div
              ref={containerRef}
              tabIndex={0}
              role="group"
              aria-label={`${patientName} before and after comparison`}
              className="relative rounded-2xl shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-amber-200"
              style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
            >
              {/* bottom layer: before image */}
              <img src={beforeSrc} alt={beforeAlt} className="block w-full h-[420px] object-cover" loading="lazy" />

              {/* overlay: show AFTER image (fixed) clipped by width */}
              <div className="absolute top-0 left-0 h-full overflow-hidden" style={overlayStyle} aria-hidden>
                <img src={afterSrc} alt={afterAlt} className="w-full h-[420px] object-cover" loading="lazy" />
              </div>

              {/* sparkle near handle */}
              <div style={{ position: "absolute", left: `calc(${handleLeft} - 8px)`, top: "12%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 30 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2l1.8 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1L12 2z" fill="url(#g1)" />
                  <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#FFF9EA"/><stop offset="1" stopColor="#FFD07A"/></linearGradient></defs>
                </svg>
              </div>

              {/* draggable handle */}
              <div
                ref={handleRef}
                role="slider"
                aria-label="Reveal after image"
                aria-valuemin={2}
                aria-valuemax={98}
                aria-valuenow={Math.round(position)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") { setPosition((p) => clamp(p - 4)); e.preventDefault(); }
                  if (e.key === "ArrowRight") { setPosition((p) => clamp(p + 4)); e.preventDefault(); }
                }}
                style={{
                  position: "absolute",
                  left: handleLeft,
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  zIndex: 40,
                  cursor: "ew-resize",
                  WebkitTapHighlightColor: "transparent",
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow ring-0 hover:scale-105 transition"
                // pointer handlers simply exist on container; these remain for focus/key
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              >
                <div className="w-4 h-4 rounded-full bg-amber-400" />
              </div>

              {/* left/right labels */}
              <div style={{ position: "absolute", left: 12, bottom: 12, zIndex: 45 }} className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded">Before</div>
              <div style={{ position: "absolute", right: 12, bottom: 12, zIndex: 45 }} className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded">After</div>
            </div>

            {/* caption */}
            <figcaption className="mt-3 text-sm text-gray-600">
              {patientName} — {procedure}. {date ? `Completed: ${date}.` : ""}
              <span className="hidden"> Photo credit: Jerushaligne Dental</span>
            </figcaption>
          </div>
        </div>
      </div>

      {/* small CSS */}
      <style>{`
        .ba-grabbing { cursor: grabbing !important; }
        [role="group"]:focus { box-shadow: 0 10px 30px rgba(15,23,42,0.06), 0 0 0 4px rgba(255,210,100,0.12); }
      `}</style>
    </section>
  );
}
