import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResolvedVsPendingChart from "@/features/tickets/components/chart/ResolvedVsPendingChart";

export default function ResolvedVsPendingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resueltos vs Pendientes</CardTitle>
        <CardDescription>Comparativa mensual</CardDescription>
      </CardHeader>
      <CardContent>
        <ResolvedVsPendingChart />
      </CardContent>
    </Card>
  );
}

