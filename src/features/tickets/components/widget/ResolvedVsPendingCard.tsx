import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResolvedVsPendingWrapper from "@/features/tickets/components/wrapper/ResolvedVsPendingWrapper";

export default function ResolvedVsPendingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resueltos vs Pendientes</CardTitle>
        <CardDescription>Comparativa mensual</CardDescription>
      </CardHeader>
      <CardContent>
        <ResolvedVsPendingWrapper />
      </CardContent>
    </Card>
  );
}
