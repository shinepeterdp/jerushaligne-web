// ParticleLayer.jsx
import React, { useMemo } from "react";

/**
 * ParticleLayer
 * - Pure React (no styled-jsx or external lib required)
 * - Each particle receives inline CSS properties (--py, --prot, --pdx, --pdy)
 * - Keyframes use CSS vars so every particle can animate differently
 *
 * Usage: place inside a `position: relative` container:
 *   <div style={{ position: "relative" }}>
 *     <ParticleLayer count={28} />
 *     ... other hero content ...
 *   </div>
 */

const TYPES = ["star", "tooth", "glow", "confetti", "balloon"];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function ParticleLayer({ count = 24, ariaHidden = true }) {
  // create descriptors once
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      const size = Math.round(rand(12, 72));
      const left = +(rand(-6, 106)).toFixed(2); // percent
      const top = +(rand(-8, 92)).toFixed(2);
      const duration = +(rand(5, 16)).toFixed(2);
      const delay = +(rand(-6, 4)).toFixed(2);
      const spin = +(rand(-30, 30)).toFixed(2); // deg
      const opacity = +(rand(0.32, 0.95)).toFixed(2);
      const floatY = Math.round(rand(6, 48)); // px amplitude
      const confettiRotate = Math.round(rand(120, 720));
      arr.push({
        id: `p-${i}`,
        type,
        size,
        left,
        top,
        duration,
        delay,
        spin,
        opacity,
        floatY,
        confettiRotate,
      });
    }
    return arr;
  }, [count]);

  return (
    <>
      <div
        aria-hidden={ariaHidden}
        className="particle-layer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 10, // tune relative to your images/text
        }}
      >
        {items.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Global CSS for particle animations */}
      <style>{`
        /* common utilities for particles */
        .particle-layer > * { position: absolute; display: block; will-change: transform, opacity, filter; }

        /* floating vertical (uses --py for px amplitude and --prot for rotation deg) */
        @keyframes floatVertical {
          0% { transform: translate3d(-50%,-50%,0) translateY(0) rotate(0deg); opacity: 0.85; }
          50% { transform: translate3d(-50%,-50%,0) translateY(calc(var(--py))) rotate(var(--prot)); opacity: 1; }
          100% { transform: translate3d(-50%,-50%,0) translateY(0) rotate(0deg); opacity: 0.8; }
        }
        /* drift (translateX small amount + vertical float) */
        @keyframes floatDrift {
          0% { transform: translate3d(-50%,-50%,0) translate(0,0) rotate(0deg); opacity: 0.9; }
          50% { transform: translate3d(-50%,-50%,0) translate(6px, calc(var(--py))) rotate(var(--prot)); opacity: 1; }
          100% { transform: translate3d(-50%,-50%,0) translate(0,0) rotate(0deg); opacity: 0.9; }
        }
        /* confetti fall (travels top-to-bottom across viewport) */
        @keyframes confettiFall {
          0% { transform: translate3d(-50%,-120vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(-50%,120vh,0) rotate(calc(var(--prot))); opacity: 0.95; }
        }
        /* pulsing glow */
        @keyframes pulseGlow {
          0% { transform: translate3d(-50%,-50%,0) scale(0.92); opacity: 0.28; filter: blur(0px); }
          50% { transform: translate3d(-50%,-50%,0) scale(1.08); opacity: 0.72; filter: blur(2px); }
          100% { transform: translate3d(-50%,-50%,0) scale(0.92); opacity: 0.28; filter: blur(0px); }
        }
        /* slow spin (unused directly but available) */
        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* small responsive tweak so big particles don't overflow on tiny screens */
        @media (max-width: 480px) {
          .particle-layer > * { max-width: 80px; max-height: 80px; }
        }
      `}</style>
    </>
  );
}

/* Particle subcomponent */
function Particle({
  id,
  type,
  left,
  top,
  size,
  duration,
  delay,
  spin,
  opacity,
  floatY,
  confettiRotate,
}) {
  // inline style uses CSS vars to parameterize animations
  const baseStyle = {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    transform: `translate(-50%,-50%)`,
    // custom properties for keyframes:
    "--py": `${-Math.abs(floatY)}px`, // negative because float goes up
    "--prot": `${spin}deg`,
    // we'll set animation using inline string so each particle has its unique duration/delay
  };

  // different animation + markup per type
  if (type === "star") {
    return (
      <div
        id={id}
        aria-hidden
        style={{
          ...baseStyle,
          animation: `floatDrift ${duration}s ease-in-out ${delay}s infinite`,
          filter: "drop-shadow(0 8px 18px rgba(255,200,60,0.12))",
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ display: "block" }}>
          <path fill="#FFD54A" d="M12 2l2.6 5.3L20 9l-4 3.9L16.9 20 12 17l-4.9 3 1-7.1L4 9l5.4-1.7L12 2z" />
        </svg>
      </div>
    );
  }

  if (type === "tooth") {
    return (
      <div
        id={id}
        aria-hidden
        style={{
          ...baseStyle,
          animation: `floatVertical ${duration}s ease-in-out ${delay}s infinite`,
          transformOrigin: "50% 50%",
          filter: "drop-shadow(0 8px 20px rgba(255,200,110,0.14))",
        }}
      >
        {/* Cute simplified tooth */}
        <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ display: "block" }}>
          <path
            d="M32 6c6 0 10 3 12 6 2 3 2 8 2 10s0 6-2 8-2 6-2 8-4 6-10 6-10-6-10-6-2-4-2-8-2-6-2-8 0-6 2-10C22 9 26 6 32 6z"
            fill="#FFFFFF"
            stroke="#F7C948"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (type === "glow") {
    return (
      <div
        id={id}
        aria-hidden
        style={{
          ...baseStyle,
          animation: `pulseGlow ${Math.max(3, duration / 1.2)}s ease-in-out ${delay}s infinite`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,245,220,0.95), rgba(255,200,80,0.08) 55%)",
          }}
        />
      </div>
    );
  }

  if (type === "balloon") {
    return (
      <div
        id={id}
        aria-hidden
        style={{
          ...baseStyle,
          animation: `floatDrift ${duration}s ease-in-out ${delay}s infinite`,
          transform: `translate(-50%,-50%) rotate(${spin}deg)`,
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ display: "block" }}>
          <ellipse cx="12" cy="9" rx="8" ry="9" fill="#FFD27A" />
          <path d="M12 18c0 2 3 3 0 5-3-2 0-3 0-5z" fill="#FFB347" />
        </svg>
      </div>
    );
  }

  // confetti (rect) falling animation
  return (
    <div
      id={id}
      aria-hidden
      style={{
        ...baseStyle,
        background: `linear-gradient(90deg, rgba(255,${Math.round(120 + Math.random() * 120)},60,1), rgba(255,${Math.round(
          150 + Math.random() * 90
        )},80,1))`,
        animation: `confettiFall ${duration}s linear ${delay}s infinite`,
        transform: `translate(-50%,-50%) rotate(${confettiRotate}deg)`,
        borderRadius: 3,
      }}
    />
  );
}
