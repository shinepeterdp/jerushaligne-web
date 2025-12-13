// AboutSection.jsx
import React from "react";
import aboutImg from "../assets/images/home/about.jpg";

/**
 * Premium About Section (updated)
 *
 * New prop:
 *  - headerImage (string) — if provided, will render this image in place of the textual title.
 *
 * Other props:
 *  - title, text, image (right-side image)
 *
 * Example:
 * <AboutSection headerImage={clinicLogo} title="About Jerushaligne" ... />
 */

export default function AboutSection({
  title = "About Jerushaligne",
  text = "We combine advanced dental technology and thoughtful patient care to deliver exceptional results. Our team focuses on comfort, precision and long-lasting outcomes.",
  image = aboutImg,
  headerImage = null, // NEW: render an image instead of the textual title when provided
  headerImageAlt = "Jerushaligne clinic",
}) {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-white/80 to-amber-50 overflow-hidden"
      aria-label="About Jerushaligne"
    >
      {/* Soft decorative gradient circle */}
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,230,180,0.75), rgba(255,210,120,0.35) 40%, transparent 60%)",
          filter: "blur(40px)",
          mixBlendMode: "multiply",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Copy + features + stats */}
          <div>
            <p
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 shadow-sm"
              style={{ animation: "fadeUp .48s ease both" }}
            >
              Premium Dental Care
            </p>

            {/* HEADER: image OR text title */}
            {headerImage ? (
              <div
                style={{ animation: "fadeUp .6s ease .06s both" }}
                className="mt-6"
                aria-hidden={false}
              >
                <img
                  src={headerImage}
                  alt={headerImageAlt}
                  className="w-44 h-auto object-contain rounded-md shadow-sm"
                  style={{ display: "block" }}
                />
              </div>
            ) : (
              <h2
                className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900"
                style={{ animation: "fadeUp .6s ease .06s both" }}
              >
                {title}
              </h2>
            )}

            {/* subtitle text */}
            <p
              className="mt-4 text-gray-700 max-w-2xl text-lg"
              style={{ animation: "fadeUp .7s ease .12s both" }}
            >
              {text}
            </p>

            {/* Feature cards */}
            <div
              className="mt-8 grid sm:grid-cols-2 gap-4"
              style={{ animation: "fadeUp .8s ease .18s both" }}
            >
              <article className="flex gap-4 items-start p-4 bg-white rounded-2xl shadow-sm border border-white hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex-none w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
                  {/* tooth icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6c0 0-1 6 6 11 7-5 6-11 6-11 0-4-5-5-6-5s-6 1-6 5z" fill="#fff" stroke="#FFB84D" strokeWidth="0.9"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Comfort-first treatments</h4>
                  <p className="mt-1 text-gray-600 text-sm">Sedation options and gentle protocols for every age.</p>
                </div>
              </article>

              <article className="flex gap-4 items-start p-4 bg-white rounded-2xl shadow-sm border border-white hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex-none w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
                  {/* shield icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" fill="#fff" stroke="#FFB84D" strokeWidth="0.9"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Sterile & modern clinic</h4>
                  <p className="mt-1 text-gray-600 text-sm">ISO-grade sterilization and latest treatment tech.</p>
                </div>
              </article>

              <article className="flex gap-4 items-start p-4 bg-white rounded-2xl shadow-sm border border-white hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex-none w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
                  {/* heart icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 21s-7-4.5-9-7.5C-1 7 6 4 7.5 6.5 9 3 12 4 12 4s3-1 4.5 2.5C18 4 25 7 21 13.5 19 16.5 12 21 12 21z" fill="#fff" stroke="#FFB84D" strokeWidth="0.7"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Personalized plans</h4>
                  <p className="mt-1 text-gray-600 text-sm">Treatment plans crafted for long-term oral health.</p>
                </div>
              </article>

              <article className="flex gap-4 items-start p-4 bg-white rounded-2xl shadow-sm border border-white hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex-none w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
                  {/* smile icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12s2 5 8 5 8-5 8-5" stroke="#FFB84D" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="9" cy="10" r="1.1" fill="#FFB84D"/>
                    <circle cx="15" cy="10" r="1.1" fill="#FFB84D"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Proven results</h4>
                  <p className="mt-1 text-gray-600 text-sm">Decades of combined clinician experience and satisfied patients.</p>
                </div>
              </article>
            </div>

            {/* Stats & CTA */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
                >
                  View More
                </a>
              </div>

              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-600">12k+</div>
                  <div className="text-sm text-gray-600">Happy Smiles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-600">25+</div>
                  <div className="text-sm text-gray-600">Years of Care</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-600">99.9%</div>
                  <div className="text-sm text-gray-600">Best Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Image with overlay + floating dental vector */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
                transition: "transform .45s cubic-bezier(.2,.9,.2,1)",
              }}
            >
              <img
                src={image}
                alt="Jerushaligne team or clinic"
                className="w-full h-96 object-cover"
                style={{ display: "block" }}
              />

              {/* gradient overlay for "light on image" premium feel */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,235,205,0.08) 40%, rgba(255,210,120,0.22) 100%)",
                }}
              />
            </div>

            {/* floating vector art (tooth + star) */}
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-md"
              style={{ animation: "floatUpDown 4s ease-in-out infinite" }}
            >
              <span
                style={{
                  fontSize: "26px",
                  lineHeight: "1",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
                aria-hidden="true"
              >
                🦷
              </span>
            </div>

            <div
              aria-hidden="true"
              className="absolute -right-6 -bottom-6 w-24 h-24 rounded-2xl bg-amber-50/90 flex items-center justify-center shadow-sm"
              style={{ animation: "floatLeftRight 5s ease-in-out infinite" }}
            >
              <span
                style={{
                  fontSize: "26px",
                  lineHeight: "1",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
                aria-hidden="true"
              >
                ✨
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations (kept small and CSS-only; respects prefers-reduced-motion) */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUpDown {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        @keyframes floatLeftRight {
          0% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
          100% { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0s !important; }
        }
      `}</style>
    </section>
  );
}
