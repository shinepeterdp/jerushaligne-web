import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const patients = [
  {
    name: "S. Kumar",
    procedure: "Clear Aligner Treatment",
    date: "Aug 2025",
    before: "/images/dental-aligns/before.jpg",
    after: "/images/dental-aligns/after.jpg",
  },
  {
    name: "R. Meena",
    procedure: "Smile Correction",
    date: "Jul 2025",
    before: "/images/dental-aligns/before.jpg",
    after: "/images/dental-aligns/after.jpg",
  },
  {
    name: "A. Joseph",
    procedure: "Teeth Alignment",
    date: "Jun 2025",
    before: "/images/dental-aligns/before.jpg",
    after: "/images/dental-aligns/after.jpg",
  },
];

export default function BeforeAfterCarousel() {
  const [active, setActive] = useState(0);
  const [slider, setSlider] = useState(50);
  const intervalRef = useRef(null);

  const patient = patients[active];

  // Auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(next, 10000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const next = () => {
    setSlider(50);
    setActive((p) => (p + 1) % patients.length);
  };

  const prev = () => {
    setSlider(50);
    setActive((p) => (p === 0 ? patients.length - 1 : p - 1));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Before & After – Patient Smiles
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Real patient transformations. Slide or tap to compare results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-blue-600 font-medium mb-2">
                Patient Result
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {patient.name}
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Procedure:</strong> {patient.procedure}
                </li>
                <li>
                  <strong>Completed:</strong> {patient.date}
                </li>
              </ul>

              <div className="mt-6 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-medium"
                >
                  Book Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border border-gray-300 px-6 py-3 rounded-full"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* IMAGE AREA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Before */}
              <img
                src={patient.before}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Before"
              />

              {/* After */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                animate={{ width: `${slider}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={patient.after}
                  className="w-full h-full object-cover"
                  alt="After"
                />
              </motion.div>

              {/* Before / After Buttons */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSlider(0)}
                  className="bg-white/90 px-4 py-1 rounded-full text-sm font-medium"
                >
                  Before
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSlider(100)}
                  className="bg-white/90 px-4 py-1 rounded-full text-sm font-medium"
                >
                  After
                </motion.button>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={slider}
                onChange={(e) => setSlider(e.target.value)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] accent-yellow-400"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-end gap-3 mt-10">
          <button onClick={prev} className="w-10 h-10 rounded-full border">
            ←
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
