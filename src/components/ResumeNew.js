import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdf from "../Assets/Zakariae Chriha.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="resume-section">
      <div className="section-inner">
        <motion.div className="section-label" {...fadeUp(0)}>
          <span className="label-line" />
          Resume
        </motion.div>

        <motion.h2 className="section-title" {...fadeUp(0.05)}>
          My <span className="accent-cyan">Resume</span>
        </motion.h2>

        <motion.div className="resume-actions" {...fadeUp(0.1)}>
          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-glow"
            data-cursor
          >
            <AiOutlineDownload /> Download CV
          </a>
        </motion.div>

        <motion.div className="pdf-wrapper" {...fadeUp(0.15)}>
          <Document file={pdf} className="pdf-doc">
            <Page pageNumber={1} scale={width > 786 ? 1.5 : 0.6} />
          </Document>
        </motion.div>
      </div>
    </section>
  );
}

export default ResumeNew;
