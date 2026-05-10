import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";

import NavBar        from "./components/Navbar";
import Home          from "./components/Home";
import About         from "./components/About";
import Resume        from "./components/ResumeNew";
import Contact       from "./components/Contact";
import Project       from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import CustomCursor  from "./components/CustomCursor";
import GrainOverlay  from "./components/GrainOverlay";
import Preloader     from "./components/Preloader";
import ScrollToTop   from "./components/ScrollToTop";

import "./style.css";
import "./App.css";

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoad(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let id;
    function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader load={load} />
      <GrainOverlay />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <CustomCursor />
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/"        element={<Home    />} />
          <Route path="/about"   element={<About   />} />
          <Route path="/resume"  element={<Resume  />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project"      element={<Project />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
