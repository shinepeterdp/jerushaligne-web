// AnimatedSocialIcons.jsx
import React from "react";

/**
 * AnimatedSocialIcons
 *
 * Lightweight, accessible SVG icons with simple CSS animations.
 * - Props: links: { facebook, instagram, youtube, x } (optional)
 *
 * Drop-in, no external dependencies.
 */

export default function AnimatedSocialIcons({
  links = {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    x: "#",
  },
}) {
  return (
    <div className="animated-social-icons" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {/* Facebook (blue) */}
      <a
        href={links.facebook}
        aria-label="Facebook"
        className="asi-btn asi-fb"
        style={btnBase}
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" className="asi-svg" aria-hidden>
          <path
            d="M22 12.07C22 6.45 17.52 2 12 2S2 6.45 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H8.14v-2.9h2.3V9.4c0-2.28 1.35-3.54 3.41-3.54.99 0 2.02.18 2.02.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.41v1.7h2.5l-.4 2.9h-2.1v7.03C18.34 21.25 22 17.09 22 12.07z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Instagram (gradient sweep) */}
      <a
        href={links.instagram}
        aria-label="Instagram"
        className="asi-btn asi-ig"
        style={btnBase}
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" className="asi-svg" aria-hidden>
          <defs>
            <linearGradient id="igGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="40%" stopColor="#fa7e1e" />
              <stop offset="60%" stopColor="#d62976" />
              <stop offset="100%" stopColor="#962fbf" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="url(#igGrad)" strokeWidth="1.6"/>
          <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z" fill="url(#igGrad)"/>
          <circle cx="17.5" cy="6.5" r="0.9" fill="url(#igGrad)"/>
        </svg>
      </a>

      {/* YouTube (ripple + pop) */}
      <a
        href={links.youtube}
        aria-label="YouTube"
        className="asi-btn asi-yt"
        style={btnBase}
        title="YouTube"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" className="asi-svg" aria-hidden>
          <path d="M23.5 6.2a2.8 2.8 0 0 0-1.96-1.98C19.96 3.66 12 3.66 12 3.66s-7.96 0-9.54.56A2.8 2.8 0 0 0 .5 6.2 29.8 29.8 0 0 0 .5 12a29.8 29.8 0 0 0 1 5.8 2.8 2.8 0 0 0 1.96 1.98c1.58.56 9.54.56 9.54.56s7.96 0 9.54-.56a2.8 2.8 0 0 0 1.96-1.98A29.8 29.8 0 0 0 23.5 12a29.8 29.8 0 0 0 0-5.8z" fill="currentColor"/>
          <path d="M10 8l6 4-6 4z" fill="#fff"/>
        </svg>
      </a>

      {/* X (Twitter) — sleek black with tiny shake on hover */}
      <a
        href={links.x}
        aria-label="X"
        className="asi-btn asi-x"
        style={btnBase}
        title="X (Twitter)"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" className="asi-svg" aria-hidden>
          <path d="M20 6.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.4-1.3.7-2.1.9C17 5.5 16 5 14.9 5c-1.8 0-3.2 1.5-3.2 3.3 0 .26.03.51.08.75-2.7-.14-5.1-1.4-6.7-3.4-.28.5-.44 1.1-.44 1.7 0 1.2.6 2.3 1.5 2.9-.53 0-1.03-.16-1.47-.4v.04c0 1.6 1.1 2.9 2.6 3.2-.27.08-.55.12-.84.12-.2 0-.4 0-.6-.06.4 1.3 1.6 2.2 3 2.2-1.1.9-2.5 1.4-4 1.4-.26 0-.52 0-.77-.04 1.5.94 3.3 1.5 5.2 1.5 6.3 0 9.8-5.3 9.8-9.9v-.45c.7-.5 1.2-1.1 1.6-1.8-.6.27-1.3.45-1.99.54z" fill="currentColor"/>
        </svg>
      </a>

      {/* Inline styles & keyframes */}
      <style>{`
        /* base for the icon buttons */
        .asi-btn {
          display: inline-grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          text-decoration: none;
          color: white;
          box-shadow: 0 6px 18px rgba(12,20,40,0.06);
          transition: transform .22s cubic-bezier(.2,.9,.2,1), box-shadow .22s;
          will-change: transform;
        }

        .asi-svg { display: block; }

        /* subtle infinite float */
        .asi-btn { animation: asiFloat 6s ease-in-out infinite; }
        @keyframes asiFloat {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }

        /* hover interactions */
        .asi-btn:hover { transform: translateY(-6px) scale(1.06); box-shadow: 0 14px 30px rgba(12,20,40,0.12); }

        /* Facebook specific */
        .asi-fb { background: #1877F2; color: white; }
        .asi-fb:hover { box-shadow: 0 14px 30px rgba(24,119,242,0.18); }

        /* Instagram gradient sweep (animated background via pseudo element) */
        .asi-ig {
          position: relative;
          padding: 0;
          color: white;
          overflow: hidden;
        }
        .asi-ig::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, #fdf497 0%, #fd5949 30%, #d62976 60%, #285AEB 100%);
          z-index: 0;
          filter: saturate(1.1);
          transform: scale(1.05);
        }
        .asi-ig .asi-svg { position: relative; z-index: 2; }
        /* gentle sweep */
        .asi-ig { animation: asiFloat 6.5s ease-in-out infinite; }
        .asi-ig:hover::before { transform: scale(1.08) rotate(-4deg); transition: transform .45s ease; }

        /* YouTube ripple + pop */
        .asi-yt { background: #FF0000; color: white; }
        .asi-yt::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%) scale(1);
          z-index: 1;
          animation: ytPulse 2.8s infinite;
        }
        @keyframes ytPulse {
          0% { transform: translate(-50%,-50%) scale(0.9); opacity: 0.7; }
          50% { transform: translate(-50%,-50%) scale(1.6); opacity: 0.14; }
          100% { transform: translate(-50%,-50%) scale(0.9); opacity: 0.7; }
        }
        .asi-yt:hover::after { animation-duration: 1.8s; }

        /* X (Twitter) tiny vibration on hover */
        .asi-x { background: #111111; color: #fff; }
        .asi-x:hover { animation: asiShake .6s linear; }
        @keyframes asiShake {
          0% { transform: translateY(-6px) rotate(0); }
          20% { transform: translateY(-6px) rotate(-6deg); }
          40% { transform: translateY(-6px) rotate(6deg); }
          60% { transform: translateY(-6px) rotate(-4deg); }
          80% { transform: translateY(-6px) rotate(4deg); }
          100% { transform: translateY(-6px) rotate(0); }
        }

        /* Respect reduced-motion: stop infinite animations */
        @media (prefers-reduced-motion: reduce) {
          .asi-btn, .asi-ig::before, .asi-yt::after { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}

/* small inline style object for quick use (keeps JSX readable) */
const btnBase = {
  display: "inline-grid",
  placeItems: "center",
  width: 44,
  height: 44,
  borderRadius: 999,
  textDecoration: "none",
};
