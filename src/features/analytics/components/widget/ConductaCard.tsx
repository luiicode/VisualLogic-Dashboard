import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ConductaChart from "@/features/analytics/components/chart/ConductaChart";

interface ConductaData {
  metric: string;
  valor: number;
}

export default function ConductaCard({ data }: { data: ConductaData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conducta</CardTitle>
        <CardDescription>Evaluación cualitativa del equipo</CardDescription>
      </CardHeader>
      <CardContent>
        <ConductaChart data={data} />
      </CardContent>
    </Card>
  );
}

