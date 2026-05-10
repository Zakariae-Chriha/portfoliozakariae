import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Assets/logo.png";

const NAV_LINKS = [
  { path: "/",        label: "Home"     },
  { path: "/about",   label: "About"    },
  { path: "/project", label: "Projects" },
  { path: "/resume",  label: "Resume"   },
  { path: "/contact", label: "Contact"  },
];

function NavBar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`navbar-glass ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="Home">
          <img src={logo} alt="ZC" />
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`nav-link ${active ? "active" : ""}`}
                  data-cursor
                >
                  {label}
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        className="nav-indicator"
                        layoutId="nav-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </motion.nav>
  );
}

export default NavBar;
