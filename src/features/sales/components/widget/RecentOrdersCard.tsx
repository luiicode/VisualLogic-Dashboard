import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentOrdersWrapper from "@/features/sales/components/wrapper/RecentOrdersWrapper";
import { Suspense } from "react";

export default function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos recientes</CardTitle>
        <CardDescription>Últimas transacciones registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando datos de Salesforce...</div>}>
          <RecentOrdersWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
