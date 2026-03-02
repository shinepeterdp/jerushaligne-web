import "../styles/PageHero.css";

export default function PageHero({
  eyebrow = "BOOK APPOINTMENT",
  title = <>Book Your <br />Appointment</>,
  description = "Make Your Visit With US",
  image = "/images/comparison/girl.webp",
  imageAlt = "Jerushaligne",
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Book Appointment", href: null },
  ],
}) {
   
  return (
    <section className="ph-section">
      {/* Decorative background blobs */}
      <div className="ph-blob ph-blob--1" />
      <div className="ph-blob ph-blob--2" />

      <div className="ph-content">
        {/* ── LEFT TEXT ── */}
        <div className="ph-left">
          {/* Breadcrumb */}
          <nav className="ph-breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="ph-crumb-item">
                {i > 0 && <span className="ph-crumb-sep">›</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="ph-crumb-link">{crumb.label}</a>
                ) : (
                  <span className="ph-crumb-current">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Eyebrow */}
          <div className="ph-eyebrow-row">
            <span className="ph-eyebrow-line" />
            <span className="ph-eyebrow">{eyebrow}</span>
          </div>

          {/* Title */}
          <h1 className="ph-title">{title}</h1>

          {/* Description */}
          <p className="ph-description">{description}</p>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className="ph-right">
          <img
            src={image}
            alt={imageAlt}
            className="ph-image"
            onError={(e) => {
              e.target.src = "https://placehold.co/420x360/ffd700/1a3a2a?text=Jerushaligne";
            }}
          />
        </div>
      </div>
    </section>
  );
}
