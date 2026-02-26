import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* ================= BRAND ================= */}
        <div className="footer-brand">
          <a href="/">
            <img
              src="/images/logo/footer-logo.png"
              alt="Jerushaligne logo"
            />
          </a>

          <p>
            Jerushaligne is a dental technology company with rich experience and expertise in dental care, cutting-edge engineering expertise and benchmarked production prowes. 
            With a team of experts and a mission to innovate, Jerushaligne set out to change the way smiles are shaped.
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="footer-links">
          <h5 className="footer-title">Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/clear-aligners">Clear Aligners</a></li>
            <li><a href="/retainers">Retainers</a></li>
            <li><a href="/why-jerushaligne">Why Jerushaligne</a></li>
            <li><a href="/our-outlets">Our Outlets</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="footer-contact">
          <h5 className="footer-title">Contact</h5>
          <p>Main Branch : Near & Behind Bustand,
                           Brammapuram South,
                           Thuckalay,
                           Tamil Nadu - 629175</p>
                           <br></br>
          <p>
            <a href="tel:+919489160055">+91 94891 60055</a>
          </p>
           <br></br>
          <p>
            <a href="mailto:jerushclinic@gmail.com">
              jerushclinicgmail.com
            </a>
          </p>
        </div>

        {/* ================= HOURS + SOCIAL ================= */}
        <div>
          <h5 className="footer-title">Opening Hours</h5>
          <p className="footer-hours">
            24/7 Services<br/>
           Consultation Time : 9:00 AM – 6:00 PM <br />
          </p>

          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=61567723580256" target="_blank" aria-label="Facebook" className="fb">f</a>
            <a href="https://www.instagram.com/jerush_hospital" target="_blank" aria-label="Instagram" className="ig">◎</a>
            <a href="https://www.youtube.com/@jerushdentofacialandcosmetic" target="_blank" aria-label="YouTube" className="yt">▶</a>
            {/* <a href="#" aria-label="X" className="x">X</a> */}
          </div>
        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="footer-bottom">
        © {new Date().getFullYear()}{" "}
        <span className="footer-brand-highlight"><a href="/" alt="home-page">Jerushaligne</a></span>.
        All rights reserved. Developed by <span className="footer-brand-highlight">Jerush Digital Marketing Thuckalay</span>
      </div>

    </footer>
  );
}
