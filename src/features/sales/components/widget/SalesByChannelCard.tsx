import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SalesByChannelChart from "@/features/sales/components/chart/SalesByChannelChart";

export default function SalesByChannelCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por canal</CardTitle>
        <CardDescription>Distribución actual</CardDescription>
      </CardHeader>
      <CardContent>
        <SalesByChannelChart />
      </CardContent>
    </Card>
  );
}

