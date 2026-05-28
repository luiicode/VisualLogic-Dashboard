import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tickets } from "@/features/tickets/data/ticketsData";
import { statusVariant } from "@/features/tickets/constants/status-style";

export default function TicketsTable({ sectionName }: { sectionName: string }) {
  const section = tickets.find((s) => s.section === sectionName);

  if (!section) return null;

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
        {section.rows.map((row) => (
          <TableRow key={row.orderId}>
            <TableCell className="font-mono">{row.orderId}</TableCell>
            <TableCell className="font-medium">{row.user}</TableCell>
            <TableCell className="text-muted-foreground">{row.email}</TableCell>
            <TableCell>
              <Badge variant="outline" className={statusVariant[row.status]}>
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

