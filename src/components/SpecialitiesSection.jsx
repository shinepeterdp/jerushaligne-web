// SpecialitiesSection.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import GradientButton from "./GradientButton";

/**
 * SpecialitiesSection (mobile fixes)
 *
 * Key changes from previous:
 * - Mobile-first card layout: image on top, text below (single column). Desktop keeps 2-column.
 * - Hide large side arrows on mobile (use small inline controls if needed).
 * - Image sizes and card paddings reduced on mobile so cards are not very tall/skinny.
 * - Book / CTA is visible and sits within card footer on mobile.
 * - Improved overflow / padding handling for small screens.
 *
 * Drop-in replacement for previous SpecialitiesSection.jsx
 */

export default function SpecialitiesSection({
  categories = defaultCategories,
  items = defaultItems,
  autoplayInterval = 5000,
  wrap = true,
}) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [filtered, setFiltered] = useState(() =>
    items.filter((it) => it.category === (categories[0]?.id || ""))
  );

  const containerRef = useRef(null);
  const tabsRef = useRef(null);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const lastUserInteractionRef = useRef(0);
  const hoverRef = useRef(false);
  const intervalRef = useRef(null);

  // Update filtered when category changes
  useEffect(() => {
    const f = items.filter((it) => it.category === activeCat);
    setFiltered(f);
    setIndex(0);
    indexRef.current = 0;
    setTimeout(() => {
      containerRef.current?.scrollTo?.({ left: 0, behavior: "smooth" });
    }, 60);
  }, [activeCat, items]);

  // Helpers
  const getCards = useCallback(() => {
    return containerRef.current
      ? Array.from(containerRef.current.querySelectorAll("[data-slide]"))
      : [];
  }, []);

  const computeCenteredIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const cards = getCards();
    if (!cards.length) return 0;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const cCenter = r.left + r.width / 2;
      const d = Math.abs(center - cCenter);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, [getCards]);

  const scrollToIndex = useCallback(
    (i) => {
      const el = containerRef.current;
      if (!el) return;
      const cards = getCards();
      if (!cards.length) return;
      const idx = Math.max(0, Math.min(i, cards.length - 1));
      const card = cards[idx];
      const cRect = card.getBoundingClientRect();
      const contRect = el.getBoundingClientRect();
      const currentScroll = el.scrollLeft;
      const target =
        currentScroll +
        (cRect.left - contRect.left) -
        (contRect.width - cRect.width) / 2;
      el.scrollTo({ left: Math.round(target), behavior: "smooth" });
      setIndex(idx);
      indexRef.current = idx;
    },
    [getCards]
  );

  // Update index on scroll
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
        setIndex(idx);
        indexRef.current = idx;
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener(
      "wheel",
      () => (lastUserInteractionRef.current = Date.now()),
      { passive: true }
    );
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [computeCenteredIndex]);

  // Drag-to-scroll marking user interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let down = false,
      startX = 0,
      startLeft = 0;
    const onDown = (e) => {
      down = true;
      lastUserInteractionRef.current = Date.now();
      startX = e.touches ? e.touches[0].pageX : e.pageX;
      startLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onUp = () => {
      if (down) lastUserInteractionRef.current = Date.now();
      down = false;
      el.classList.remove("cursor-grabbing");
      setTimeout(() => {
        const idx = computeCenteredIndex();
        setIndex(idx);
        indexRef.current = idx;
      }, 80);
    };
    const onMove = (e) => {
      if (!down) return;
      const x = e.touches ? e.touches[0].pageX : e.pageX;
      el.scrollLeft = startLeft + (startX - x);
    };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onMove);
    };
  }, [computeCenteredIndex]);

  // AUTOPLAY
  useEffect(() => {
    if (!filtered || filtered.length <= 1) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      if (hoverRef.current) return;
      if (now - (lastUserInteractionRef.current || 0) < autoplayInterval) return;
      const n = filtered.length;
      let next = indexRef.current + 1;
      if (next >= n) next = wrap ? 0 : n - 1;
      indexRef.current = next;
      setIndex(next);
      scrollToIndex(next);
    }, autoplayInterval);
    return () => clearInterval(intervalRef.current);
  }, [filtered, autoplayInterval, scrollToIndex, wrap]);

  // Arrow handlers
  const goPrev = () => {
    lastUserInteractionRef.current = Date.now();
    const n = filtered.length || 1;
    let next = indexRef.current - 1;
    if (next < 0) next = wrap ? n - 1 : 0;
    indexRef.current = next;
    setIndex(next);
    scrollToIndex(next);
  };
  const goNext = () => {
    lastUserInteractionRef.current = Date.now();
    const n = filtered.length || 1;
    let next = indexRef.current + 1;
    if (next >= n) next = wrap ? 0 : n - 1;
    indexRef.current = next;
    setIndex(next);
    scrollToIndex(next);
  };

  // pause on hover
  const onMouseEnter = () => {
    hoverRef.current = true;
  };
  const onMouseLeave = () => {
    hoverRef.current = false;
    lastUserInteractionRef.current = Date.now();
  };

  // center active tab pill
  useEffect(() => {
    const wrapEl = tabsRef.current;
    if (!wrapEl) return;
    const tabEl = wrapEl.querySelector(`[data-tab="${activeCat}"]`);
    if (!tabEl) return;
    const wrapRect = wrapEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    const offset =
      tabRect.left + tabRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
    wrapEl.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeCat]);

  // ensure activeCat initialized
  useEffect(() => {
    if (categories && categories.length && !activeCat) setActiveCat(categories[0].id);
  }, [categories]);

  // ======= NEW: dynamic container padding so center card sits visually centered (but keep small on mobile) =======
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const setSidePadding = () => {
      const cards = getCards();
      if (!cards.length) {
        el.style.paddingLeft = "16px";
        el.style.paddingRight = "16px";
        return;
      }

      // Use first card width; if viewport is small, reduce padding
      const cardWidth = Math.min(cards[0].offsetWidth || 760, Math.max(300, el.clientWidth * 0.88));
      const pad = Math.max(Math.round((el.clientWidth - cardWidth) / 2), 12);
      el.style.paddingLeft = `${pad}px`;
      el.style.paddingRight = `${pad}px`;

      setTimeout(() => {
        scrollToIndex(indexRef.current || 0);
      }, 50);
    };

    setSidePadding();
    const onResize = () => setSidePadding();
    window.addEventListener("resize", onResize);

    const imgs = el.querySelectorAll("img");
    let loaded = 0;
    const onImg = () => {
      loaded += 1;
      if (loaded === imgs.length) setSidePadding();
    };
    imgs.forEach((im) => {
      if (im.complete) {
        loaded += 1;
      } else {
        im.addEventListener("load", onImg, { once: true });
      }
    });
    if (loaded === imgs.length) setSidePadding();

    return () => {
      window.removeEventListener("resize", onResize);
      imgs.forEach((im) => im.removeEventListener("load", onImg));
    };
  }, [filtered, getCards, scrollToIndex]);

  // ensure we re-center when index changes
  useEffect(() => {
    scrollToIndex(index);
  }, [index, scrollToIndex]);

  return (
    <section className="py-10 bg-gradient-to-r from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Discover Our Centres Of Clinical Excellence</h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Experience world-class healthcare at our specialized hubs of medical innovation. Select a specialty to explore details.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div ref={tabsRef} className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-1" style={{ WebkitOverflowScrolling: "touch" }}>
            {categories.map((c) => (
              <button
                key={c.id}
                data-tab={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border ${
                  activeCat === c.id ? "bg-teal-900 text-white border-teal-900" : "bg-white text-teal-800 border-teal-200 hover:bg-teal-50"
                } text-sm font-medium shadow-sm`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel wrapper */}
        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* LEFT ARROW (hidden on small screens) */}
          <button
            onClick={goPrev}
            aria-label="Previous specialty"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border shadow-md flex items-center justify-center hover:scale-105 transition"
          >
            <svg className="w-5 h-5 text-teal-700" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Scrollable carousel container */}
          <div
            ref={containerRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-6 no-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filtered.map((it) => (
              <article
                key={it.id}
                data-slide
                // Mobile-first: single column with image on top, then text. Desktop: 2 columns.
                className="snap-center flex-shrink-0 w-full md:w-[820px] bg-white rounded-2xl p-6 md:p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch"
                style={{ minHeight: 0 }}
              >
                {/* MOBILE: image on top -> use order classes so image becomes first on mobile */}
                <div className="order-1 md:order-2 flex items-center justify-center">
                  <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden bg-gray-50 border">
                    {/* image covers, ensure object-cover so proportions OK on mobile */}
                    <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Text block */}
                <div className="order-2 md:order-1 flex flex-col justify-start">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{it.title}</h3>
                  <p className="text-gray-600 mb-4">{it.excerpt}</p>

                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Top Specialities & Procedures</h4>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(it.top || []).slice(0, 4).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full border text-sm text-gray-700 bg-white">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA visible on mobile inside card */}
                  <div className="mt-auto">
                    {it.cta1 ? (
                      <a href={it.cta1Href || "#"} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-teal-800 text-teal-800 hover:bg-teal-50 transition">
                        {it.cta1}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <GradientButton href="#book">Book Appointment</GradientButton>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT ARROW (hidden on small screens) */}
          <button
            onClick={goNext}
            aria-label="Next specialty"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md hover:scale-105 transition"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* CTA at bottom */}
        <div className="mt-8 text-center">
          <GradientButton href="#book">Book Appointment</GradientButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------
   Default sample content
   --------------------------- */
const defaultCategories = [
  { id: "dental", label: "Dental Fillings" },
  { id: "cardiac", label: "Cardiac Sciences" },
  { id: "oncology", label: "Oncology" },
  { id: "neuro", label: "Neurosciences" },
  { id: "gastro", label: "Gastroenterology" },
  { id: "ortho", label: "Orthopaedics" },
  { id: "transplant", label: "Transplants" },
];

const defaultItems = [
  {
    id: "d1",
    category: "dental",
    title: "Dental Fillings",
    excerpt: "High quality tooth-coloured fillings.",
    top: ["Composite", "Amalgam"],
    img: "/images/treatments/dental/dental-fillings.png",
    cta1: "Book Now",
    cta1Href: "#book",
  },
  {
    id: "n1",
    category: "neuro",
    title: "Neurosciences",
    excerpt: "Comprehensive care for the brain, spinal cord and nerves.",
    top: ["Neurosurgery", "Stroke Care", "Spine Surgery", "Epilepsy"],
    img: "https://images.unsplash.com/photo-1581093458793-2f5f3d5c5f8c?q=80&w=1400&auto=format&fit=crop",
    cta1: "Find Doctor",
  },
  {
    id: "c1",
    category: "cardiac",
    title: "Cardiac Sciences",
    excerpt: "Leading heart care: interventional cardiology & surgery.",
    top: ["Bypass Surgery", "Interventional Cardiology"],
    img: "https://images.unsplash.com/photo-1587500154385-9f6c1b3b5a0a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "o1",
    category: "oncology",
    title: "Oncology",
    excerpt: "Comprehensive cancer care combining modern treatments.",
    top: ["Radiotherapy", "Medical Oncology"],
    img: "https://images.unsplash.com/photo-1582719478181-7c9a0d5b3a0b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "g1",
    category: "gastro",
    title: "Gastroenterology",
    excerpt: "Advanced digestive health including endoscopy & hepatology.",
    top: ["Endoscopy", "IBD Care"],
    img: "https://images.unsplash.com/photo-1580281657526-9ea4d1f6e6d6?q=80&w=1400&auto=format&fit=crop",
  },
];
