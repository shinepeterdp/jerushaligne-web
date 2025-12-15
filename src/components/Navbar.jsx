// NavBar.jsx
import React, { useState, useRef, useEffect } from "react";


const DEFAULT_QUICK_LINKS = {
  title: "Quick Links",
  items: [
    { title: "Emergency — 1066", href: "#" },
    { title: "Jerush Lifeline International — +91 4043441066", href: "#" },
    { title: "Health Help Line — 1860-500-1066", href: "#" },
    { title: "Book Appointment", href: "#", cta: true },
  ],
};


const MENU = [
  {
    id: "discover",
    label: "Discover Jerush",
    columns: [
      {
        title: "Overview",
        items: [
          { title: "About", href: "/about" },
          { title: "Vision & Mission", href: "#" },
          { title: "Jerush Anthem", href: "#" },
          { title: "Leadership", href: "#" },
        ],
      },
      {
        title: "More",
        items: [
          { title: "Our Group Brands", href: "#" },
          { title: "Awards & Accolades", href: "#" },
          { title: "Alliances", href: "#" },
          { title: "Careers", href: "#" },
        ],
      },
    ],
    quickLinks: DEFAULT_QUICK_LINKS,
  },
  {
    id: "find",
    label: "Find Hospital",
    columns: [
      { title: "By City", items: [{ title: "Chennai", href: "#" }, { title: "Bengaluru", href: "#" }] },
      { title: "By State", items: [{ title: "Tamil Nadu", href: "#" }, { title: "Kerala", href: "#" }] },
    ],
  },
  {
    id: "services",
    label: "Medical Services",
    columns: [
      { title: "Specialities", items: [{ title: "Cardiac", href: "#" }, { title: "Neurosciences", href: "#" }] },
      { title: "Programs", items: [{ title: "Cancer Care", href: "#" }, { title: "Transplants", href: "#" }] },
      { title: "Programs", items: [{ title: "Cancer Care", href: "#" }, { title: "Transplants", href: "#" }] },
      

    ],
  },

];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  useEffect(() => {
    const onDoc = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) setOpenMega(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); setOpenMega(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = (delay = 200) => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setOpenMega(null), delay);
  };
  const cancelScheduledClose = () => clearTimeout(closeTimeoutRef.current);

  // pastel background classes (light)
  const pastel = [
    "bg-yellow-50 border-yellow-100",
    "bg-blue-50 border-blue-100",
    "bg-rose-50 border-rose-100",
    "bg-emerald-50 border-emerald-100",
  ];

  // render a quick link card (label/value split if ' — ' present)
  const QuickCard = ({ ql, idx }) => {
    const bg = pastel[idx % pastel.length];
    if (ql.cta) {
      return (
        <div className="mt-2">
          <a
            href={ql.href}
            className="inline-block w-full text-center px-4 py-2 rounded-md shadow-sm font-semibold"
            style={{
              background: "linear-gradient(90deg,#ffd54a,#ff9a2a)",
              color: "#0f172a",
            }}
          >
            {ql.title}
          </a>
        </div>
      );
    }

    const parts = ql.title.split("—").map(p => p && p.trim());
    const hasSplit = parts.length >= 2;
    return (
      <div className={`p-3 rounded-md border ${bg} shadow-sm`}>
        {hasSplit ? (
          <>
            <div className="text-xs text-gray-500 mb-2">{parts[0]}</div>
            <div className="text-sm font-semibold text-gray-800">{parts.slice(1).join(" — ")}</div>
          </>
        ) : (
          <div className="text-sm text-gray-800">{ql.title}</div>
        )}
      </div>
    );
  };

  return (
    <header ref={navRef} className="w-full z-40 bg-white border-b border-gray-100 sticky top-0" style={{ fontFamily: "Figtree,ui-sans-serif,system-ui" }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(8px)} to {opacity:1; transform:none} }
        .mega-panel-anim { animation: fadeInUp 260ms cubic-bezier(.2,.9,.2,1) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              {/* LOGO IMAGE */}
              <img
                src="images/jerushalign-logo.png"   // <-- update your logo path
                alt="Jerushaligne Logo"
                className="w-40 h-10 object-contain rounded-md"
              />
            </a>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:gap-6">
            {MENU.map((m) => (
              <div key={m.id}
                className="relative"
                onMouseEnter={() => { cancelScheduledClose(); setOpenMega(m.columns ? m.id : null); }}
                onMouseLeave={() => scheduleClose(180)}
              >
                <button
                  onClick={() => setOpenMega(prev => (prev === m.id ? null : m.id))}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-900 hover:bg-teal-50 transition"
                >
                  {m.label}
                  {m.columns && <svg className="inline-block ml-2 w-3 h-3 -mt-0.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>}
                </button>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 mr-1">
              <a href="#contact" className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border-gray-200 text-sm font-semibold hover:shadow-sm">Book Appointment</a>
            </div>

            <a href="tel:1066" className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-black shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12.98.37 1.94.73 2.84a2 2 0 0 1-.45 2.11L9.91 10.91a13 13 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.9.36 1.86.61 2.84.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <button onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200" aria-label="Open menu">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Mega panel container — centered to header */}
        <div className="absolute left-0 right-0 top-full pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {MENU.map((m) => {
                const quick = m.quickLinks || DEFAULT_QUICK_LINKS;
                return m.columns && openMega === m.id ? (
                  <div key={m.id} className="pointer-events-auto mt-3 w-full" style={{ marginTop: "-8px" }}>
                    <div
                      className="mx-auto bg-white border border-gray-100 rounded-xl shadow-lg p-6 flex gap-6 mega-panel-anim z-50"
                      style={{ maxWidth: "1100px" }}
                      role="region"
                      aria-label={`${m.label} menu`}
                      onMouseEnter={() => { cancelScheduledClose(); setOpenMega(m.id); }}
                      onMouseLeave={() => scheduleClose(180)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        {m.columns.map((col, ci) => (
                          <div key={ci}>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">{col.title}</h4>
                            <ul className="space-y-2">
                              {col.items.map((it, ii) => (
                                <li key={ii}><a href={it.href} className="text-gray-700 hover:text-teal-900 block text-sm">{it.title}</a></li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Quick links as pastel cards */}
                      <aside className="w-56 flex-shrink-0 border-l pl-4">
                        <h5 className="text-sm font-semibold text-gray-800 mb-3">{quick.title}</h5>
                        <div className="space-y-3">
                          {quick.items.map((ql, qlIdx) => (
                            <div key={qlIdx}>
                              {/* CTA gradient button handled inside QuickCard */}
                              <QuickCard ql={ql} idx={qlIdx} />
                            </div>
                          ))}
                        </div>
                      </aside>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && <MobileDrawer onClose={() => setOpen(false)} menu={MENU} pastel={pastel} />}
    </header>
  );
}

/* Mobile Drawer component (with same pastel quick links & gradient CTA) */
function MobileDrawer({ onClose, menu }) {
  const drawerRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const pastel = [
    "bg-yellow-50 border-yellow-100",
    "bg-blue-50 border-blue-100",
    "bg-rose-50 border-rose-100",
    "bg-emerald-50 border-emerald-100",
  ];

  useEffect(() => {
    drawerRef.current?.focus?.();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const QuickCardMobile = ({ ql, idx }) => {
    const bg = pastel[idx % pastel.length];
    if (ql.cta) {
      return (
        <div className="mt-3">
          <a href={ql.href} className="block w-full text-center px-4 py-2 rounded-md font-semibold" style={{ background: "linear-gradient(90deg,#ffd54a,#ff9a2a)", color: "#0f172a" }}>
            {ql.title}
          </a>
        </div>
      );
    }
    const parts = ql.title.split("—").map(p => p && p.trim());
    const hasSplit = parts.length >= 2;
    return (
      <div className={`p-3 rounded-md border ${bg} shadow-sm`}>
        {hasSplit ? (
          <>
            <div className="text-xs text-gray-500 mb-2">{parts[0]}</div>
            <div className="text-sm font-semibold text-gray-800">{parts.slice(1).join(" — ")}</div>
          </>
        ) : <div className="text-sm text-gray-800">{ql.title}</div>}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <aside ref={drawerRef} tabIndex={-1} className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl overflow-auto" aria-label="Mobile menu">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              {/* LOGO IMAGE */}
              <img
                src="images/jerushalign-logo.png"   // logo path
                alt="Jerushaligne Logo"
                className="w-40 h-10 object-contain rounded-md"
              />
            </a>
          </div>
          <button onClick={onClose} className="p-2 rounded-md border">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((m) => (
            <div key={m.id} className="border-b pb-2">
              <button onClick={() => setExpanded(prev => (prev === m.id ? null : m.id))} className="w-full text-left flex items-center justify-between py-3">
                <span className="text-base font-medium text-gray-800">{m.label}</span>
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              </button>

              {expanded === m.id && (
                <div className="pl-3 pb-3">
                  {m.columns ? m.columns.map((col, ci) => (
                    <div key={ci} className="mb-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">{col.title}</div>
                      <ul className="space-y-1">
                        {col.items.map((it, ii) => <li key={ii}><a href={it.href} className="text-gray-700 block py-1">{it.title}</a></li>)}
                      </ul>
                    </div>
                  )) : <a href={m.href || "#"} className="text-gray-700 block py-2">{m.label}</a>}

                  {/* quick links fallback */}
                  <div className="mt-2">
                    <div className="text-sm font-semibold mb-2">{(m.quickLinks || DEFAULT_QUICK_LINKS).title}</div>
                    {(m.quickLinks || DEFAULT_QUICK_LINKS).items.map((ql, i) => <QuickCardMobile key={i} ql={ql} idx={i} />)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t">
          <a href="#book" className="block text-center w-full py-2 rounded-md" style={{ background: "linear-gradient(90deg,#ffd54a,#ff9a2a)", color: "#0f172a", fontWeight: 600 }}>Book Appointment</a>
        </div>
      </aside>
    </div>
  );
}
