import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TicketsChart from "@/features/analytics/components/chart/TicketsChart";

interface TicketsData {
  label: string;
  resueltos: number;
  abiertos: number;
}

export default function TicketsCard({ data }: { data: TicketsData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolución de tickets</CardTitle>
        <CardDescription>Resueltos vs abiertos</CardDescription>
      </CardHeader>
      <CardContent>
        <TicketsChart data={data} />
      </CardContent>
    </Card>
  );
}

