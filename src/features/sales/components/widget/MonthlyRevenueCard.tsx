import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyRevenueChart from "@/features/sales/components/chart/MonthlyRevenueChart";

export default function MonthlyRevenueCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Ingresos mensuales</CardTitle>
        <CardDescription>Últimos 8 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <MonthlyRevenueChart />
      </CardContent>
    </Card>
  );
}

