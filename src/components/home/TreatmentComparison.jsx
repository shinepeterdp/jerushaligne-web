import { motion } from "framer-motion";
import "../../styles/component.css";

export default function TreatmentComparison() {
  return (
    <motion.section
      className="compare-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="compare-box">
        <motion.h2
          className="compare-title"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="theme-highlight">Jerushaligne</span> vs Other Aligners
        </motion.h2>

        <motion.p
          className="compare-subtitle"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          If you want reliable clear aligners with professional oversight, Jerushaligne is your trusted partner.
        </motion.p>

        <div className="compare-grid">
          <motion.div
            className="compare-card premium"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.03 }}
          >
            <h3>Jerushaligne</h3>
            <ul>
              <li><span className="tick">✔</span> Simple to complex tooth movements</li>
              <li><span className="tick">✔</span> Doctor-designed & supervised</li>
              <li><span className="tick">✔</span> Weekly aligner change</li>
              <li><span className="tick">✔</span> Clinic + digital monitoring</li>
              <li><span className="tick">✔</span> Doctor-decided pricing</li>
            </ul>
            <motion.img
              src="/images/comparison/girl.webp"
              alt="Jerushaligne Aligners"
              className="compare-image"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="compare-card standard"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.03 }}
          >
            <h3>Essentials of Jerushaligne</h3>
            <ul>
              <li><span className="tick">✔</span> Simple to moderate corrections</li>
              <li><span className="tick">✔</span> Doctor supervised</li>
              <li><span className="tick">✔</span> Aligner change every 2 weeks</li>
              <li><span className="tick">✔</span> Clinic-based monitoring</li>
            </ul>
            <motion.img
              src="/images/comparison/girl-2.webp"
              alt="Essentials Aligners"
              className="compare-image"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="compare-card basic"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.03 }}
          >
            <h3>Other Aligners</h3>
            <ul>
              <li><span className="cross">✘</span> Only cosmetic corrections</li>
              <li><span className="cross">✘</span> Limited or no doctor supervision</li>
              <li><span className="cross">✘</span> Aligner change varies</li>
              <li><span className="cross">✘</span> Mostly online monitoring</li>
              <li><span className="cross">✘</span> Lower cost, limited control</li>
            </ul>
            <motion.img
              src="/images/comparison/girl-3.webp"
              alt="Online Aligners"
              className="compare-image"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}