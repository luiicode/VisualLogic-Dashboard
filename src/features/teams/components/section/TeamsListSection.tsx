import { projects } from "@/features/teams/data/projectData";
import ProjectCard from "@/features/teams/components/widget/ProjectCard";

export default function TeamsListSection() {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}

