import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import SalesByStatusWrapper from "@/features/sales/components/wrapper/SalesByStatusWrapper";

export default function SalesByStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Status</CardTitle>
        <CardDescription>Distribución actual</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando datos de Salesforce......</div>}>
          <SalesByStatusWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
