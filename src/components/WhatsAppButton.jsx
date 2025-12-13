import React from "react";

/**
 * WhatsAppButton
 *
 * Props:
 * - phone: string (required) e.g. "+919876543210" or "919876543210"
 * - message: string (optional) default message
 * - bottom / right: position offsets (Tailwind spacing classes or px values)
 * - showBadge: boolean (show small dot)
 *
 * Usage:
 * <WhatsAppButton phone="+919876543210" message="Hi, I want to book an appointment" />
 */

export default function WhatsAppButton({
  phone = "+919876543210",
  message = "Hi! I found your site and would like to know more about appointments.",
  bottom = "30", // tailwind spacing units (eg. 6 -> bottom-6). Use px via style if needed.
  right = "6",
  showBadge = false,
}) {
  // sanitize phone for wa.me link (remove spaces, +, dashes)
  const cleaned = phone.replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  // fallback: prefer whatsapp:// on mobile but wa.me works cross-platform
  const href = `https://wa.me/${cleaned}?text=${encoded}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-200`}
        style={{
          right: `${parseInt(right, 10) * 4}px`, // tailwind spacing 1 => 4px. adjust if you pass px
          bottom: `${parseInt(bottom, 10) * 4}px`,
          background: "linear-gradient(135deg,#25D366,#128C7E)", // WhatsApp green gradient
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.373 0 .01 4.85.01 10.84c0 1.91.5 3.69 1.44 5.26L0 24l7.2-1.89A11.82 11.82 0 0012 22c6.627 0 11.99-4.85 11.99-10.84 0-2.9-1.07-5.59-3.46-7.68z" fill="currentColor" opacity="0.08"/>
          <path d="M17.472 14.382c-.297-.149-1.756-.867-2.03-.967-.273-.1-.47-.148-.669.148-.199.297-.768.967-.942 1.165-.173.199-.346.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.885-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.373-.025-.522-.074-.149-.669-1.611-.916-2.203-.242-.578-.487-.5-.669-.51l-.571-.01c-.199 0-.522.074-.795.348-.273.273-1.04 1.015-1.04 2.477 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.08 4.487 1.414.61 2.262.973 3.036 1.246.956.332 1.83.285 2.52.173.769-.123 2.366-.965 2.7-1.898.334-.932.334-1.73.233-1.898-.1-.198-.363-.297-.66-.446z" fill="#fff"/>
        </svg>

        {/* optional small unread badge */}
        {showBadge && (
          <span
            aria-hidden="true"
            className="absolute block rounded-full"
            style={{
              width: 10,
              height: 10,
              background: "#FFD166",
              right: 6,
              top: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          />
        )}
      </a>

      {/* subtle entrance animation — adds small flash above button */}
      <style>{`
        a[aria-label="Chat on WhatsApp"] {
          animation: floatIn 800ms cubic-bezier(.2,.9,.2,1) both;
        }
        @keyframes floatIn {
          0% { transform: translateY(26px) scale(.96); opacity: 0; }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
