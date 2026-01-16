"use client";

import { useState } from "react";
import ProjectCard from "@/components/moleculs/ProjectCard";
import ProjectModal from "@/components/moleculs/ProjectModal";
import { Project } from "@/constant";

export default function ProjectsClientPage({
  projects,
}: {
  projects: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="min-h-screen bg-white pb-30 px-6 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center pt-30 pb-15 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-navy">
            All Projects
          </h1>
          <p className="text-black-100 font-literata tracking-wide text-sm max-w-2xl mx-auto">
            A comprehensive showcase of my portfolio spanning various
            technologies and domains
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard
                bgColor="bg-black-100"
                titleColor="text-white"
                descriptionColor="text-white"
                project={project}
                onDetailClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
