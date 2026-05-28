import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { topProducts } from "@/features/sales/constants/topProducts";

export default function TopProductsTable() {
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
        {topProducts.map((p, i) => (
          <TableRow key={p.name}>
            <TableCell className="text-muted-foreground">{i + 1}</TableCell>
            <TableCell className="font-medium">{p.name}</TableCell>
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

