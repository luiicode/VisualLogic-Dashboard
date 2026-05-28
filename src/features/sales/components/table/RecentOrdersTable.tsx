import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentOrders } from "@/features/sales/data/recentOrders";
import { statusVariant } from "@/features/sales/constants/status-style";

export default function RecentOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="font-medium">{o.id}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell className="text-muted-foreground">{o.product}</TableCell>
            <TableCell className="text-muted-foreground">{o.date}</TableCell>
            <TableCell className="text-right font-medium">
              ${o.amount.toLocaleString()}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={statusVariant[o.status]}>
                {o.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

