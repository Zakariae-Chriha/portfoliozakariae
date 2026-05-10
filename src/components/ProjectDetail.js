import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BiLinkExternal, BiArrowBack } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { PROJECTS } from "../data/projects";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  animate:     { opacity: 1, y: 0 },
  transition:  { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

function ProjectDetail() {
  const { slug } = useParams();
  const project  = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/project" replace />;

  const { title, tagline, description, features, tech, live, github, img, icon, accent } = project;

  return (
    <section className="detail-section">
      <div className="section-inner">

        <motion.div {...fadeUp(0)}>
          <Link to="/project" className="detail-back" data-cursor>
            <BiArrowBack /> Back to projects
          </Link>
        </motion.div>

        {img && (
          <motion.div
            className="detail-hero-img"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={img} alt={title} />
          </motion.div>
        )}

        <div className="detail-hero">
          <motion.div {...fadeUp(0.05)}>
            <div className="detail-icon" aria-hidden="true">{icon}</div>
            <h1 className="detail-title">{title}</h1>
            <p className="detail-tagline">{tagline}</p>
            <div className="detail-links">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-glow"
                  data-cursor
                >
                  <BiLinkExternal /> Live Demo
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  data-cursor
                >
                  <AiFillGithub /> GitHub
                </a>
              )}
            </div>
          </motion.div>

          <motion.div className="detail-status" {...fadeUp(0.1)}>
            <div
              className="detail-accent-bar"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />
            <span
              className="section-label"
              style={{ marginBottom: 0, color: accent }}
            >
              <span
                className="label-line"
                style={{ background: accent }}
              />
              {tech.length} technologies
            </span>
          </motion.div>
        </div>

        <div className="detail-body">
          <motion.div {...fadeUp(0.1)}>
            <p className="detail-description">{description}</p>

            <h2 className="detail-features-heading">Key Features</h2>
            <div className="detail-features">
              {features.map((feat, i) => (
                <motion.div
                  key={feat}
                  className="detail-feature"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="detail-feature-dot"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  {feat}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="detail-sidebar" {...fadeUp(0.15)}>
            <div className="detail-sidebar-card">
              <p className="detail-sidebar-heading">Tech Stack</p>
              <div className="detail-tech-grid">
                {tech.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>

            {live && (
              <div className="detail-sidebar-card">
                <p className="detail-sidebar-heading">Live URL</p>
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  className="info-link"
                  style={{ fontSize: "0.85rem", wordBreak: "break-all" }}
                  data-cursor
                >
                  {live.replace("https://", "")}
                </a>
              </div>
            )}

            {github && (
              <div className="detail-sidebar-card">
                <p className="detail-sidebar-heading">Repository</p>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="info-link"
                  style={{ fontSize: "0.85rem", wordBreak: "break-all" }}
                  data-cursor
                >
                  {github.replace("https://github.com/", "github.com/")}
                </a>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default ProjectDetail;
