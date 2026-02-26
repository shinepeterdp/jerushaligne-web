import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../styles/Navbartwo.css";

const JN_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Jerushaligne's History", href: "#",
    sub: [
      { label: "The Formation",     href: "/story-of-jerushaligne" },
      { label: "Gallery",   href: "/gallery-events" },
      // { label: "Meet the Team", href: "/about/team" },
    ],
  },
  {
    label: "Aligners", href: "#",
    sub: [
      { label: "Clear Aligners",  href: "/clear-aligners" },
      { label: "Aligner Reatiners", href: "/aligner-retainers" },
    ],
  },
  { label: "Why Jerushaligne", href: "/why-jerushaligne-is-different" },
  {
    label: "Our Outlets", href: "#",
    sub: [
      { label: "Kanyakumari", href: "/outlets/kanyakumari-outlet" },
      { label: "Trichy",      href: "/outlets/trichy-outlet" },
      { label: "Chennai",     href: "/outlets/chennai-outlet" },
      { label: "Dubai",       href: "#" },
      // { label: "Australia",   href: "/outlets/australia-outlet" },
    ],
  },
  { label: "Blog",    href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

/* Location call links for top strip */
const JN_LOCATIONS = [
  { city: "Kanyakumari", phone: "+91 98765 43210", href: "tel:+919876543210" },
  { city: "Trichy",      phone: "+91 98765 43211", href: "tel:+919876543211" },
  { city: "Chennai",     phone: "+91 98765 43212", href: "tel:+919876543212" },
  { city: "Dubai",       phone: "COMING SOON", href: "/" },
  // { city: "Australia",   phone: "+61 4 1234 5678",  href: "tel:+61412345678" },
];

export default function JNavbar() {
  const [jn_visible,  setJnVisible]  = useState(true);
  const [jn_scrolled, setJnScrolled] = useState(false);
  const [jn_mob,      setJnMob]      = useState(false);
  const [jn_drop,     setJnDrop]     = useState(null);
  const [jn_mobDrop,  setJnMobDrop]  = useState(null);
  const [jn_active,   setJnActive]   = useState("/");
  const jn_lastY  = useRef(0);
  const jn_navRef = useRef(null);

  /* scroll hide/show */
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setJnScrolled(y > 10);
      if (y < 60) setJnVisible(true);
      else setJnVisible(y < jn_lastY.current);
      jn_lastY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const fn = (e) => { if (!jn_navRef.current?.contains(e.target)) setJnDrop(null); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { setJnActive(window.location.pathname); }, []);

  useEffect(() => {
    document.body.style.overflow = jn_mob ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [jn_mob]);

  const jn_mobToggle = (k) => setJnMobDrop((p) => (p === k ? null : k));

  return (
    <>
      <header className={[
        "jn-header",
        jn_scrolled ? "jn-header--up" : "",
        jn_visible  ? "jn-show" : "jn-hide",
      ].join(" ")}>

        {/* ══ ROW 1 — logo + location call links + CTA ══ */}
        <div className="jn-row1">
          <div className="jn-row1-in">

            {/* Logo */}
            <a href="/" className="jn-logo">
              <img src="/images/logo/jerushaligne-logo.png" alt="Jerushaligne"
                className="jn-logo-img"
                onError={(e) => { e.target.style.display = "none"; }} />
            </a>

            {/* Location call strip */}
            <div className="jn-locations">
              {JN_LOCATIONS.map((loc) => (
                <a key={loc.city} href={loc.href} className="jn-loc-link">
                  <span className="jn-loc-dot" />
                  <span className="jn-loc-city">{loc.city}</span>
                  <span className="jn-loc-phone">{loc.phone}</span>
                </a>
              ))}
            </div>

            <div className="jn-row1-right">
              <a href="/book-appointment" className="jn-cta">Book Appointment</a>
              <button
                className={`jn-burger ${jn_mob ? "jn-burger--x" : ""}`}
                onClick={() => setJnMob((p) => !p)}
                aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>

        {/* ══ ROW 2 — nav links, pure CSS hover dropdown ══ */}
        <nav className="jn-row2" aria-label="Main navigation">
          <div className="jn-row2-in">
            {JN_LINKS.map((link) => (
              <div key={link.label} className={`jn-item${link.sub ? " jn-item--has-sub" : ""}`}>
                {link.sub ? (
                  <>
                    <button className={`jn-link jn-link--btn ${jn_active.startsWith(link.href) ? "jn-link--on" : ""}`}>
                      {link.label}
                      <svg className="jn-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <div className="jn-drop">
                      <div className="jn-drop-tip" />
                      {link.sub.map((s) => (
                        <a key={s.label} href={s.href}
                          className={`jn-drop-row ${jn_active === s.href ? "jn-drop-row--on" : ""}`}>
                          <span className="jn-drop-dot" />{s.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a href={link.href} className={`jn-link ${jn_active === link.href ? "jn-link--on" : ""}`}>
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* ══ OVERLAY + DRAWER — portal on body ══ */}
      {createPortal(
        <>
          <div className={`jn-overlay ${jn_mob ? "jn-overlay--in" : ""}`}
            onClick={() => { setJnMob(false); setJnMobDrop(null); }} />

          <div className={`jn-drawer ${jn_mob ? "jn-drawer--in" : ""}`}>

            <div className="jn-dhead">
              {/* Logo */}
            <a href="/" className="jn-logo">
              <img src="/images/logo/logo-white.png" alt="Jerushaligne"
                className="jn-logo-img"
                onError={(e) => { e.target.style.display = "none"; }} />
            </a>
              <button className="jn-dclose" onClick={() => { setJnMob(false); setJnMobDrop(null); }} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="jn-dnav">
              {JN_LINKS.map((link) => (
                <div key={link.label}>
                  {link.sub ? (
                    <>
                      <button
                        className={`jn-dlink jn-dlink--btn ${jn_active.startsWith(link.href) ? "jn-dlink--on" : ""}`}
                        onClick={() => jn_mobToggle(link.label)}>
                        {link.label}
                        <svg className={`jn-chev ${jn_mobDrop === link.label ? "jn-chev--flip" : ""}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>
                      {jn_mobDrop === link.label && (
                        <div className="jn-dsub">
                          {link.sub.map((s) => (
                            <a key={s.label} href={s.href}
                              className={`jn-dsub-link ${jn_active === s.href ? "jn-dsub-link--on" : ""}`}
                              onClick={() => { setJnMob(false); setJnMobDrop(null); }}>
                              <span className="jn-drop-dot" />{s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={link.href}
                      className={`jn-dlink ${jn_active === link.href ? "jn-dlink--on" : ""}`}
                      onClick={() => setJnMob(false)}>
                      {link.label}
                    </a>
                  )}
                  <div className="jn-dsep" />
                </div>
              ))}
            </nav>

            <div className="jn-dfoot">
              {/* Book Appointment */}
              <a href="/book-appointment" className="jn-dbtn-book" onClick={() => setJnMob(false)}>
                Book Appointment
              </a>

              {/* Location call grid */}
              <div className="jn-dloc-grid">
                {JN_LOCATIONS.map((loc) => (
                  <a key={loc.city} href={loc.href} className="jn-dloc-btn" onClick={() => setJnMob(false)}>
                    <span className="jn-dloc-dot" />
                    <div className="jn-dloc-info">
                      <span className="jn-dloc-city">{loc.city}</span>
                      <span className="jn-dloc-num">{loc.phone}</span>
                    </div>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" className="jn-dloc-icon">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 10.6 19.79 19.79 0 01.82 2a2 2 0 012-2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      , document.body)}
    </>
  );
}