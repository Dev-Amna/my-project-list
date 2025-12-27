import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Data from "../data/data";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const [filter, setFilter] = useState<"all" | "html" | "js" | "react">("all");
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Filtered projects
  const filteredProjects = Data.filter((project) => {
    if (filter === "all") return true;
    return project.status.toLowerCase().includes(filter);
  });

  // Reset card refs whenever filter changes
  useEffect(() => {
    cardsRef.current = [];
  }, [filter]);

  // Animate cards
  const animateCards = () => {
    const isMobile = window.innerWidth < 768;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Fade-in animation for filter click
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out" }
      );

      if (!isMobile) {
        // 3D Hover Tilt
        const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          rotateY(((e.clientX - rect.left) / rect.width - 0.5) * 15);
          rotateX(-((e.clientY - rect.top) / rect.height - 0.5) * 15);
        });

        card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
        card.addEventListener("mouseleave", () => {
          rotateX(0);
          rotateY(0);
          gsap.to(card, { scale: 1, duration: 0.4 });
        });

        // Magnetic Buttons
        card.querySelectorAll<HTMLAnchorElement>(".btn").forEach((btn) => {
          btn.addEventListener("mousemove", (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power3.out" });
          });
          btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power3.out" }));
        });
      }
    });
  };

  // Animate on initial load and whenever filter changes
  useEffect(() => {
    // TITLE ANIMATION
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );
    }

    // Animate cards after a short delay to ensure refs are updated
    setTimeout(() => {
      animateCards();
    }, 50);
  }, [filter]);

  return (
    <section id="project" className="project-section" ref={sectionRef}>
      <h1 className="project-title" ref={titleRef}>
        My Projects
      </h1>

      <div className="project-filters">
        {["all", "html", "js", "react"].map((item) => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item as any)}
          >
            {item === "all" ? "All" : item.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="project-list">
        {filteredProjects.map((project, index) => (
          <div
            className="project-card"
            key={`${filter}-${index}`} // force re-render on filter change
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className="card-image">
              {project.img ? (
                <img src={project.img} alt={project.name} />
              ) : (
                <div className="coming-soon">
                  <h3>{project.name}</h3>
                </div>
              )}
            </div>

            {project.liveDemo && project.code ? (
              <div className="card-buttons">
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn live-btn">
                  Live Demo
                </a>
                <a href={project.code} target="_blank" rel="noreferrer" className="btn code-btn">
                  View Code
                </a>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
