import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthlyEvolutionWrapper from "@/features/tickets/components/wrapper/MonthlyEvolutionWrapper";

export default function MonthlyEvolutionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución mensual</CardTitle>
        <CardDescription>Totales, resueltos y pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <MonthlyEvolutionWrapper />
      </CardContent>
    </Card>
  );
}
