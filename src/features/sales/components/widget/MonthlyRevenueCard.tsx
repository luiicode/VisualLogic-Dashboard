import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import MonthlyRevenueWrapper from "@/features/sales/components/wrapper/MonthlyRevenueWrapper";

export default function MonthlyRevenueCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Ingresos mensuales</CardTitle>
        <CardDescription>Últimos 8 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando datos de Salesforce.....</div>}>
          <MonthlyRevenueWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
