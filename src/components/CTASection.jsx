// CTASection.jsx
import React from "react";
import GradientButton from "./GradientButton";

export default function CTASection() {
  return (
    <section className="py-14 bg-gradient-to-r from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-2xl py-12 shadow-lg">
        <h4 className="text-2xl font-semibold">WANT MORE INFORMATION ON JERUSHALIGNE?</h4>
        <p className="mt-3 text-gray-700">Schedule your personalised consultation with our specialists.</p>
        <div className="mt-6">
          <GradientButton href="#book">Book Appointment</GradientButton>
        </div>
      </div>
    </section>
  );
}
