// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionPresets";

import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import DoctorsCarousel from "../components/DoctorsCarousel";
import SpecialitiesSection from "../components/SpecialitiesSection";
import WhatsAppButton from "../components/WhatsAppButton";
import BeforeAfterSection from "../components/BeforeAferSection";
import TreatmentsSection from "../components/TreatmentsSection";
import HappySmilesSection from "../components/HappySmilesSection";
import EventsCarousel from "../components/EventsCarousel";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800"
      style={{ fontFamily: "'Figtree', sans-serif" }}
    >
      <main>
        {/* Hero already animated internally */}
        <Hero />

        {/* Services */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <ServicesSection />
        </motion.div>

        {/* About already animated internally */}
        <AboutSection />

        {/* Doctors */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <DoctorsCarousel />
        </motion.div>

        {/* Treatments */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TreatmentsSection />
        </motion.div>

        {/* Happy Smiles */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <HappySmilesSection />
        </motion.div>

        {/* Before / After already animated internally */}
        <BeforeAfterSection />

        {/* Events */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <EventsCarousel />
        </motion.div>
      </main>

      {/* Floating helpers */}
      <WhatsAppButton
        phone="+919876543210"
        message="Hello! I want to book an appointment."
      />
      
    </div>
  );
}
