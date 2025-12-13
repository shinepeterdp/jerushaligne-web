// ServicesSection.jsx
import React from "react";
import ServiceCard from "./ServiceCard";

/**
 * ServicesSection.jsx — uses ServiceCard
 * Keep defaultServices if you don't pass `services` prop.
 */

export default function ServicesSection({ services = defaultServices }) {
  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-yellow-50 via-yellow-25 to-white"
    >
      {/* subtle decorative circles */}
      <div className="absolute -left-24 -top-20 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />
      <div className="absolute right-8 bottom-0 w-72 h-72 rounded-full bg-amber-50/30 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">Why to Choose Jerushaligne?</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Advanced treatments delivered with care and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id || i}
              // stagger effect via inline style delay
              style={{ animation: `fadeUp .6s ease ${(i * 80) / 100}s both` }}
            >
              <ServiceCard title={s.title} desc={s.excerpt || s.desc} icon={s.icon} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* default sample data */
const defaultServices = [
  {
    id: "best-class",
    title: "Best in Class Accuracy",
    excerpt: "99.99% accuracy guaranteed across cases for all types of teeth.",
    icon: "🪥",
  },
  {
    id: "All in One",
    title: "All in One Dental ALigners",
    excerpt: "End to end solution from patient monitoring to a Aligner delivery.",
    icon: "🦷",
  },
  {
    id: "technology",
    title: "Technology First",
    excerpt: "Proprietary Technology backed & built by years of experience.",
    icon: "⚙️",
  },
  {
    id: "affordable",
    title: "Affordable Price",
    excerpt: "Uncompromising on Quality still pocket friendly.",
    icon: "✨",
  },
  {
    id: "easy use",
    title: "Easy to use platform",
    excerpt: "Patient information, support portal-Get it all in one Platform.",
    icon: "✨",
  },
  {
    id: "material",
    title: "Revolutionary Material",
    excerpt: "Uncompromising on Quality still pocket friendly.",
    icon: "✨",
  },
];
