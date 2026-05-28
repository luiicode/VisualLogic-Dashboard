import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusClass } from "@/features/Overview/constants/status-style";
import { teams } from "@/features/Overview/data/teamsData";

export default function TeamsByProjectTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Proyecto</TableHead>
          <TableHead>Líder</TableHead>
          <TableHead className="text-right">Miembros</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.project}>
            <TableCell className="font-medium">{team.project}</TableCell>
            <TableCell>{team.lead}</TableCell>
            <TableCell className="text-right">{team.members}</TableCell>
            <TableCell>
              <Badge className={statusClass(team.status)} variant="secondary">
                {team.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

