import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TopProductsWrapper from "@/features/sales/components/wrapper/TopProductsWrapper";
import { Suspense } from "react";

export default function TopProductsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos top</CardTitle>
        <CardDescription>Ranking por ingresos generados</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando datos de Salesforce...</div>}>
          <TopProductsWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
