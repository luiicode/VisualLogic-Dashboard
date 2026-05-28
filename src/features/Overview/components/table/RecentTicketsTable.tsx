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
import { recentTickets } from "@/features/Overview/data/recentTickets";

export default function RecentTicketsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
            <TableCell>{ticket.user}</TableCell>
            <TableCell>
              <Badge className={statusClass(ticket.status)} variant="secondary">
                {ticket.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {ticket.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

