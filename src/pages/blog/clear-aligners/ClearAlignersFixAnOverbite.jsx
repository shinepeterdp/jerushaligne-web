import { useState, useEffect, useRef } from "react";
import "../../../styles/BlogPage.css";

const sections = [
  { id: "introduction",      label: "How do Clear Aligners Fix?" },
  { id: "causes",            label: "Cause of an Overbite" },
  { id: "technology",        label: "Technology" },
  { id: "types",              label: "Types of Clear Aligner System" },
  { id: "comparison",        label: "Aligner vs Braces" },
  { id: "guidelines",        label: "Guidelines to Use Aligners" },
  { id: "faq",               label: "FAQs" },
];

const faqs = [
  { q: "1️⃣ Can clear aligners fix an overbite?", a: "Yes, clear aligners can correct mild to moderate overbites by gradually moving teeth into proper alignment." },
  { q: "2️⃣ How long does overbite treatment with aligners take?", a: "Mild cases may take 6–12 months, while moderate cases can take 12–18 months." },
  { q: "3️⃣ Are aligners better than braces for overbite?", a: "Aligners are more discreet and comfortable, but severe cases may still require braces." },
  { q: "4️⃣ What causes an overbite?", a: "Genetics, childhood habits, crowded teeth or jaw growth differences can cause an overbite." },
  { q: "5️⃣ Do aligners need attachments for overbite correction?", a: "In some cases, attachments or elastics are used to improve precision and bite correction.." },
];

const relatedArticles = [
  { tag: "Oral Care", date: "Oct 4, 2020",  title: "Types of Braces: Removable vs Fixed — Which is Right For You?", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80" },
  { tag: "Oral Care", date: "Oct 16, 2023", title: "Smile Bright: Everything About Modern Teeth Whitening Kits",      img: "https://images.unsplash.com/photo-1588776814546-1ffbb3f5e39c?w=400&q=80" },
  { tag: "Oral Care", date: "Feb 13, 2025", title: "Pioneer in Lingual Orthodontics & Innovative Smile Solutions",    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80" },
];

const comparisonRows = [
  { feature: "Visibility",         aligners: "Nearly invisible",         braces: "Noticeable metal brackets", win: true  },
  { feature: "Comfort",            aligners: "Smooth plastic, no wires", braces: "Wires can irritate gums",   win: true  },
  { feature: "Removable",          aligners: "Yes — eat anything",       braces: "Fixed 24/7",                win: true  },
  { feature: "Cleaning",           aligners: "Remove & brush easily",    braces: "Tricky around brackets",    win: true  },
  { feature: "Treatment Time",     aligners: "6 – 18 months",            braces: "18 – 36 months",            win: true  },
  { feature: "Check-up Frequency", aligners: "Every 6–8 weeks",          braces: "Every 4–6 weeks",           win: false },
  { feature: "Severe Cases",       aligners: "Limited effectiveness",    braces: "Handles complex cases",     win: false },
  { feature: "Cost",               aligners: "Moderate to high",         braces: "Moderate",                  win: false },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{faq.q}</span>
        <div className="faq-icon">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
      {open && <div className="faq-answer">{faq.a}</div>}
    </div>
  );
}

export default function BlogPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [readProgress, setReadProgress]   = useState(0);
  const [tocOpen, setTocOpen]             = useState(false);
  // ── ADDED: copy link state ──
  const [copied, setCopied]               = useState(false);
  const contentRef = useRef(null);
  const clickLock = useRef(false);

  // ── ADDED: copy link handler ──
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.body.scrollHeight - window.innerHeight;
      setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-5% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id) => {
    setActiveSection(id);
    clickLock.current = true;
    setTimeout(() => { clickLock.current = false; }, 1400);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <div className="blog-root" ref={contentRef}>
      <div className="read-progress" style={{ width: `${readProgress}%` }} />

      <div className="blog-hero">
        <div className="blog-hero-inner">
          <div className="blog-breadcrumb">
            <a href="blog">Blog</a><span>/</span>
            <a href="#">Clear Aligners</a><span>/</span>
            <span>Clear Aligners 01</span>
          </div>
          <div className="blog-tag">Clear Aligners</div>
          <h1 className="blog-hero-title">
            Clear Aligners 01: How do Clear Aligners Fix an Overbite?
          </h1>
          <div className="blog-hero-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Jan 15, 2026
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              8 min read
            </span>
            <span className="blog-author-chip">
              <img src="/images/doctors/author-img1.webp" alt="Dr. Bladbin" className="blog-author-avatar"
                onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Dr+Bladbin&background=f59e0b&color=1a1207&rounded=true&size=48"; }}
              />
              <span className="blog-author-info">
                <span className="blog-author-label">Reviewed by</span>
                <span className="blog-author-name">Dr. Bladbin</span>
              </span>
            </span>
          </div>
          <div className="blog-hero-img">
            <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=85" alt="Clear dental aligners for overbite treatment"/>
            <div className="blog-hero-img-overlay" />
          </div>
        </div>
      </div>

      <div className="blog-layout">

        <aside className="blog-sidebar">
          <div className="toc-card">
            <div className="toc-header">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Table of Contents
            </div>
            <nav className="toc-nav" aria-label="Article sections">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`toc-link ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="portrait-banner">
            <div className="portrait-banner-img-wrap">
              <img
                src="/images/doctors/dr-bladbin.webp"
                alt="Dr. Sarah Johnson — Senior Orthodontist"
                className="portrait-banner-img"
              />
              <div className="portrait-banner-badge">⭐ 4.9</div>
            </div>
            <div className="portrait-banner-body">
              <p className="portrait-banner-tag">Meet Our Expert</p>
              <p className="portrait-banner-name">Dr. Bladbin</p>
              <p className="portrait-banner-role">Chairman, Jerush Groups,<br/>20+ years of experience</p>
              <div className="portrait-banner-divider" />
              <div className="portrait-banner-stats">
                <div className="portrait-stat">
                  <span className="portrait-stat-num">2L+</span>
                  <span className="portrait-stat-label">Patients Treated</span>
                </div>
                <div className="portrait-stat">
                  <span className="portrait-stat-num">20+ Yrs</span>
                  <span className="portrait-stat-label">Experience</span>
                </div>
              </div>
              <p className="portrait-banner-quote">
                "Every smile is unique — we craft treatment plans as individual as you are."
              </p>
              <a href="/book-appointment" className="portrait-banner-btn">
                Book a Consultation →
              </a>
            </div>
          </div>

          {/* ── SHARE — only this block changed: icon buttons ── */}
          <div className="share-card">
            <p className="share-label">Share this article</p>
            <div className="share-btns">
              <button className="share-btn share-btn--x">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/></svg>
                Twitter / X
              </button>
              <button className="share-btn share-btn--fb">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button className="share-btn share-btn--li">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
              <button className="share-btn share-btn--wa">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
              </button>
              {/* ── ADDED: onClick + dynamic label on copy button ── */}
              <button className="share-btn share-btn--copy" onClick={handleCopy}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          <div className="sidebar-cta">
            <p>✨ Ready for your perfect smile?</p>
            <a href="#" className="sidebar-cta-btn">Book a Free Scan</a>
          </div>
        </aside>

        <main className="blog-content">

          <button className="mobile-toc-toggle" onClick={() => setTocOpen(!tocOpen)}>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Table of Contents
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <path d={tocOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {tocOpen && (
            <div className="mobile-toc">
              {sections.map((s) => (
                <button key={s.id} className={`toc-link ${activeSection === s.id ? "active" : ""}`} onClick={() => scrollTo(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <section id="introduction" className="blog-section">
            <p className="blog-lead">
              Most patients are interested in knowing whether clear aligners fix an overbite and whether they are a valid substitute for metal braces.
              An overbite happens when the upper teeth cross over the lower teeth too many times, affecting oral health and smile aesthetics. Clear aligners —
              metal-free, made-to-fit transparent trays — gently shift teeth into position and can correct most mild to moderate overbite cases.
            </p>
            <div className="callout callout--amber">
              <div className="callout-icon">💡</div>
              <div>Many people don't even realize they have an overbite until a dentist points it out. 
                It just looks like the upper teeth are covering the lower teeth a bit too much. Sometimes it's mild, 
                sometimes it's deeper and affects the way you bite or even how your jaw feels.</div>
            </div>
          </section>

          <section id="causes" className="blog-section">
            <h2 className="blog-h2">What is the Cause of an Overbite?</h2>
            <div className="blog-img-block">
              <img src="/images/blog/thumb-sucking.webp" alt="baby sucking thumb"/>
            </div>
            <p>It is useful to learn about the causes of having an overbite before discussing the ways in which aligners can be used to correct the problem. 
              This condition can be caused by a number of factors.</p>
            <div className="numbered-list">
              {[
                { title: "Genetics",                       desc: "Tooth alignment and shape of the jaw tend to be familial. Certain individuals have certain innate jaw constructions that make them bite deeper." },
                { title: "Childhood Habits",               desc: "Childhood habits of thumb sucking, use of pacifiers over an extended period, or tongue thrusting can cause the teeth to be pushed forward and affect the shape of the bite." },
                { title: "Missing or Crowded Teeth",       desc: "In case of crowded or missing teeth the bite can deviate and give too much overlap." },
                { title: "Jaw Development Differences",    desc: "In other cases, the upper jaw can develop at a different rate than the lower jaw giving it a more profound bite.  The concept of the underlying cause assists orthodontists in creating a more accurate aligner treatment plan." },
              ].map((item, i) => (
                <div key={i} className="numbered-item">
                  <div className="numbered-badge">{i + 1}</div>
                  <div><strong>{item.title}</strong><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="technology" className="blog-section">
            <h2 className="blog-h2">The Technology Behind Clear Aligner Tooth Movement</h2>
            <div className="blog-img-block">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80" alt="Orthodontist using 3D dental scanning technology"/>
            </div>
            <p>Clear aligners are based on forceful, slow force that helps in moving teeth into a more favorable position. 
              The aligner trays are individually customized based on digital images of the mouth of a patient. The following is the way the process usually works:</p>
            <div className="numbered-list">
              {[
                "With the help of 3D imaging technology, a dentist or an orthodontist scans the teeth.",
                "An electronic treatment plan shows every step of the movement of teeth.",
                "A set of aligners is produced such that each tray is slightly varied from the one before it.",
                "The patient also changes to another aligner after every 2 weeks, as the teeth slowly change.",
              ].map((desc, i) => (
                <div key={i} className="numbered-item">
                  <div className="numbered-badge">{i + 1}</div>
                  <div><p style={{margin:0}}>{desc}</p></div>
                </div>
              ))}
            </div>
            <p>This controlled movement over time is useful in correcting the size and placement of the teeth besides the bite.</p>
          </section>

          <section id="types" className="blog-section">
            <h2 className="blog-h2">Different Types of Clear Aligner for Overbite</h2>
            <div className="blog-img-block">
              <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80" alt="Different types of dental retainers"/>
            </div>
            <p>Clear aligners systems are a number of treatments aimed to correct various alignment problems that are offered by modern orthodontics.</p>
            {[
              { icon: "🦷", title: "Aligners that are Directed by Dentists",        color: "amber",
                desc: "Comfortable, discreet and easy to wear — ideal for everyday life.",
                bullets: ["Dentist-Supervised Clear Aligner Treatment", "Personalized 3D Digital Smile Planning", "Certified Orthodontic Monitoring"] },
              { icon: "🔗", title: "Advanced Digital Aligners",  color: "blue",
                desc: "A thin wire bonded behind your front teeth. Always working, zero effort needed.",
                bullets: ["More Accurate & Predictable Tooth Movement", "Reduced Treatment Time with Smart Planning", "Custom-Fit Aligners for Better Comfort"] },
              { icon: "⚙️", title: "Combination Orthodontic Techniques", color: "green",
                desc: "In some situations of overbite, aligners can be used along with other instruments, including",
                bullets: ["Attachments on Teeth", "Elastic Bands", "Retainers after Treatment"] },
            ].map((type) => (
              <div key={type.title} className={`type-card type-card--${type.color}`}>
                <div className="type-card-icon">{type.icon}</div>
                <div className="type-card-body">
                  <h3 className="type-card-title">{type.title}</h3>
                  <p className="type-card-desc">{type.desc}</p>
                  <ul className="type-card-list">
                    {type.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section id="comparison" className="blog-section">
            <h2 className="blog-h2">Compare Clear Aligners and Braces for Treating Overbite</h2>
            <p>Choosing between aligners and braces depends on your lifestyle, budget, and case complexity. Here's an honest side-by-side breakdown:</p>
            <div className="comp-hero">
              <div className="comp-side comp-side--left">
                <span className="comp-side-emoji">😁</span>
                <p className="comp-side-label">Best for</p>
                <p className="comp-side-title">Lifestyle &amp;<br/>Aesthetics</p>
                <span className="comp-side-pill">Clear Aligners</span>
              </div>
              <div className="comp-divider">
                <div className="comp-vs-badge">VS</div>
              </div>
              <div className="comp-side comp-side--right">
                <span className="comp-side-emoji">🦾</span>
                <p className="comp-side-label">For</p>
                <p className="comp-side-title">Complex<br/>Cases</p>
                <span className="comp-side-pill">Braces</span>
              </div>
            </div>
            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr className="comp-thead-row">
                    <th className="comp-th comp-th--feature"><div className="comp-th-inner">Feature</div></th>
                    <th className="comp-th comp-th--aligners"><div className="comp-th-inner"><span className="comp-th-dot" />😁 Clear Aligners</div></th>
                    <th className="comp-th comp-th--braces"><div className="comp-th-inner"><span className="comp-th-dot" />🦾 Traditional Braces</div></th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`comp-tr ${i % 2 === 0 ? "comp-tr--even" : ""}`}>
                      <td className="comp-td comp-td--feature">{row.feature}</td>
                      <td className="comp-td comp-td--aligners">
                        {row.win
                          ? <span className="comp-win"><span className="comp-win-dot"/><span className="comp-win-text">{row.aligners}</span></span>
                          : <span className="comp-neutral">{row.aligners}</span>}
                      </td>
                      <td className="comp-td comp-td--braces">
                        {!row.win
                          ? <span className="comp-win"><span className="comp-win-dot" style={{background:"#3b82f6"}}/><span className="comp-win-text">{row.braces}</span></span>
                          : <span className="comp-neutral">{row.braces}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="callout callout--amber" style={{marginTop:"24px"}}>
              <div className="callout-icon">💡</div>
              <div><strong>Not sure which is right for you?</strong> Our specialists will assess your bite, jaw structure and lifestyle — book a scan today.</div>
            </div>
          </section>

          <section id="guidelines" className="blog-section">
            <h2 className="blog-h2">Guidelines to Successful Use of Aligners to Treat Overbites</h2>
            <p className="blog-lead">Your teeth might look perfectly aligned after treatment, but without a retainer they can slowly shift back — often without you even noticing.</p>
            <div className="callout callout--red">
              <div className="callout-icon">⚠️</div>
              <div>
                <strong>What cases do you see an orthodontist?</strong>
                <p>You might need to consult the professional in case of one or more of the following symptoms:</p>
                <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                  <li>Evident front teeth overlap.</li>
                  <li>Jaw discomfort or clicking</li>
                  <li>Uneven tooth wear</li>
                  <li>Problem with biting or chewing.</li>
                  <li>Concerns about smile appearance</li>
                </ul>
              </div>
            </div>
            <div className="cta-banner">
              <div className="cta-banner-text">
                <h3>Start Your Smile Journey Today</h3>
                <p>Get a free consultation and find the perfect retainer for you.</p>
              </div>
              <a href="#" className="cta-banner-btn">Book Free Scan →</a>
            </div>
          </section>

          <section id="faq" className="blog-section">
            <h2 className="blog-h2">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
            </div>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">Related Articles</h2>
            <div className="related-grid">
              {relatedArticles.map((a) => (
                <a href="/bloglist" key={a.title} className="related-card">
                  <div className="related-img"><img src={a.img} alt={a.title}/></div>
                  <div className="related-body">
                    <div className="related-meta">
                      <span className="related-tag">{a.tag}</span>
                      <span className="related-date">{a.date}</span>
                    </div>
                    <h3 className="related-title">{a.title}</h3>
                    <span className="related-arrow">Read more →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}