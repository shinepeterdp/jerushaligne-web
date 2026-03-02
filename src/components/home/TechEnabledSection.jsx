import { motion } from "framer-motion";
import "../../styles/component.css";

export default function TechEnabledSection() {
  return (
    <section className="tech-section">
      <div className="tech-card">
        {/* LEFT CONTENT */}
        <div className="tech-content">
          {/* Neon glowing title */}
          <h3 className="neon-title">
            <span>JERUSHALIGNE</span> is Tech Enabled
          </h3>

          <p>
            Proprietary artificial intelligence systems that create highly precise 3D models of each patient’s smile.
          </p>
          <p>
            Our in-house OrthoPlanZ system predicts tooth movement with accuracy, allowing doctors to treat even complex teeth-straightening cases efficiently.
          </p>
          <p>This ensures better control, comfort and faster results compared to conventional invisible braces.</p>

          <button className="tech-btn">
            <a href="/clear-aligners">Learn More</a>
          </button>
        </div>

        {/* RIGHT IMAGE with floating animation */}
        <motion.div
          className="tech-image"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/aligner.png"
            alt="Clear dental aligner"
          />
        </motion.div>
      </div>
    </section>
  );
}