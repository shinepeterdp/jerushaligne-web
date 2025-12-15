// TreatmentsSection.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import GradientButton from "./GradientButton";

export default function TreatmentsSection({
  categories = defaultCategories,
  items = defaultItems,
  autoplayInterval = 4000,
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

  useEffect(() => {
    const f = items.filter((it) => it.category === activeCat);
    setFiltered(f);
    setIndex(0);
    indexRef.current = 0;

    // small delay -> adjust layout & center first card
    setTimeout(() => {
      setSidePadding();
      scrollToIndex(0, { instant: true });
    }, 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCat, items]);

  const getCards = useCallback(() => {
    return containerRef.current ? Array.from(containerRef.current.querySelectorAll("[data-slide]")) : [];
  }, []);

  const scrollToIndex = useCallback((i, { instant = false } = {}) => {
    const el = containerRef.current;
    if (!el) return;
    const cards = getCards();
    if (!cards.length) return;
    const idx = Math.max(0, Math.min(i, cards.length - 1));
    const card = cards[idx];

    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const contWidth = el.clientWidth;
    const target = Math.round(cardLeft - (contWidth - cardWidth) / 2);
    const maxScroll = Math.max(0, el.scrollWidth - contWidth);
    const finalTarget = Math.max(0, Math.min(target, maxScroll));

    if (instant) {
      el.scrollLeft = finalTarget;
    } else {
      try {
        el.scrollTo({ left: finalTarget, behavior: "smooth" });
      } catch {
        el.scrollLeft = finalTarget;
      }
    }

    setIndex(idx);
    indexRef.current = idx;
  }, [getCards]);

  const computeCenteredIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const cards = getCards();
    if (!cards.length) return 0;
    const centerX = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const cCenter = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(centerX - cCenter);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, [getCards]);

  const setSidePadding = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = getCards();
    if (!cards.length) {
      el.style.paddingLeft = "12px";
      el.style.paddingRight = "12px";
      return;
    }
    const cardWidth = Math.min(cards[0].offsetWidth || 760, Math.max(280, el.clientWidth * 0.84));
    const pad = Math.max(Math.round((el.clientWidth - cardWidth) / 2), 12);
    el.style.paddingLeft = `${pad}px`;
    el.style.paddingRight = `${pad}px`;
  }, [getCards]);

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
    el.addEventListener("wheel", () => (lastUserInteractionRef.current = Date.now()), { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [computeCenteredIndex]);

  // Drag-to-scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0;
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

  // AUTOPLAY: always move forward (index + 1) and wrap to 0
  useEffect(() => {
    // clear existing
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!filtered || filtered.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      if (hoverRef.current) return;
      if (now - (lastUserInteractionRef.current || 0) < Math.max(600, Math.floor(autoplayInterval / 1.6))) return;

      const n = filtered.length;
      if (n <= 1) return;

      let next = indexRef.current + 1;
      if (next >= n) {
        // wrap to start
        next = 0;
      }
      scrollToIndex(next);
    }, autoplayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [filtered, autoplayInterval, scrollToIndex]);

  // Prev / Next controls
  const goPrev = () => {
    lastUserInteractionRef.current = Date.now();
    const n = filtered.length || 1;
    let next = indexRef.current - 1;
    if (next < 0) next = wrap ? n - 1 : 0;
    scrollToIndex(next);
  };
  const goNext = () => {
    lastUserInteractionRef.current = Date.now();
    const n = filtered.length || 1;
    let next = indexRef.current + 1;
    if (next >= n) next = wrap ? 0 : n - 1;
    scrollToIndex(next);
  };

  const onMouseEnter = () => (hoverRef.current = true);
  const onMouseLeave = () => {
    hoverRef.current = false;
    lastUserInteractionRef.current = Date.now();
  };

  // center tab pill
  useEffect(() => {
    const wrapEl = tabsRef.current;
    if (!wrapEl) return;
    const tabEl = wrapEl.querySelector(`[data-tab="${activeCat}"]`);
    if (!tabEl) return;
    const wrapRect = wrapEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();
    const offset = tabRect.left + tabRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
    wrapEl.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeCat]);

  // recalc padding on resize and after images load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onResize = () => setSidePadding();
    window.addEventListener("resize", onResize);

    const imgs = el.querySelectorAll("img");
    let loaded = 0;
    const onImg = () => {
      loaded += 1;
      if (loaded === imgs.length) setSidePadding();
    };
    imgs.forEach((im) => {
      if (im.complete) loaded += 1;
      else im.addEventListener("load", onImg, { once: true });
    });
    if (loaded === imgs.length) setSidePadding();

    setSidePadding();

    return () => {
      window.removeEventListener("resize", onResize);
      imgs.forEach((im) => im.removeEventListener("load", onImg));
    };
  }, [filtered, setSidePadding]);

  // re-center when index changes (keeps consistent)
  useEffect(() => {
    scrollToIndex(index);
  }, [index, scrollToIndex]);

  return (
    <section className="py-14 bg-gradient-to-r from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Explore Our Dental Treatments</h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">Advanced dental procedures performed by expert clinicians with precision.</p>
        </div>

        <div className="flex justify-center mb-8">
          <div ref={tabsRef} className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-1">
            {categories.map((c) => (
              <button
                key={c.id}
                data-tab={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border ${activeCat === c.id ? "bg-amber-700 text-white border-amber-700" : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"} text-sm font-medium shadow-sm`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white border shadow-md items-center justify-center hover:scale-105 transition"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
               className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-6 no-scrollbar"
               style={{ WebkitOverflowScrolling: "touch" }}>
            {filtered.map((it) => (
              <article key={it.id} data-slide
                       className="snap-center flex-shrink-0 w-full md:w-[820px] bg-white rounded-2xl p-6 md:p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="order-1 md:order-2 flex items-center justify-center">
                  <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden bg-gray-50 border">
                    <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="order-2 md:order-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{it.title}</h3>
                  <p className="text-gray-600 mb-4">{it.excerpt}</p>

                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Top Procedures</h4>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(it.top || []).slice(0, 4).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full border text-sm text-gray-700 bg-white">{t}</span>
                    ))}
                  </div>

                  <div className="mt-auto"><GradientButton href="#book">Book Appointment</GradientButton></div>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={goNext}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-amber-400 text-white items-center justify-center shadow-md hover:scale-105 transition"
            aria-label="Next"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </div>

        <div className="mt-8 text-center"><GradientButton href="#book">Book Appointment</GradientButton></div>
      </div>
    </section>
  );
}

/* defaults */
const defaultCategories = [
  { id: "dental", label: "Dental Fillings" },
  { id: "cardiac", label: "Cardiac Sciences" },
  { id: "oncology", label: "Oncology" },
  { id: "neuro", label: "Neurosciences" },
  { id: "gastro", label: "Gastroenterology" },
];

const defaultItems = [
  {
    id: "d1",
    category: "dental",
    title: "Dental Fillings",
    excerpt: "High quality tooth-coloured fillings.",
    top: ["Composite", "Amalgam"],
    img: "/images/treatments/dental/dental-fillings.png",
  },
  {
    id: "n1",
    category: "neuro",
    title: "Neurosciences",
    excerpt: "Comprehensive care for the brain, spinal cord & nerves.",
    top: ["Neurosurgery", "Stroke Care", "Spine Surgery", "Epilepsy"],
    img: "https://images.unsplash.com/photo-1581093458793-2f5f3d5c5f8c",
  },
  {
    id: "c1",
    category: "cardiac",
    title: "Cardiac Sciences",
    excerpt: "Leading heart care with advanced cardiology services.",
    top: ["Bypass Surgery", "Interventional Cardiology"],
    img: "https://images.unsplash.com/photo-1587500154385-9f6c1b3b5a0a",
  },
  {
    id: "o1",
    category: "oncology",
    title: "Oncology",
    excerpt: "Modern cancer care with expert precision.",
    top: ["Radiotherapy", "Medical Oncology"],
    img: "https://images.unsplash.com/photo-1582719478181-7c9a0d5b3a0b",
  },
  {
    id: "g1",
    category: "gastro",
    title: "Gastroenterology",
    excerpt: "Advanced digestive care including endoscopy & liver health.",
    top: ["Endoscopy", "IBD Care"],
    img: "https://images.unsplash.com/photo-1580281657526-9ea4d1f6e6d6",
  },
];
