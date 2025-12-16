import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    bg: "/images/hero/banner-2.webp",
    title: "Advanced Technology from German-UK",
    subtitle:
      "German-UK Advanced Technology India for Pain-Free Treatment.",
    points: ["Pain-free care", "Modern equipment", "Expert dentists"],
  },
  {
    id: 2,
    bg: "/images/hero/banner-1.webp",
    title: "Smile Transformations",
    subtitle:
      "Confidence-changing results with aligners, veneers, and cosmetic care.",
    points: ["Clear aligners", "Smile design", "Proven results"],
  },
  {
    id: 3,
    bg: "/images/hero/banner-3.webp",
    title: "Care for Every Age",
    subtitle:
      "Complete dental care for children, adults, and seniors under one roof.",
    points: ["Family dentistry", "Preventive care", "Long-term health"],
  },
  
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const current = slides[active];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* ✅ BACKGROUND IMAGES – CROSS FADE (NO EMPTY FRAME) */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.img
            key={slide.id}
            src={slide.bg}
            alt="Dental care"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1 : 1.03,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 1.2, ease: "easeOut" },
            }}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 w-full">
          {/* LEFT CONTENT */}
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-xl"
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-500 text-black text-sm font-semibold">
              Jerushaligne
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {current.title}
            </h1>

            <p className="mt-5 text-lg text-white/90">
              {current.subtitle}
            </p>

            {/* MOBILE-FRIENDLY CONTENT POINTS */}
            <div className="mt-5 flex flex-wrap gap-2 sm:grid sm:grid-cols-3 sm:gap-4">
              {current.points.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 text-black text-xs sm:text-sm font-medium shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {point}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <a
                href="#book"
                className="px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-600 transition"
              >
                Book Appointment
              </a>
              <a
                href="#services"
                className="px-6 py-3 rounded-full border border-white/60 hover:bg-white/10 transition"
              >
                View More
              </a>
            </div>
          </motion.div>

          {/* RIGHT SLIDER */}
          <div className="hidden lg:flex flex-col gap-3 justify-center">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setActive(i)}
                className={`relative h-24 w-44 rounded-2xl overflow-hidden transition-all duration-300 ${
                  i === active
                    ? "ring-2 ring-amber-400 scale-[1.03]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={slide.bg}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
