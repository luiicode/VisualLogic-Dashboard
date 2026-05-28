import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusVariant } from "@/features/teams/constants/status-style";
import { Member } from "@/features/teams/interfaces/MemberInterface";

export default function ProjectMembersTable({
  members,
}: {
  members: Member[];
}) {
  return (
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
        {members.map((m) => (
          <TableRow key={m.email}>
            <TableCell className="font-medium">{m.name}</TableCell>
            <TableCell className="text-muted-foreground">{m.email}</TableCell>
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
  );
}
