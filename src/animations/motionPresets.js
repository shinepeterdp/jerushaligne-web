// src/animations/motionPresets.js
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

// Floating (icons only)
export const floatY = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatX = {
  animate: {
    x: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Hover micro-interaction
export const hoverLift = {
  whileHover: { y: -6 },
  transition: { duration: 0.3 },
};
