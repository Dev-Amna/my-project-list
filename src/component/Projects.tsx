import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Data from "../data/data";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    
    const isMobile = window.innerWidth < 768;

    // TITLE ANIMATION
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );
    }

    // CARDS SCROLL ANIMATION
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.95, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      if (!isMobile) {
        // 3D HOVER TILT
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

        // MAGNETIC BUTTONS
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
  }, []);

  return (
    <section id="project" className="project-section" ref={sectionRef}>
      
      <h1 className="project-title" ref={titleRef}>
        My Projects
      </h1>

      <div className="project-list">
        {Data.map((project, index) => (
          <div
            className="project-card"
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className="card-image">
              <img src={project.img} alt="Project Preview" />
            </div>

            <div className="card-buttons">
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn live-btn">
                Live Demo
              </a>
              <a href={project.code} target="_blank" rel="noreferrer" className="btn code-btn">
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
