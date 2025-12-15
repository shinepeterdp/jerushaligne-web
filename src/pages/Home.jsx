// Home.jsx
import React from "react";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import DoctorsCarousel from "../components/DoctorsCarousel";
import SpecialitiesSection from "../components/SpecialitiesSection";
import WhatsAppButton from "../components/WhatsAppButton";
import DentalChatbot from "../components/DentalChatbot";
import BeforeAfterSection from "../components/BeforeAferSection";
import TreatmentsSection from "../components/TreatmentsSection";
import HappySmilesSection from "../components/HappySmilesSection";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800"
      style={{ fontFamily: "'Figtree', sans-serif" }}
    >
      <main>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <DoctorsCarousel />
        <TreatmentsSection />
        <HappySmilesSection />

        <BeforeAfterSection
          beforeSrc="/images/dental-aligns/after.jpg"
          afterSrc="/images/dental-aligns/before.jpg"
          patientName="S. Kumar"
          procedure="Clear Aligner Treatment"
          date="Aug 2025"
        />
      </main>

      <WhatsAppButton
        phone="+919876543210"
        message="Hello! I want to book an appointment."
      />
      <DentalChatbot />
    </div>
  );
}
