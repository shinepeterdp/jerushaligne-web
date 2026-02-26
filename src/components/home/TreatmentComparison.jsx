import { motion } from "framer-motion";
import "../../styles/component.css";

export default function TreatmentComparison() {
  return (
    <motion.section
      className="compare-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="compare-box">

        {/* TITLE */}
        <motion.h3
          className="compare-title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Jerushaligne vs Other Aligners
        </motion.h3>

        {/* SUBTITLE */}
        <motion.p
          className="compare-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          If you want reliable clear aligners with professional oversight, Jerushaligne is your trusted partner.
        </motion.p>

        {/* GRID */}
        <div className="compare-grid">

          {/* CARD 1 */}
          <motion.div
            className="compare-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <h3>Jerushaligne</h3>

            <ul>
              <li>Simple to complex tooth movements</li>
              <li>Doctor-designed & supervised</li>
              <li>Weekly aligner change</li>
              <li>Clinic + digital monitoring</li>
              <li>Doctor-decided pricing</li>
            </ul>

            <motion.img
              src="/images/comparison/girl.webp"
              alt="Jerushaligne Aligners"
              className="compare-image"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="compare-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <h3>Essentials of Jerushaligne</h3>

            <ul>
              <li>Simple to moderate corrections</li>
              <li>Doctor supervised</li>
              <li>Aligner change every 2 weeks</li>
              <li>Clinic-based monitoring</li>
            </ul>

            <motion.img
              src="/images/comparison/girl-2.webp"
              alt="Essentials Aligners"
              className="compare-image"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            className="compare-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <h3>Other Aligners</h3>

            <ul>
              <li>Only cosmetic corrections</li>
              <li>Limited or no doctor supervision</li>
              <li>Aligner change varies</li>
              <li>Mostly online monitoring</li>
              <li>Lower cost, limited control</li>
            </ul>

            <motion.img
              src="/images/comparison/girl-3.webp"
              alt="Online Aligners"
              className="compare-image"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
