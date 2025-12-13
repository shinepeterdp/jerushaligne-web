// Footer.jsx
import React from "react";

export default function Footer({
  brand = { name: "Jerushaligne", note: "Creating confident smiles" },
  contact = { address: "123 Main Street, Your City", phone: "+91 98765 43210", email: "hello@jerushadental.com" }
}) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">

{/* ---------------- LEFT: LOGO + CONTACT ---------------- */}
<div className="flex flex-col">
  <a href="/" className="flex justify-start">
    <img
      src="Images/footer-logo.png"
      alt="Jerushaligne Dental Logo"
      className="w-56 h-auto object-contain"
    />
  </a>

  <div className="mt-4 space-y-2 text-sm">

    {/* Address */}
    <a
      href={`https://www.google.com/maps/search/${encodeURIComponent(contact.address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition group"
    >
      <svg
        className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
      </svg>
      {contact.address}
    </a>

    {/* Phone */}
    <a
      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
      className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition group"
    >
      <svg
        className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.6 10.8c1.2 2.4 3.1 4.3 5.5 5.5l1.8-1.8c.3-.3.8-.4 1.2-.3 1.3.4 2.7.6 4.1.6.7 0 1.3.6 1.3 1.3v3.2c0 .7-.6 1.3-1.3 1.3C10.4 21.5 2.5 13.6 2.5 4.3 2.5 3.6 3.1 3 3.8 3H7c.7 0 1.3.6 1.3 1.3 0 1.4.2 2.8.6 4.1.1.4 0 .9-.3 1.2l-1.8 1.8z"/>
      </svg>
      {contact.phone}
    </a>

    {/* Email */}
    <a
      href={`mailto:${contact.email}`}
      className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition group"
    >
      <svg
        className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      {contact.email}
    </a>

  </div>
</div>


        {/* ---------------- CENTER: QUICK LINKS ---------------- */}
        <div>
          <h5 className="font-semibold text-white">Quick Links</h5>
          <ul className="mt-3 text-gray-300 space-y-2 text-sm">
            <li><a href="#services" className="hover:text-amber-400 transition">Services</a></li>
            <li><a href="#about" className="hover:text-amber-400 transition">About</a></li>
            <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
            <li><a href="#privacy" className="hover:text-amber-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* ---------------- RIGHT: HOURS + SOCIAL ICONS ---------------- */}
        <div>
          <h5 className="font-semibold text-white">Opening Hours</h5>
          <p className="mt-3 text-gray-300 text-sm">
            Mon - Sat: 9:00 AM - 6:00 PM<br/>Sun: Closed
          </p>

          {/* SOCIAL ICONS */}
          <div className="mt-6 flex gap-4">

            {/* Facebook */}
            <a aria-label="Facebook"
               href="#"
               className="group w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
              <svg className="w-5 h-5 text-white group-hover:rotate-6 transition" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9V15H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12H18l-.5 3h-2.8v6.9A10 10 0 0 0 22 12z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a aria-label="Instagram"
               href="#"
               className="group w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
              <svg className="w-5 h-5 text-white group-hover:rotate-6 transition" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c2.7 0 3 0 4 .1 1 .1 1.7.3 2.3.6.6.3 1.2.7 1.7 1.2.5.5.9 1.1 1.2 1.7.3.6.5 1.3.6 2.3.1 1 .1 1.3.1 4s0 3-.1 4c-.1 1-.3 1.7-.6 2.3-.3.6-.7 1.2-1.2 1.7-.5.5-1.1.9-1.7 1.2-.6.3-1.3.5-2.3.6-1 .1-1.3.1-4 .1s-3 0-4-.1c-1-.1-1.7-.3-2.3-.6-.6-.3-1.2-.7-1.7-1.2-.5-.5-.9-1.1-1.2-1.7-.3-.6-.5-1.3-.6-2.3C2.2 15 2.2 14.7 2.2 12s0-3 .1-4c.1-1 .3-1.7.6-2.3.3-.6.7-1.2 1.2-1.7.5-.5 1.1-.9 1.7-1.2.6-.3 1.3-.5 2.3-.6 1-.1 1.3-.1 4-.1m0-2.2C9.2 0 8.9 0 7.8.1 6.7.2 5.8.4 5 .8 4.1 1.2 3.3 1.8 2.6 2.6 1.8 3.3 1.2 4.1.8 5c-.4.8-.6 1.7-.7 2.8C0 8.9 0 9.2 0 12s0 3.1.1 4.2c.1 1.1.3 2  .7 2.8.4.8 1 1.6 1.8 2.4.8.8 1.6 1.4 2.4 1.8.8.4 1.7.6 2.8.7C8.9 24 9.2 24 12 24s3.1 0 4.2-.1c1.1-.1 2-.3 2.8-.7.8-.4 1.6-1 2.4-1.8.8-.8 1.4-1.6 1.8-2.4.4-.8.6-1.7.7-2.8.1-1.1.1-1.4.1-4.2s0-3.1-.1-4.2c-.1-1.1-.3-2-.7-2.8-.4-.8-1-1.6-1.8-2.4C20.7 1.8 19.9 1.2 19  .8c-.8-.4-1.7-.6-2.8-.7C15.1 0 14.8 0 12 0z"/>
                <circle cx="12" cy="12" r="3.2"/>
              </svg>
            </a>

            {/* YouTube */}
            <a aria-label="YouTube"
               href="#"
               className="group w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-white group-hover:rotate-3 transition" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2s-.2-1.7-.8-2.5c-.7-.9-1.5-.9-1.9-1C17.3 2.2 12 2.2 12 2.2h-.1s-5.3 0-8.8.5c-.4.1-1.2.1-1.9 1-.6.8-.8 2.5-.8 2.5S0 8.3 0 10.5v2.9c0 2.2.2 4.3.2 4.3s.2 1.7.8 2.5c.7.9 1.6.9 2 1C6.7 20.8 12 20.8 12 20.8s5.3 0 8.8-.5c.4-.1 1.2-.1 1.9-1 .6-.8.8-2.5.8-2.5s.2-2.1.2-4.3v-2.9c0-2.2-.2-4.3-.2-4.3zM9.5 15V9l6 3-6 3z"/>
              </svg>
            </a>

            {/* X (Twitter) NEW LOGO */}
            <a aria-label="X"
               href="#"
               className="group w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-black group-hover:rotate-6 transition" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2H21L13.465 10.44L22 22h-7.03l-5.47-7.466L3.97 22H2l8.11-9.23L2 2h7.03l4.927 6.7L18.244 2Z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 text-gray-400 text-sm py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
