import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectMembersTable from "@/features/teams/components/table/ProjectMembersTable";
import { Project } from "@/features/teams/interfaces/ProjectInterface";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectMembersTable members={project.members} />
      </CardContent>
    </Card>
  );
}
