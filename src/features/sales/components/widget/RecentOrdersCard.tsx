import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecentOrdersTable from "@/features/sales/components/table/RecentOrdersTable";

export default function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos recientes</CardTitle>
        <CardDescription>Últimas transacciones registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentOrdersTable />
      </CardContent>
    </Card>
  );
}

