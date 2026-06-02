import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusDistributionWrapper from "@/features/tickets/components/wrapper/StatusDistributionWrapper";

export default function StatusDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por estado</CardTitle>
        <CardDescription>Proporción actual de tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <StatusDistributionWrapper />
      </CardContent>
    </Card>
  );
}
