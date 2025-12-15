import React, { useRef, useEffect, useState, useCallback } from "react";

export default function DoctorsCarousel({
  doctors = sampleDoctors,
  autoplay = true,
  autoplayInterval = 4000,
  wrap = true,
}) {
  const containerRef = useRef(null);

  // index tracking
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  // user interaction / hover pause
  const lastUserInteractionRef = useRef(0);
  const hoverRef = useRef(false);

  // intersection set for entry animation
  const [visibleSet, setVisibleSet] = useState(new Set());

  // initialize intersection observer for card reveal
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev);
          entries.forEach((en) => {
            const id = en.target.getAttribute("data-id");
            if (en.isIntersecting) next.add(id);
          });
          return next;
        });
      },
      { root: el, threshold: 0.45 }
    );
    el.querySelectorAll("[data-id]").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [doctors]);

  // helper: compute items list (live)
  const getItems = useCallback(() => {
    const el = containerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll("[data-id]"));
  }, []);

  // helper: center scroll to a given index
  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    const items = getItems();
    if (!items || !items[index]) return;
    const item = items[index];
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const currentScroll = container.scrollLeft;
    // targetLeft to center item
    const targetLeft =
      currentScroll + (itemRect.left - containerRect.left) - (containerRect.width - itemRect.width) / 2;
    container.scrollTo({ left: Math.round(targetLeft), behavior: "smooth" });
  }, [getItems]);

  // function to advance to next index (used by autoplay and arrow)
  const goToIndex = useCallback((index) => {
    const n = doctors.length || 0;
    if (n === 0) return;
    const next = Math.max(0, Math.min(index, n - 1));
    setCurrentIndex(next);
    currentIndexRef.current = next; // keep ref in sync for interval logic
    // scroll (if DOM not ready, retry shortly)
    setTimeout(() => scrollToIndex(next), 10);
  }, [doctors.length, scrollToIndex]);

  // arrow handlers
  const goPrev = () => {
    lastUserInteractionRef.current = Date.now();
    const n = doctors.length;
    let next = currentIndexRef.current - 1;
    if (next < 0) next = wrap ? n - 1 : 0;
    goToIndex(next);
  };
  const goNext = () => {
    lastUserInteractionRef.current = Date.now();
    const n = doctors.length;
    let next = currentIndexRef.current + 1;
    if (next >= n) next = wrap ? 0 : n - 1;
    goToIndex(next);
  };

  // drag-to-scroll and manual interaction marking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let down = false, startX = 0, startScroll = 0;
    const onDown = (e) => {
      down = true;
      lastUserInteractionRef.current = Date.now();
      startX = e.touches ? e.touches[0].pageX : e.pageX;
      startScroll = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onUp = () => {
      down = false;
      el.classList.remove("cursor-grabbing");
      lastUserInteractionRef.current = Date.now();
      // update currentIndex after manual scroll (schedule)
      setTimeout(() => {
        const idx = computeCenteredIndex();
        setCurrentIndex(idx);
        currentIndexRef.current = idx;
      }, 100);
    };
    const onMove = (e) => {
      if (!down) return;
      const x = e.touches ? e.touches[0].pageX : e.pageX;
      el.scrollLeft = startScroll + (startX - x);
    };

    const onWheel = () => lastUserInteractionRef.current = Date.now();

    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // compute centered index (closest to center)
  const computeCenteredIndex = useCallback(() => {
    const items = getItems();
    if (!items || items.length === 0) return 0;
    const container = containerRef.current;
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
    let best = 0; let bestDist = Infinity;
    items.forEach((it, i) => {
      const r = it.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const d = Math.abs(center - containerCenter);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }, [getItems]);

  // update currentIndex on scroll (debounced with rAF)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      lastUserInteractionRef.current = Date.now();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = computeCenteredIndex();
        setCurrentIndex(idx);
        currentIndexRef.current = idx;
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [computeCenteredIndex]);

  // robust autoplay using single interval and currentIndexRef
  useEffect(() => {
    if (!autoplay) return;
    const n = doctors.length || 0;
    if (n <= 1) return;
    const interval = setInterval(() => {
      // skip autoplay if hovered or recently interacted
      const now = Date.now();
      if (hoverRef.current) return;
      if (now - (lastUserInteractionRef.current || 0) < autoplayInterval) return;
      const next = (currentIndexRef.current + 1) % n;
      currentIndexRef.current = next;
      setCurrentIndex(next);
      // scroll - ensure items exist
      setTimeout(() => scrollToIndex(next), 20);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, doctors.length, scrollToIndex]);

  // center on mount / when doctors change
  useEffect(() => {
    // small delay so DOM layout stabilizes
    const t = setTimeout(() => {
      currentIndexRef.current = 0;
      setCurrentIndex(0);
      scrollToIndex(0);
    }, 80);
    return () => clearTimeout(t);
  }, [doctors.length, scrollToIndex]);

  // hover pause handlers
  const onMouseEnter = () => {
    hoverRef.current = true;
  };
  const onMouseLeave = () => {
    hoverRef.current = false;
    lastUserInteractionRef.current = Date.now();
  };

  return (
    <section className="py-12 overflow-hidden" aria-label="Our Doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header + arrows */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-serif text-amber-800">Our Doctors</h2>
            <p className="mt-3 text-gray-600 max-w-xl">Experience a transformational journey through our wide spectrum of services.</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button onClick={goPrev} className="p-2 rounded-lg bg-white/90 border hover:bg-white shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300 arrow-btn cursor-pointer" aria-label="Previous" >
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={goNext} className="p-2 rounded-lg bg-white/90 border hover:bg-white shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300 arrow-btn cursor-pointer" aria-label="Next">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* carousel */}
        <div
          ref={containerRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative flex items-start gap-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar py-4"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {doctors.map((d) => {
            const visible = visibleSet.has(String(d.id));
            return (
              <article
                key={d.id}
                data-id={d.id}
                className={
                  "snap-start flex-shrink-0 w-[80%] sm:w-[46%] md:w-[30%] lg:w-[22%] p-4 " +
                  "opacity-0 translate-y-6 transform transition-all duration-700 " +
                  (visible ? "opacity-100 translate-y-0" : "")
                }
                aria-label={d.name}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
                  <div className="h-64 bg-gradient-to-b from-amber-200 via-amber-100 to-white flex items-end justify-center">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm tracking-wider text-amber-700 font-semibold">{d.name.toUpperCase()}</h3>
                    <p className="mt-2 text-gray-600">{d.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   sample data
   -------------------------- */
const sampleDoctors = [
  { id: 1, name: "Dr. Bladbin", role: "Chief Dental Specialist", img: "/images/hero/bladbin-dr.png"},
  { id: 2, name: "Dr. Binila", role: "Cosmetic Specialist", img: "/images/hero/binila-dr.png" },
  { id: 3, name: "Dr. Maria Lopez", role: "Cosmetic Dentist", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Dr. Li Wei", role: "Orthodontist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, name: "Dr. Li Wei", role: "Orthodontist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" },


];
