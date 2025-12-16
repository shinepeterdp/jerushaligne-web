import React from "react";

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* ================= HERO / INTRO ================= */}
      <section className="bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-amber-100 text-amber-700">
            About Jerushaligne
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Redefining Modern <span className="text-amber-500">Dental Care</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Jerushaligne Dental Clinic blends advanced dental technology with
            compassionate care to deliver confident, healthy smiles.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jerushaligne is a premium dental clinic built on the foundation of
              precision, trust, and innovation. We specialize in modern
              orthodontics, cosmetic dentistry, and advanced dental treatments.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With German-UK aligned technology and expert clinicians, we ensure
              every patient receives safe, personalized, and long-lasting dental
              solutions.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/about.jpg"
              alt="Jerushaligne Dental Clinic"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-amber-500">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted dental care leader by delivering world-class
              treatments, ethical practices, and life-changing smiles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-amber-500">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide safe, comfortable, and technologically advanced dental
              care while prioritizing patient satisfaction and long-term oral
              health.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Jerushaligne</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Advanced Technology",
                desc: "German-UK aligned dental systems for precision treatments.",
              },
              {
                title: "Expert Doctors",
                desc: "Highly skilled dental professionals with years of experience.",
              },
              {
                title: "Patient-First Care",
                desc: "Comfort, safety, and transparency at every step.",
              },
              {
                title: "Proven Results",
                desc: "Thousands of confident smiles transformed successfully.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
