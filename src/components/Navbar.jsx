import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAlignersOpen, setMobileAlignersOpen] = useState(false);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);
  const [mobileOutletsOpen, setMobileOutletsOpen] = useState(false);

  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMobileNavClick = () => {
    setMobileOpen(false);
    setMobileAlignersOpen(false);
    setMobileStoryOpen(false);
    setMobileOutletsOpen(false);
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/images/logo-black.png" alt="Jerushaligne" />
          </Link>

          <nav className="nav-menu">
            <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/">Home</Link>

            <div className="dropdown">
              <button className="nav-link dropdown-trigger">
                Jerushaligne Story
                <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-content">
                <Link to="/story-of-jerushaligne" className={isActive("/story-of-jerushaligne") ? "active" : ""}>
                  <span className="dropdown-label">Story of Jerushaligne</span>
                </Link>
                <Link to="/gallery-events" className={isActive("/gallery-events") ? "active" : ""}>
                  <span className="dropdown-label">Gallery Events</span>
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="nav-link dropdown-trigger">
                Aligners
                <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-content">
                <Link to="/clear-aligners" className={isActive("/clear-aligners") ? "active" : ""}>
                  <span className="dropdown-label">Clear Aligners</span>
                  <span className="dropdown-desc">Invisible teeth straightening</span>
                </Link>
                <Link to="/retainers" className={isActive("/retainers") ? "active" : ""}>
                  <span className="dropdown-label">Retainers</span>
                  <span className="dropdown-desc">Maintain your perfect smile</span>
                </Link>
              </div>
            </div>

            <Link className={`nav-link ${isActive("/why-jerushaligne-is-different") ? "active" : ""}`} to="/why-jerushaligne-is-different">Why Jerushaligne</Link>

            <div className="dropdown">
              <button className="nav-link dropdown-trigger">
                Our Outlets
                <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-content">
                <Link to="/outlets/kanyakumari-outlet" className={isActive("/outlets/kanyakumari-outlet") ? "active" : ""}>
                  <span className="dropdown-label">Kanyakumari</span>
                  <span className="dropdown-desc">Main location</span>
                </Link>
                <Link to="/outlets/trichy-outlet" className={isActive("/outlets/trichy-outlet") ? "active" : ""}>
                  <span className="dropdown-label">Trichy</span>
                  <span className="dropdown-desc">Central Tamil Nadu</span>
                </Link>
                <Link to="/outlets/chennai-outlet" className={isActive("/outlets/chennai-outlet") ? "active" : ""}>
                  <span className="dropdown-label">Chennai</span>
                  <span className="dropdown-desc">Metropolitan clinic</span>
                </Link>
              </div>
            </div>

            <Link className={`nav-link ${isActive("/blog") ? "active" : ""}`} to="/blog">Blog</Link>
            <Link className={`nav-link ${isActive("/contact-us") ? "active" : ""}`} to="/contact-us">Contact</Link>
          </nav>

          <Link to="/book-appointment" className="btn-primary desktop-only">Book Appointment</Link>

          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ===== OVERLAY ===== */}
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

      {/* ===== CLOSE BUTTON ===== */}
      <button
        type="button"
        className="close-btn"
        onClick={() => setMobileOpen(false)}
        aria-label="Close menu"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="2" x2="14" y2="14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="14" y1="2" x2="2" y2="14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ===== MOBILE DRAWER ===== */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>

        <div className="mobile-header">
          <img src="/images/logo-black.png" alt="Jerushaligne" />
        </div>

        <nav className="mobile-nav">
          <Link className={isActive("/") ? "active" : ""} to="/" onClick={handleMobileNavClick}>Home</Link>

          {/* ── Jerushaligne Story ── */}
          <div className="mobile-accordion">
            <button
              className={`accordion-trigger ${mobileStoryOpen ? "open" : ""}`}
              onClick={() => setMobileStoryOpen(!mobileStoryOpen)}
            >
              <span>Jerushaligne Story</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 16 16"
                style={{ transform: mobileStoryOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* ✅ FIXED: was mobileAlignersOpen, now correctly mobileStoryOpen */}
            <div className={`accordion-content ${mobileStoryOpen ? "open" : ""}`}>
              <Link to="/story-of-jerushaligne" className={isActive("/story-of-jerushaligne") ? "active" : ""} onClick={handleMobileNavClick}>
                Story of Jerushaligne
              </Link>
              <Link to="/gallery-events" className={isActive("/gallery-events") ? "active" : ""} onClick={handleMobileNavClick}>
                Gallery Events
              </Link>
            </div>
          </div>

          {/* ── Aligners ── */}
          <div className="mobile-accordion">
            <button
              className={`accordion-trigger ${mobileAlignersOpen ? "open" : ""}`}
              onClick={() => setMobileAlignersOpen(!mobileAlignersOpen)}
            >
              <span>Aligners</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 16 16"
                style={{ transform: mobileAlignersOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`accordion-content ${mobileAlignersOpen ? "open" : ""}`}>
              <Link to="/clear-aligners" className={isActive("/clear-aligners") ? "active" : ""} onClick={handleMobileNavClick}>
                Clear Aligners
              </Link>
              <Link to="/retainers" className={isActive("/retainers") ? "active" : ""} onClick={handleMobileNavClick}>
                Retainers
              </Link>
            </div>
          </div>

          <Link to="/why-jerushaligne-is-different" className={isActive("/why-jerushaligne-is-different") ? "active" : ""} onClick={handleMobileNavClick}>
            Why Jerushaligne
          </Link>

          {/* ── Our Outlets ── */}
          <div className="mobile-accordion">
            <button
              className={`accordion-trigger ${mobileOutletsOpen ? "open" : ""}`}
              onClick={() => setMobileOutletsOpen(!mobileOutletsOpen)}
            >
              <span>Our Outlets</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 16 16"
                style={{ transform: mobileOutletsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`accordion-content ${mobileOutletsOpen ? "open" : ""}`}>
              <Link to="/outlets/kanyakumari-outlet" className={isActive("/outlets/kanyakumari-outlet") ? "active" : ""} onClick={handleMobileNavClick}>
                Kanyakumari
              </Link>
              <Link to="/outlets/trichy-outlet" className={isActive("/outlets/trichy-outlet") ? "active" : ""} onClick={handleMobileNavClick}>
                Trichy
              </Link>
              <Link to="/outlets/chennai-outlet" className={isActive("/outlets/chennai-outlet") ? "active" : ""} onClick={handleMobileNavClick}>
                Chennai
              </Link>
            </div>
          </div>

          <Link to="/blog" className={isActive("/blog") ? "active" : ""} onClick={handleMobileNavClick}>Blog</Link>
          <Link to="/contact-us" className={isActive("/contact-us") ? "active" : ""} onClick={handleMobileNavClick}>Contact Us</Link>
        </nav>

        <div className="mobile-cta">
          <Link to="/contact-us" className="btn-primary" onClick={handleMobileNavClick}>Book Appointment</Link>
          <a href="tel:+919489160055" className="btn-secondary">Call Now</a>
        </div>

      </aside>
    </>
  );
}