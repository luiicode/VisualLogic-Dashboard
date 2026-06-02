import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { statusVariant } from "@/features/tickets/constants/status-style";
import { TicketRow } from "@/features/tickets/interfaces/TicketRow";

export default function TicketsTable({ rows }: { rows: TicketRow[] }) {
  if (!rows || rows.length === 0) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID de orden</TableHead>
          <TableHead>Usuario encargado</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Fecha de emisión</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.orderId}>
            <TableCell className="font-mono">{row.orderId}</TableCell>
            <TableCell className="font-medium">{row.user}</TableCell>
            <TableCell className="text-muted-foreground">{row.email}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  statusVariant[row.status as keyof typeof statusVariant] ||
                  "bg-gray-100 text-gray-800"
                }
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
