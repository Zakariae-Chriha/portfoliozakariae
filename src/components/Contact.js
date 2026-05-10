import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const fadeIn = (delay = 0, x = 0) => ({
  initial:     { opacity: 0, x, y: x === 0 ? 32 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

const WEB3FORMS_KEY = "b7399b93-c33b-4ab9-8ee9-2d00a7788283";

function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: fields.name,
          email: fields.email,
          message: fields.message,
          subject: `Portfolio contact from ${fields.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setFields({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(data.message || "Submit failed");
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-inner">
        <motion.div className="section-label" {...fadeIn(0)}>
          <span className="label-line" />
          Contact
        </motion.div>

        <motion.h2 className="section-title" {...fadeIn(0.05)}>
          Let's <span className="accent-cyan">Connect</span>
        </motion.h2>

        <div className="contact-grid">
          <motion.div className="contact-info" {...fadeIn(0.1, -40)}>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Bredow str.20A, Berlin, Germany</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">015566779989</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <a
                href="mailto:chrihazakaria@gmail.com"
                className="info-value info-link"
                data-cursor
              >
                chrihazakaria@gmail.com
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/Zakariae-Chriha"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="GitHub"
                data-cursor
              >
                <AiFillGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/zakariae-chriha/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="LinkedIn"
                data-cursor
              >
                <FaLinkedinIn />
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-form"
            {...fadeIn(0.15, 40)}
          >
            <div className="field-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                required
                autoComplete="name"
                value={fields.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="field-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                autoComplete="email"
                value={fields.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="field-group">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder=" "
                required
                value={fields.message}
                onChange={handleChange}
              />
              <label htmlFor="message">Message</label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={status === "sending"}
              data-cursor
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message sent ✓"
                : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="form-feedback success">
                Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="form-feedback error">
                Something went wrong. Please email directly at chrihazakaria@gmail.com
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
