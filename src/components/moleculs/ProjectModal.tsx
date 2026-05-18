import { useEffect } from "react";
import { X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/constant";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/10 backdrop-blur-md animate-fade-in" />

      {/* Modal Container Wrapper */}
      <div
        className="relative max-w-xl w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Ultra-clean minimal icon */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-40 p-2 rounded-full text-navy/40 hover:text-navy hover:bg-navy/5 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body */}
        <div className="w-full max-h-[85vh] overflow-y-auto no-scrollbar bg-white rounded-3xl border border-navy/5 ">
          <div className="p-8 md:p-12 space-y-8">
            {/* Title & Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-black-100 tracking-tight leading-tight">
                {project.name}
              </h2>

              {project.frameworks && project.frameworks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.frameworks.map((tech) => (
                    <span
                      key={tech.id}
                      className="px-3 py-1 rounded-full bg-navy/5 text-navy/70 text-[10px] font-medium tracking-wide"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview / Description */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-[0.2em]">
                <span className="font-bold text-navy">PROJECT</span>{" "}
                <span className="font-light text-black-100/60">OVERVIEW</span>
              </h3>
              <p className="text-black-100/70 font-literata text-base font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs uppercase tracking-[0.2em]">
                <span className="font-bold text-navy">KEY</span>{" "}
                <span className="font-light text-black-100/60">FEATURES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-black-100 shrink-0 mt-[7px]" />
                    <span className="text-black-100/60 text-sm font-regular leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              {project.preview && (
                <Button
                  asChild
                  className="w-full bg-navy hover:bg-navy/95 text-lime font-bold py-6 rounded-full shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 group"
                  >
                    Visit Live Project
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
