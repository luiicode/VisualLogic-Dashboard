import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusDistributionChart from "@/features/tickets/components/chart/StatusDistributionChart";

export default function StatusDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por estado</CardTitle>
        <CardDescription>Proporción actual de tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <StatusDistributionChart />
      </CardContent>
    </Card>
  );
}

