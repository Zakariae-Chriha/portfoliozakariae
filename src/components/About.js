import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import myImg from "../Assets/Bild.jpg";

const SERVICES = [
  {
    icon: "⚡",
    title: "Full-Stack Development",
    desc: "Complete products from database to UI — MongoDB, Express, React, Node.js. Clean APIs, real authentication, scalable architecture that ships.",
    glow: "#8B5CF6",
  },
  {
    icon: "🤖",
    title: "AI-Powered Products",
    desc: "I don't just call AI APIs — I build products around them. Claude, OpenAI, Replicate, ElevenLabs wired into real features users actually experience.",
    glow: "#00F5FF",
  },
  {
    icon: "🚀",
    title: "Production Systems",
    desc: "Stripe payments, OAuth, real-time WebSockets, job queues, cloud storage. Everything a real product needs to go live and stay live.",
    glow: "#F472B6",
  },
];

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "Framer Motion", "Tailwind CSS", "i18next"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "JWT", "Socket.IO", "Redis"],
  },
  {
    label: "AI & APIs",
    skills: ["Claude AI", "OpenAI", "Replicate", "ElevenLabs", "Stripe", "Daily.co"],
  },
  {
    label: "Tools",
    skills: ["Git", "Cloudinary", "AWS S3", "Vercel", "Postman", "VS Code"],
  },
];

function CountUp({ end, duration = 1800 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick  = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-inner">

        <motion.div className="section-label" {...fadeUp(0)}>
          <span className="label-line" />
          About
        </motion.div>

        {/* ── Hero bio ──────────────────────────────── */}
        <div className="about-grid">
          <motion.div className="about-text" {...fadeUp(0.05)}>
            <h2 className="section-title">
              Full-Stack Developer<br />
              <span className="accent-cyan">who builds with AI</span>
            </h2>

            <p className="about-body">
              I'm <strong style={{ color: "var(--text-primary)" }}>Zakariae Chriha</strong>, based in Berlin.
              I build complete web products — from the database all the way to the interface —
              and I integrate cutting-edge AI to make them genuinely intelligent.
            </p>
            <p className="about-body">
              Most developers use AI as a tool. I build <em style={{ color: "var(--cyan)" }}>products powered by it</em>.
              Story generators, coaching platforms, language apps — each one backed by real AI pipelines
              that users actually feel.
            </p>

            <p className="about-quote">
              "Strive to build things that make a difference."
            </p>

            <div className="stats-row">
              <div className="stat">
                <span className="stat-number"><CountUp end={4} />+</span>
                <span className="stat-label">AI projects shipped</span>
              </div>
              <div className="stat">
                <span className="stat-number"><CountUp end={10} />+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat">
                <span className="stat-number"><CountUp end={3} />+</span>
                <span className="stat-label">Years building</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-frame">
              <img src={myImg} alt="Zakariae Chriha" className="portrait-img" />
              <div className="portrait-glow" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* ── What I do ─────────────────────────────── */}
        <motion.div {...fadeUp(0.1)}>
          <p className="skills-heading">What I build</p>
        </motion.div>

        <div className="what-i-do">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="service-card-icon">{s.icon}</span>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <span
                className="service-card-glow"
                style={{ background: s.glow }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Skills ────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)}>
          <p className="skills-heading">Tech Stack</p>
        </motion.div>

        <motion.div
          className="skills-categories"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: ci * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="skill-category-label">
                <span />
                {cat.label}
              </p>
              <div className="skill-pills">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default About;
