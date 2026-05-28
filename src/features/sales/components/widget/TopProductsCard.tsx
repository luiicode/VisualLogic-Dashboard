import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TopProductsTable from "@/features/sales/components/table/TopProductsTable";

export default function TopProductsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos top</CardTitle>
        <CardDescription>Ranking por ingresos generados</CardDescription>
      </CardHeader>
      <CardContent>
        <TopProductsTable />
      </CardContent>
    </Card>
  );
}

