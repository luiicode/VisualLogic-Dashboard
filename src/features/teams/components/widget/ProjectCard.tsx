import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectMembersTable from "@/features/teams/components/table/ProjectMembersTable";
import { Status } from "@/features/teams/types/statusType";

interface Member {
  name: string;
  email: string;
  role: string;
  activity: string;
  status: Status;
}

interface Project {
  name: string;
  members: Member[];
}

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

