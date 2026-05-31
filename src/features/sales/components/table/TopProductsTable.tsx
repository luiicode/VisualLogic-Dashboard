import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopProductsTableProps {
  data: {
    id: number;
    product: string;
    units: number;
    revenue: number;
  }[];
}

export default function TopProductsTable({ data }: TopProductsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead className="text-right">Unidades</TableHead>
          <TableHead className="text-right">Ingresos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((p, i) => (
          <TableRow key={p.product}>
            <TableCell className="text-muted-foreground">{p.id}</TableCell>
            <TableCell className="font-medium">{p.product}</TableCell>
            <TableCell className="text-right">
              {p.units.toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-medium">
              ${p.revenue.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
