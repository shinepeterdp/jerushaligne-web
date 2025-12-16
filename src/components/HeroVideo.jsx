import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-white"
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-500/90 text-black text-sm font-semibold">
            Premium Dental Care
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Gentle Care.
            <br />
            Confident Smiles.
          </h1>

          <p className="mt-5 text-lg text-white/90">
            Advanced dental treatments with modern technology and a
            patient-first approach.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#book"
              className="px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-600 transition"
            >
              Book Appointment
            </a>

            <a
              href="#services"
              className="px-6 py-3 rounded-full border border-white/60 text-white hover:bg-white/10 transition"
            >
              Our Treatments
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
