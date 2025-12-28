import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Data from "../data/data";
import "./Project.css";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const [filter, setFilter] = useState<"all" | "html" | "js" | "react">("all");
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const filterBtnsRef = useRef<HTMLButtonElement[]>([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const filteredProjects = Data.filter((project) => {
    if (filter === "all") return true;
    return project.status.toLowerCase().includes(filter);
  });

  useLayoutEffect(() => {
    cardsRef.current = [];
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
        }
      );
    }

    // Filter buttons animation
    filterBtnsRef.current.forEach((btn, i) => {
      gsap.fromTo(
        btn,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: btn, start: "top 95%" },
        }
      );
    });

    // Cards animation - WOW EFFECT
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 120, x: i % 2 === 0 ? -60 : 60, rotation: i % 2 === 0 ? -5 : 5, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.6,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle parallax while scrolling
      gsap.to(card, {
        y: 20,
        rotation: i % 2 === 0 ? 2 : -2,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Desktop 3D tilt + magnetic buttons
      if (window.innerWidth >= 768) {
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

        // Magnetic buttons
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

    // Background floating blobs parallax
    gsap.to("body::before", {
      y: 80,
      x: 80,
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 },
    });
    gsap.to("body::after", {
      y: -80,
      x: -80,
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.5 },
    });
  }, [filter, filteredProjects]);

  return (
    <section id="project" className="project-section">
      <h1 className="project-title" ref={titleRef}>My Projects</h1>

      <div className="project-filters">
        {["all", "html", "js", "react"].map((item, i) => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? "active" : ""}`}
            ref={(el) => el && (filterBtnsRef.current[i] = el)}
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
    key={`${filter}-${index}`}
    ref={(el) => el && (cardsRef.current[index] = el)}
    data-aos="fade-up"
    data-aos-delay={index * 150} // stagger effect: each card delayed by 150ms
  >

            <div className="card-image">
              {project.img ? (
                <img src={project.img} alt={project.name} />
              ) : (
                <div className="coming-soon"><h3>{project.name}</h3></div>
              )}
            </div>

            {project.liveDemo && project.code && (
              <div className="card-buttons">
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn live-btn">Live Demo</a>
                <a href={project.code} target="_blank" rel="noreferrer" className="btn code-btn">View Code</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
