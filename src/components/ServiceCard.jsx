// ServiceCard.jsx
import React from "react";

/**
 * Clean, readable gradient card.
 * - strong contrast text (dark on light gradients)
 * - visible CTA button
 * - small floating decorative svg (optional file in /public/vectors/)
 */

export default function ServiceCard({ title, desc, icon }) {
  return (
    <article
      className="relative p-6 rounded-2xl overflow-hidden transform transition-all duration-400 hover:-translate-y-2"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,240,220,0.95) 0%, rgba(255,225,160,0.96) 100%)",
        boxShadow: "0 10px 30px rgba(16,24,40,0.06)",
      }}
    >
      {/* Optional decorative SVG — only visible if file exists */}
      <div
        aria-hidden
        className="absolute -top-6 -right-6 opacity-20 pointer-events-none"
        style={{ width: 84, height: 84 }}
      >
        <img
          src="/vectors/tooth-soft.svg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => {
            // If svg not found, hide quietly
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 p-3 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            width: 56,
            height: 56,
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* simple icon fallback (you can pass react node as `icon`) */}
          <span className="text-amber-600 text-xl" aria-hidden>
            {icon ?? "🦷"}
          </span>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            background: "linear-gradient(90deg,#FFB347,#FF6F00)",
            color: "#081126",
            boxShadow: "0 8px 18px rgba(255,110,0,0.16)",
          }}
        >
          Learn more
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>
    </article>
  );
}
