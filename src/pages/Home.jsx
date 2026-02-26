import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionPresets";

// import HeroVideo from "../components/home/HeroVideo";
import HeroSlider from "../components/home/HeroSlider";
import ServicesSection from "../components/home/ServicesSection";
import AboutSection from "../components/home/AboutSection";
import BeforeAfterSection from "../components/home/BeforeAferSection";
import OurClinics from "../components/home/OurClinics";
import EventsCarousel from "../components/home/EventsCarousel";
import HowItWorks from "../components/home/HowItWorks";
import GallerySection from "../components/home/GallerySection";
import TechEnabledSection from "../components/home/TechEnabledSection";
import TreatmentComparison from "../components/home/TreatmentComparison";



export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800"
      style={{ fontFamily: "'montserrat', sans-serif" }}
    >
      <main>
        {/* Hero already animated internally */}
        <HeroSlider />

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


      {/* HowItWorks */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <HowItWorks />
        </motion.div>

      {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TreatmentComparison />
        </motion.div>


          {/* TechEnabled Sectiom */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TechEnabledSection />
        </motion.div>


        {/* Before / After already animated internally */}
        <BeforeAfterSection />

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <GallerySection />
        </motion.div>


         {/* Our Clinics */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <OurClinics />
        </motion.div>
     

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

          
    

    </div>
  );
}
