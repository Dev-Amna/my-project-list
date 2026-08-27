import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import WebProjects from "../data/webProjects";
import { mobileProjects } from "../data/mobileProjects";
import "./Project.css";

type Filter = "all" | "html" | "js" | "react" | "mobile";

function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Combine web and mobile projects
  const Data = [...WebProjects, ...mobileProjects];

  // Filter projects
  const filteredProjects = Data.filter((project) => {
    const status = project.status?.toLowerCase() || "";

    // Show everything
    if (filter === "all") {
      return true;
    }

    // Mobile projects ONLY
    if (filter === "mobile") {
      return status === "mobile";
    }

    // Web projects
    return status
      .split(",")
      .map((item) => item.trim())
      .includes(filter);
  });

  /* ---------- TITLE ANIMATION ---------- */
  useLayoutEffect(() => {
    if (!titleRef.current) return;

    gsap.from(titleRef.current, {
      opacity: 0,
      y: -60,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  /* ---------- CARDS ANIMATION ---------- */
  useLayoutEffect(() => {
    cardsRef.current = [];

    requestAnimationFrame(() => {
      if (cardsRef.current.length === 0) return;

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
    });
  }, [filter]);

  return (
    <section className="project-section">
      {/* ---------- TITLE ---------- */}
      <h1 ref={titleRef} className="project-title">
        My Projects
      </h1>

      {/* ---------- FILTERS ---------- */}
      <div className="project-filters">
        {(["all", "html", "js", "react", "mobile"] as Filter[]).map(
          (item) => (
            <button
              key={item}
              className={`filter-btn ${filter === item ? "active" : ""
                }`}
              onClick={() => setFilter(item)}
            >
              {item.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* ---------- PROJECT LIST ---------- */}
      <div className="project-list">
        {filteredProjects.map((project, i) => {
          const isMobile =
            project.status?.toLowerCase() === "mobile";

          return (
            <div
              key={`${project.status}-${project.id ?? i}`}
              className="project-card"
              ref={(el) => {
                if (el) {
                  cardsRef.current[i] = el;
                }
              }}
            >
              {/* ---------- IMAGE ---------- */}
              <div className="card-image">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.name}
                  />
                ) : (
                  <div className="coming-soon">
                    {project.name}
                  </div>
                )}
              </div>

              {/* ---------- BUTTONS ---------- */}
              <div className="card-buttons">
                {/* Live Demo / Download App */}
                {project.liveDemo &&
                  project.liveDemo !== "#" && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn live-btn"
                    >
                      {isMobile
                        ? "Download App"
                        : "Live Demo"}
                    </a>
                  )}

                {/* View Code */}
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="btn code-btn"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;