// IconLogo.jsx
import React from "react";

export default function IconLogo({ size = 10 }) {
  // size not dynamic in Tailwind at runtime; default classes used
  return (
    <div
      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500
                 flex items-center justify-center shadow-lg"
      aria-hidden
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v6m0 8v6m8-8h-6M4 12H2" />
      </svg>
    </div>
  );
}
