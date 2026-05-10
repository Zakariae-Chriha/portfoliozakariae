import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroScene = lazy(() => import("./HeroScene"));

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#";

function useScramble(target, active, frameDuration = 22, totalFrames = 55) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * target.length);
      const scrambled = Array(target.length - revealed)
        .fill(0)
        .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
        .join("");
      setText(target.slice(0, revealed) + scrambled);
      if (frame >= totalFrames) {
        setText(target);
        clearInterval(id);
      }
    }, frameDuration);
    return () => clearInterval(id);
  }, [target, active, frameDuration, totalFrames]);

  return text;
}

function TypeWriter({ strings }) {
  const [displayed,  setDisplayed]  = useState("");
  const [stringIdx,  setStringIdx]  = useState(0);
  const [charIdx,    setCharIdx]    = useState(0);
  const [deleting,   setDeleting]   = useState(false);
  const [pausing,    setPausing]    = useState(false);

  useEffect(() => {
    if (pausing) return;
    const current = strings[stringIdx];
    const speed   = deleting ? 38 : 82;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setPausing(true);
        setTimeout(() => { setPausing(false); setDeleting(true); }, 1900);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setStringIdx((i) => (i + 1) % strings.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, pausing, stringIdx, strings]);

  return (
    <span>
      <span className="typewriter-text">{displayed}</span>
      <span className="cursor-blink" aria-hidden="true" />
    </span>
  );
}

function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(t);
  }, []);

  const name = useScramble("Zakariae Chriha", ready);

  const fade = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: ready ? 1 : 0, y: ready ? 0 : 24 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="hero-section" id="home">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="hero-content">
        <motion.div className="available-badge" {...fade(0.1)}>
          <span className="badge-dot" aria-hidden="true" />
          Available for work ✦
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {name || "Zakariae Chriha"}
        </motion.h1>

        <motion.div className="hero-subtitle" {...fade(0.75)}>
          <TypeWriter
            strings={["Frontend Developer", "MERN Stack Developer", "Web Craftsman"]}
          />
        </motion.div>

        <motion.div className="hero-cta" {...fade(1.05)}>
          <Link to="/project" className="btn-primary-glow" data-cursor>
            View My Work
          </Link>
          <Link to="/contact" className="btn-ghost" data-cursor>
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <motion.div className="scroll-indicator" {...fade(1.4)}>
        <span>Scroll</span>
        <span className="scroll-line" aria-hidden="true" />
      </motion.div>
    </section>
  );
}

export default Home;
