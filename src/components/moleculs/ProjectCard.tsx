import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    image: string;
    preview: string;
  };
  bgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  onDetailClick: () => void;
}

const ProjectCard = ({
  project,
  bgColor,
  titleColor,
  descriptionColor,
  onDetailClick,
}: ProjectCardProps) => {
  return (
    <div
      className={`${bgColor} group rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}
    >
      {/* Thumbnail */}

      {/* Content */}
      <div className="p-6 space-y-8">
        <div className="relative rounded-3xl h-64 overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/20 to-transparent" />
        </div>
        <div className="space-y-2">
          <h3 className={`text-xl font-bold ${titleColor}`}>{project.name}</h3>

          {/* Description */}
          <p
            className={`text-muted-foreground font-literata text-sm tracking-wider font-light line-clamp-2 min-h-10 ${descriptionColor}`}
          >
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Detail Link */}
          <button
            onClick={onDetailClick}
            className="text-navy hover:text-primary/80 text-xs font-medium transition-colors inline-flex items-center gap-1"
          >
            View Details →
          </button>

          {/* Preview Button - Full Width */}
          {project.preview ? (
            <Button
              asChild
              variant="default"
              className="w-full bg-navy hover:bg-primary/90 text-lime font-semibold py-6 rounded-xl"
            >
              <a
                href={project.preview}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Preview
              </a>
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full py-6 bg-gray-600 text-red-400 font-semibold rounded-xl cursor-not-allowed"
            >
              No Preview Available
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
