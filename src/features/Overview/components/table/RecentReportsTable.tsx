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
import { ReportRow } from "@/features/Overview/interfaces/ReportRow";

export default function RecentReportsTable({ data }: { data: ReportRow[] }) {
  if (!data || data.length === 0)
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        No hay reportes recientes
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reporte</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Fecha de Entrega</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((report, i) => (
          <TableRow key={i}>
            {/* Como no pedimos un ID de reporte en Salesforce, usamos un correlativo visual */}
            <TableCell className="font-medium">Rep_Op_{i + 1}</TableCell>
            <TableCell>
              <Badge className={statusClass(report.status)} variant="secondary">
                {report.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {report.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
