import { useEffect } from "react";
import Data from "../data/data";
import "./Project.css";

function Projects() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 50,
            density: { enable: true, value_area: 800 }
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true
          }
        }
      });
    }
  }, []);

  return (
    <section id="project" className="project-section">
      {/* particles background */}
      <div
        id="particles-js"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <h1 className="project-title">My Projects</h1>

      <div className="project-list">
        {Data.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="card-image">
              <img src={project.img} alt="Project Preview" />
            </div>

            <div className="card-buttons">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="btn live-btn"
              >
                Live Demo
              </a>

              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="btn code-btn"
              >
                View Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
