import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DesempenoChart from "@/features/analytics/components/chart/DesempenoChart";

interface DesempenoData {
  label: string;
  valor: number;
}

export default function DesempenoCard({ data, labelKey }: { data: DesempenoData[]; labelKey: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempeño</CardTitle>
        <CardDescription>Promedio del equipo por {labelKey.toLowerCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <DesempenoChart data={data} />
      </CardContent>
    </Card>
  );
}

