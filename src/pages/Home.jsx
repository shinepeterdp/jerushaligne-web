// Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import DoctorsCarousel from "../components/DoctorsCarousel";
import SpecialitiesSection from "../components/SpecialitiesSection";
import WhatsAppButton from "../components/WhatsAppButton";
import DentalChatbot from "../components/DentalChatbot";
import BeforeAfterSection from "../components/BeforeAferSection";
import TreatmentsSection from "../components/TreatmentsSection";
import HappySmilesSection from "../components/HappySmilesSection";


export default function Home() {
  const services = [
    { title: "Teeth Cleaning", desc: "Professional cleaning for a bright, healthy smile." },
    { title: "Braces & Invisalign", desc: "Orthodontic solutions tailored to you." },
    { title: "Dental Implants", desc: "Durable, natural-looking tooth replacements." },
    { title: "Cosmetic Dentistry", desc: "Veneers, whitening and smile makeovers." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <DoctorsCarousel />
        <TreatmentsSection />
        <HappySmilesSection />
        
      <BeforeAfterSection
      beforeSrc="Images/dental-aligns/before.jpg"
      afterSrc="Images/dental-aligns/after.jpg"
      patientName="S. Kumar"
      procedure="Clear Aligner Treatment"
      date="Aug 2025"
    />        
      </main>
        <WhatsAppButton phone="+919876543210" message="Hello! I want to book an appointment." />
        <DentalChatbot />
      <Footer />
    </div>
  );
}
