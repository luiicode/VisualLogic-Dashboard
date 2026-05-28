import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersPerMonthChart from "@/features/sales/components/chart/OrdersPerMonthChart";

export default function OrdersPerMonthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos por mes</CardTitle>
        <CardDescription>Volumen de transacciones</CardDescription>
      </CardHeader>
      <CardContent>
        <OrdersPerMonthChart />
      </CardContent>
    </Card>
  );
}

