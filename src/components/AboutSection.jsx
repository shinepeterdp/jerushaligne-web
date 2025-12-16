// AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection({
  title = "About Jerushaligne",
  text = "We combine advanced dental technology and thoughtful patient care to deliver exceptional results. Our team focuses on comfort, precision and long-lasting outcomes.",
  image = "/images/about.jpg",
  headerImage = null,
  headerImageAlt = "Jerushaligne clinic",
}) {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-b from-white/80 to-amber-50 overflow-hidden"
      aria-label="About Jerushaligne"
    >
      {/* Decorative gradient */}
      <div
        aria-hidden
        className="absolute -left-32 -top-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,230,180,0.75), rgba(255,210,120,0.35) 40%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 shadow-sm"
            >
              Premium Dental Care
            </motion.p>

            {/* Header */}
            {headerImage ? (
              <motion.div variants={fadeUp} className="mt-6">
                <img
                  src={headerImage}
                  alt={headerImageAlt}
                  className="w-44 h-auto object-contain rounded-md shadow-sm"
                />
              </motion.div>
            ) : (
              <motion.h2
                variants={fadeUp}
                className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900"
              >
                {title}
              </motion.h2>
            )}

            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-700 max-w-2xl text-lg"
            >
              {text}
            </motion.p>

            {/* Feature cards */}
            <motion.div
              variants={stagger}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              {features.map((item, i) => (
                <motion.article
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="flex gap-4 items-start p-4 bg-white rounded-2xl shadow-sm border border-white hover:shadow-lg transition"
                >
                  {item.icon}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-gray-600 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* CTA + Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <a
                href="#book"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                View More
              </a>

              <div className="flex gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-extrabold text-amber-600">
                      {s.value}
                    </div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt="Jerushaligne team or clinic"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-amber-200/30" />
            </div>

            {/* Floating elements */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            >
              🦷
            </motion.div>

            <motion.div
              aria-hidden
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 w-24 h-24 rounded-2xl bg-amber-50/90 flex items-center justify-center shadow-sm"
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* DATA */
const features = [
  {
    title: "Comfort-first treatments",
    desc: "Sedation options and gentle protocols for every age.",
    icon: <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">🦷</div>,
  },
  {
    title: "Sterile & modern clinic",
    desc: "ISO-grade sterilization and latest treatment tech.",
    icon: <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">🛡️</div>,
  },
  {
    title: "Personalized plans",
    desc: "Treatment plans crafted for long-term oral health.",
    icon: <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">❤️</div>,
  },
  {
    title: "Proven results",
    desc: "Decades of clinician experience & satisfied patients.",
    icon: <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">😊</div>,
  },
];

const stats = [
  { value: "12k+", label: "Happy Smiles" },
  { value: "25+", label: "Years of Care" },
  { value: "99.9%", label: "Best Results" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
