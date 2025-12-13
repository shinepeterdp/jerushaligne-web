// GradientButton.jsx (simplified)
export default function GradientButton({ href="#", children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow hover:opacity-95 transition"
    >
      {children}
    </a>
  );
}
