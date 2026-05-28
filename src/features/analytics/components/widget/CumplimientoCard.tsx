import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CumplimientoChart from "@/features/analytics/components/chart/CumplimientoChart";

interface CumplimientoData {
  label: string;
  valor: number;
}

export default function CumplimientoCard({ data }: { data: CumplimientoData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumplimiento</CardTitle>
        <CardDescription>% de objetivos cumplidos</CardDescription>
      </CardHeader>
      <CardContent>
        <CumplimientoChart data={data} />
      </CardContent>
    </Card>
  );
}

