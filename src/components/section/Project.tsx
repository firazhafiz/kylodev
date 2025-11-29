"use client";

import { useState, useEffect, useRef } from "react";
import { projects, Project } from "@/constant";
import ProjectCard from "@/components/moleculs/ProjectCard";
import ProjectModal from "@/components/moleculs/ProjectModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const priorityProjects = projects.filter((p) => p.priority).slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header (title + description)
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards — muncul bertahap saat masuk viewport
      gsap.fromTo(
        cardsRef.current.filter(Boolean) as HTMLElement[],
        {
          opacity: 0,
          y: 100,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Button View All
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 sm:px-4 sm:rounded-t-[64px] rounded-t-4xl bg-black-100"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured Projects
          </h2>
          <p className="text-lime font-literata tracking-wide font-light text-lg max-w-2xl mx-auto">
            Discover our latest work showcasing modern development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {priorityProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <ProjectCard
                titleColor="text-black-100"
                descriptionColor="text-black-100"
                bgColor="bg-white"
                project={project}
                onDetailClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            ref={buttonRef}
            asChild
            variant="outline"
            className="px-8 py-6 rounded-xl border-2 border-lime text-white bg-transparent font-semibold text-sm sm:text-base hover:bg-lime hover:text-navy transition-all duration-300"
          >
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default LandingProjectsSection;
