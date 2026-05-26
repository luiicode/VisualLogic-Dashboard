import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusVariant } from "@/features/teams/constants/status-style";
import { projects } from "@/features/teams/data/projectData";

export default function DashboardTeams() {
  return (
    <div className="p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Equipos organizados por proyecto, con su rol y actividad asignada.
        </p>
      </header>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle className="text-xl">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre de usuario</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Actividad a realizar</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.members.map((m) => (
                    <TableRow key={m.email}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {m.email}
                      </TableCell>
                      <TableCell>{m.role}</TableCell>
                      <TableCell>{m.activity}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusVariant[m.status].className}
                        >
                          {m.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
