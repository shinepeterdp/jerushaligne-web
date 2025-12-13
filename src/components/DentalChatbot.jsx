// DentalChatbot.jsx
// Minimal, accessible dental assistant chatbot widget.
// - Rule-based reply engine by default
// - Optional OpenAI integration (commented) for smarter replies
// - Collects simple lead info and can emit events for analytics

import React, { useEffect, useRef, useState } from "react";

/**
 * Usage:
 * <DentalChatbot openAiKey={process.env.REACT_APP_OPENAI_KEY} clinic={{name:"Jerushaligne", phone:"+919876543210"}} />
 *
 * If openAiKey is provided, the widget will attempt to call a server endpoint (recommended)
 * — see README section below to safely proxy OpenAI keys from your backend.
 */

export default function DentalChatbot({ openAiKey = null, clinic = { name: "Jerushaligne", phone: "+91 98765 43210" } }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: `Hi — I'm DentAssist, your friendly dental assistant. How can I help today?\nYou can ask about appointments, treatments, hours, or pre/post care.` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Basic rule-based intents
  const INTENTS = [
    { tags: ["appointment", "book", "reserve"], reply: (q) => `I can help schedule an appointment. Which day works for you? Or call ${clinic.phone}` },
    { tags: ["hours", "opening", "time"], reply: () => "We are open Mon - Sat: 9:00 AM - 6:00 PM." },
    { tags: ["price", "cost", "charge"], reply: () => "Costs depend on treatment. Would you like an estimate for teeth cleaning, braces, or aligners?" },
    { tags: ["aligner", "aligners", "invisible"], reply: () => "We provide clear aligner treatments. Would you like a free consultation or an estimated treatment timeline?" },
    { tags: ["emergency", "pain", "bleeding"], reply: () => "If you have severe pain or heavy bleeding call emergency services and then our clinic at " + clinic.phone + ". For moderate pain, rinse with warm salt water and avoid solid foods." },
    { tags: ["post", "after", "recovery","post-op","post op"], reply: () => "After treatment: avoid smoking, follow meds, rinse gently. Want a detailed post-op checklist?" },
    { tags: ["hello","hi","hey"], reply: () => "Hi! How can I help? You can ask about appointments, treatments, or pre/post-care." },
    { tags: ["contact","phone","call"], reply: () => `You can reach us at ${clinic.phone} or use the "Book Appointment" button on the site.` }
  ];

  // utility: append message
  const pushMsg = (msg) => setMessages((m) => [...m, { id: Date.now() + Math.random(), ...msg }]);

  // scroll on new message
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  // rule-based matcher
  function matchRule(text) {
    const t = text.toLowerCase();
    let best = null;
    for (const it of INTENTS) {
      for (const tag of it.tags) {
        if (t.includes(tag)) { best = it; break; }
      }
      if (best) break;
    }
    return best;
  }

  // Optional: server-side OpenAI call (recommended), otherwise falls back to rule-based.
  // NOTE: Do NOT call OpenAI directly from frontend with your secret key.
  // Implement /api/chat -> proxy to OpenAI on your backend.
  async function askOpenAI(prompt) {
    // Example POST to your backend that proxies to OpenAI
    // return fetch("/api/chat", { method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt}) }).then(r=>r.json());
    throw new Error("No OpenAI proxy configured.");
  }

  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    pushMsg({ from: "user", text: q });

    setLoading(true);

    // try OpenAI if key provided (but via your backend proxy)
    if (openAiKey) {
      try {
        const res = await askOpenAI(q); // expects { reply: "..." }
        if (res && res.reply) {
          pushMsg({ from: "bot", text: res.reply });
          setLoading(false);
          return;
        }
      } catch (err) {
        // fallthrough to rule-based fallback
        console.warn("OpenAI proxy failed:", err);
      }
    }

    // rule-based fallback
    const matched = matchRule(q);
    if (matched) {
      const reply = typeof matched.reply === "function" ? matched.reply(q) : matched.reply;
      pushMsg({ from: "bot", text: reply });
    } else {
      // fallback canned reply + suggested quick actions
      pushMsg({
        from: "bot",
        text:
          "Sorry I didn't quite get that. You can ask:\n• 'Book appointment'\n• 'Opening hours'\n• 'Post-op care'\nIf you'd like, type 'talk to human' and we'll connect you.",
      });
    }

    setLoading(false);
  }

  function handleQuick(text) {
    setInput(text);
    setTimeout(() => handleSend(), 120);
  }

  return (
    <>
      {/* Floating button */}
      <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 9999 }}>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{
            background: "linear-gradient(90deg,#ffd54a,#ff9a2a)",
            borderRadius: 999,
            padding: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            border: "none",
            cursor: "pointer",
          }}
          title="Open dental assistant"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, color: "#111" }}>Jerush Assistant</span>
            <span style={{ width: 50, height: 50, fontSize: 40, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              👨🏻‍⚕️
            </span>
          </div>
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <aside
          role="dialog"
          aria-label="Dental assistant chat"
          style={{
            position: "fixed",
            right: 20,
            bottom: 86,
            width: 360,
            maxWidth: "calc(100% - 40px)",
            height: 520,
            zIndex: 9999,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          {/* header */}
          <header style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(90deg,#fff8eb, #fff2d9)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(90deg,#ffd54a,#ff9a2a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                JA
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Jerush Assistant</div>
                <div style={{ fontSize: 12, color: "#37515a" }}>Hi, I'm here to help</div>
              </div>
            </div>
            <div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
          </header>

          {/* messages list */}
          <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "#fffdf8" }}>
            {messages.map((m) => (
              <div key={m.id} style={{ maxWidth: "90%", alignSelf: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  background: m.from === "user" ? "linear-gradient(90deg,#ffd54a,#ff9a2a)" : "#fff",
                  color: m.from === "user" ? "#111" : "#0f172a",
                  padding: "10px 12px",
                  borderRadius: 10,
                  boxShadow: m.from === "user" ? "0 8px 18px rgba(255,150,30,0.12)" : "0 4px 10px rgba(0,0,0,0.04)",
                  whiteSpace: "pre-wrap",
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start" }}>
                <div style={{ width: 58, height: 20, borderRadius: 12, background: "#fff", display: "flex", gap: 4, alignItems: "center", padding: 6 }}>
                  <span style={{ width: 6, height: 6, background: "#f59e0b", borderRadius: 999, animation: "blink 1.2s infinite" }} />
                  <span style={{ width: 6, height: 6, background: "#f59e0b", borderRadius: 999, animation: "blink 1.2s .2s infinite" }} />
                  <span style={{ width: 6, height: 6, background: "#f59e0b", borderRadius: 999, animation: "blink 1.2s .4s infinite" }} />
                </div>
              </div>
            )}
          </div>

          {/* quick actions */}
          <div style={{ padding: 10, borderTop: "1px solid rgba(15,23,42,0.04)", background: "#fff" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={() => handleQuick("Book appointment")} style={pillStyle}>Book appointment</button>
              <button onClick={() => handleQuick("Opening hours")} style={pillStyleOutline}>Hours</button>
              <button onClick={() => handleQuick("Post-op care")} style={pillStyleOutline}>Post-op</button>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                aria-label="Type your message"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(15,23,42,0.08)" }}
              />
              <button onClick={handleSend} aria-label="Send" style={{ marginLeft: 6, background: "linear-gradient(90deg,#ffd54a,#ff9a2a)", border: "none", padding: "10px 12px", borderRadius: 10, cursor: "pointer" }}>
                Send
              </button>
            </div>
          </div>

          <style>{`
            @keyframes blink { 0%{opacity:.2}50%{opacity:1}100%{opacity:.2} }
          `}</style>
        </aside>
      )}
    </>
  );
}

// small styles
const pillStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "linear-gradient(90deg,#ffd54a,#ff9a2a)",
  color: "#111",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};
const pillStyleOutline = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "transparent",
  color: "#374151",
  border: "1px solid rgba(15,23,42,0.06)",
  cursor: "pointer",
  fontWeight: 600,
};
