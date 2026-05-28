import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReportesChart from "@/features/analytics/components/chart/ReportesChart";

interface ReportesData {
  label: string;
  entregados: number;
  pendientes: number;
}

export default function ReportesCard({ data }: { data: ReportesData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportes</CardTitle>
        <CardDescription>Entregados vs pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <ReportesChart data={data} />
      </CardContent>
    </Card>
  );
}

