import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCards";
import { PROJECTS } from "../data/projects";

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-line" />
          Projects
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Recent <span className="accent-cyan">Works</span>
        </motion.h2>

        <p className="section-sub">
          {PROJECTS.length} projects built and shipped — click any card to explore.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
