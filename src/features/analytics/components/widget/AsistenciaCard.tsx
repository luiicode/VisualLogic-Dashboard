import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AsistenciaChart from "@/features/analytics/components/chart/AsistenciaChart";

interface AsistenciaData {
  label: string;
  tiempo: number;
}

export default function AsistenciaCard({ data }: { data: AsistenciaData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencia rápida</CardTitle>
        <CardDescription>Tiempo promedio de primera respuesta (min)</CardDescription>
      </CardHeader>
      <CardContent>
        <AsistenciaChart data={data} />
      </CardContent>
    </Card>
  );
}

