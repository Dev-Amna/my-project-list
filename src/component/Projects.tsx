import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Data from "../data/data";
import "./Project.css";

type Filter = "all" | "html" | "js" | "react";

function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const filteredProjects = Data.filter((p) =>
    filter === "all" ? true : p.status.toLowerCase().includes(filter)
  );

  /* ---------- TITLE (ONCE) ---------- */
  useLayoutEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -60,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  /* ---------- CARDS (EVERY FILTER CHANGE) ---------- */
  useLayoutEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, [filter]);

  return (
    <section className="project-section">
      <h1 ref={titleRef} className="project-title">
        My Projects
      </h1>

      <div className="project-filters">
        {(["all", "html", "js", "react"] as Filter[]).map((item) => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="project-list">
        {filteredProjects.map((project, i) => (
          <div
            key={project.id ?? i}
            className="project-card"
            ref={(el) => el && (cardsRef.current[i] = el)}
          >
            <div className="card-image">
              {project.img ? (
                <img src={project.img} alt={project.name} />
              ) : (
                <div className="coming-soon">{project.name}</div>
              )}
            </div>

            {project.liveDemo && project.code && (
              <div className="card-buttons">
                <a href={project.liveDemo} className="btn live-btn">
                  Live Demo
                </a>
                <a href={project.code} className="btn code-btn">
                  View Code
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
