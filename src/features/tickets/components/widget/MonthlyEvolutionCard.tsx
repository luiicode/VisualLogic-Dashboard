import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyEvolutionChart from "@/features/tickets/components/chart/MonthlyEvolutionChart";

export default function MonthlyEvolutionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución mensual</CardTitle>
        <CardDescription>Totales, resueltos y pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <MonthlyEvolutionChart />
      </CardContent>
    </Card>
  );
}

