import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProjectCard({ slug, title, description, tech, img, icon, accent, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/project/${slug}`}
        className="project-card-inner"
        style={{ display: "block", textDecoration: "none" }}
        data-cursor
      >
        <div className="card-img-wrapper">
          {img ? (
            <>
              <img src={img} alt={title} className="card-img" />
              <div className="card-img-overlay" aria-hidden="true" />
            </>
          ) : (
            <div className="card-img-placeholder" aria-hidden="true">
              <div className="card-placeholder-icon" style={{ borderColor: `${accent}40` }}>
                {icon}
              </div>
            </div>
          )}
        </div>

        <div className="card-body">
          {tech && (
            <div className="card-tech">
              {tech.slice(0, 4).map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
              {tech.length > 4 && (
                <span className="tech-badge">+{tech.length - 4}</span>
              )}
            </div>
          )}
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
          <span className="card-link" style={{ color: accent || "var(--cyan)" }}>
            View Case Study →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProjectCard;
