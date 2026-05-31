import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import OrdersPerMonthWrapper from "@/features/sales/components/wrapper/OrdersPerMonthWrapper";

export default function OrdersPerMonthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos por mes</CardTitle>
        <CardDescription>Volumen de transacciones</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando datos de Salesforce...</div>}>
          <OrdersPerMonthWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
