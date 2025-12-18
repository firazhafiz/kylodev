import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/constant";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black-100/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-gray-100 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy backdrop-blur-sm cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-lime" />
        </button>

        {/* Thumbnail */}
        <div className="relative h-72 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-black-100 mb-2">
              {project.name}
            </h2>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-navy  tracking-wide mb-2">
              About
            </h3>
            <p className="text-black-100 font-literata font-light leading-relaxed">
              {project.description}
            </p>
          </div>
          {/* Key Features */}
          <div>
            <h3 className="text-sm font-semibold text-navy  tracking-wide mb-2">
              Key Features
            </h3>
            <ul>
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="text-black-100 font-literata font-light leading-relaxed list-disc list-inside list"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          {project.preview && (
            <Button
              asChild
              className="w-full border border-navy hover:bg-navy hover:text-lime transition-colors duration-300 text-navy font-semibold py-6 rounded-lg"
            >
              <a
                href={project.preview}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Project
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
