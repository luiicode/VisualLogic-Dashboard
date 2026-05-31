import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusVariant } from "@/features/sales/constants/status-style";

interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: keyof typeof statusVariant;
}

export default function RecentOrdersTable({ data }: { data: Order[] }) {
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
        {(data || []).map((o) => (
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
