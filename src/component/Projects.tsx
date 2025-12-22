import React from "react";
import Data from "../data/data";
import "./Project.css";

function Projects() {
  return (
    <section id="project" className="project-section">
      <div id="particles-js" className="particles-bg"></div>

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
