// pages/Contact.jsx
import { useState, useMemo } from "react";
import "../styles/contact.css";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";

/* ================= ANIMATION VARIANTS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [phoneCountry, setPhoneCountry] = useState("in");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */

  const validateField = (field, value, freshCountry) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else if (!/^[A-Za-z\s]{3,}$/.test(value.trim())) {
        error = "Enter valid name (minimum 3 letters)";
      }
    }

    if (field === "phone") {
      if (!value) {
        error = "Phone number is required";
      } else {
        const digits = value.replace(/\D/g, "");
        const e164 = "+" + digits;
        const countryUpper = (freshCountry || phoneCountry).toUpperCase();

        if (!isValidPhoneNumber(e164, countryUpper)) {
          error = "Enter valid phone number";
        }
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Enter valid email address";
      }
    }

    if (field === "message") {
      if (!value.trim()) {
        error = "Message is required";
      } else if (value.trim().length < 10) {
        error = "Message must be at least 10 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  /* ================= FORM VALID STATE ================= */

  const isFormValid = useMemo(() => {
    return (
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.message &&
      Object.values(errors).every((err) => !err)
    );
  }, [formData, errors]);

  const getFieldClass = (field) => {
    if (errors[field]) return "has-error";
    if (formData[field] && !errors[field]) return "has-success";
    return "";
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const nameValid = validateField("name", formData.name);
    const phoneValid = validateField("phone", formData.phone, phoneCountry);
    const emailValid = validateField("email", formData.email);
    const messageValid = validateField("message", formData.message);

    if (!(nameValid && phoneValid && emailValid && messageValid)) return;

    setLoading(true);

    try {
      const response = await fetch("/send-contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData),
      });

      const result = await response.text();

      if (result === "success") {
        setStatus("Message sent successfully! We will reach you soon. ✅");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setErrors({});
        setPhoneCountry("in");
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch {
      setStatus("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <section className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <motion.div
            className="hero-text"
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
          >
            <h1>Contact Us</h1>
            <p>We're here to help you smile with confidence</p>
          </motion.div>

          <motion.div
            className="hero-image"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <img src="/images/comparison/girl.webp" alt="Contact Illustration" />
          </motion.div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="contact-container">

        {/* LEFT IMAGE */}
        <motion.div
          className="contact-image"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src="/images/jerushaligne-kit.webp" alt="Jerush Clinic" />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          className="contact-right"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              Have questions about aligners or appointments?
              Reach out — our team is happy to help.
            </p>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>

              <div className="form-row">

                {/* NAME */}
                <div className={`field ${getFieldClass("name")}`}>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ ...formData, name: value });
                        validateField("name", value);
                      }}
                    />
                    {formData.name && !errors.name && (
                      <span className="field-icon success">✓</span>
                    )}
                    {errors.name && (
                      <span className="field-icon error">✕</span>
                    )}
                  </div>
                  {errors.name && <small className="error-text">{errors.name}</small>}
                  {formData.name && !errors.name && (
                    <small className="success-text">Looks good ✓</small>
                  )}
                </div>

                {/* PHONE */}
                <div className={`field ${getFieldClass("phone")}`}>
                  <div className="phone-wrapper">
                    <PhoneInput
                      country="in"
                      enableSearch
                      countryCodeEditable={false}
                      value={formData.phone}
                      onChange={(phone, countryData) => {
                        const selectedCountry =
                          countryData?.countryCode || phoneCountry;
                        setPhoneCountry(selectedCountry);
                        setFormData((prev) => ({ ...prev, phone }));
                        validateField("phone", phone, selectedCountry);
                      }}
                      containerClass="custom-phone-container"
                    />
                    {formData.phone && !errors.phone && (
                      <span className="field-icon success phone-icon">✓</span>
                    )}
                    {errors.phone && (
                      <span className="field-icon error phone-icon">✕</span>
                    )}
                  </div>
                  {errors.phone && <small className="error-text">{errors.phone}</small>}
                  {formData.phone && !errors.phone && (
                    <small className="success-text">Valid number ✓</small>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div className={`field ${getFieldClass("email")}`}>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, email: value });
                      validateField("email", value);
                    }}
                  />
                  {formData.email && !errors.email && (
                    <span className="field-icon success">✓</span>
                  )}
                  {errors.email && (
                    <span className="field-icon error">✕</span>
                  )}
                </div>
                {errors.email && <small className="error-text">{errors.email}</small>}
                {formData.email && !errors.email && (
                  <small className="success-text">Valid email ✓</small>
                )}
              </div>

              {/* MESSAGE */}
              <div className={`field ${getFieldClass("message")}`}>
                <div className="input-wrapper">
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, message: value });
                      validateField("message", value);
                    }}
                  />
                  {formData.message && !errors.message && (
                    <span className="field-icon success textarea-icon">✓</span>
                  )}
                  {errors.message && (
                    <span className="field-icon error textarea-icon">✕</span>
                  )}
                </div>
                {errors.message && <small className="error-text">{errors.message}</small>}
                {formData.message && !errors.message && (
                  <small className="success-text">Message looks good ✓</small>
                )}
              </div>

              <button type="submit" disabled={!isFormValid || loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && <p className="status-text">{status}</p>}

            </form>
          </div>
        </motion.div>
      </div>

      {/* LOCATIONS */}
      <section className="locations-section">
        <motion.h2
          className="locations-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          Our Outlets
        </motion.h2>

        <motion.div
          className="locations-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
        >
          {[
            {
              city: "Thuckalay",
              address: "Brammapuram South, Thuckalay – 629175",
              map: "Jerush+Dentofacial+and+Cosmetic+Laser+Centre+Thuckalay",
            },
            {
              city: "Trichy",
              address: "Anna Nagar, Trichy – 620017",
              map: "Jerush+Dentofacial+and+Cosmetic+Laser+Centre+Trichy",
            },
            {
              city: "Chennai",
              address: "Adyar, Chennai – 600020",
              map: "Jerush+Dentofacial+and+Cosmetic+Laser+Centre+Chennai",
            },
          ].map((item, i) => (
            <motion.div key={i} className="location-card" variants={fadeUp}>
              <h3>{item.city}</h3>
              <p>
                Jerush Dentofacial and Cosmetic Laser Centre
                <br />
                {item.address}
              </p>
              <iframe
                src={`https://www.google.com/maps?q=${item.map}&output=embed`}
                loading="lazy"
                title={item.city}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </section>
  );
}