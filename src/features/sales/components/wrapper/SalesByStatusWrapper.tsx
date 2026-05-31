"use client";

import useSWR from "swr";
import { fetchSalesByStatusData } from "@/lib/actions/sales";
import SalesByStatusChart from "@/features/sales/components/chart/SalesByStatusChart";

async function getAndFormatSalesByStatus() {
  const rawData = await fetchSalesByStatusData();

  // Objeto para agrupar las sumas
  const statusMap: Record<string, number> = {};

  rawData.forEach((venta: any) => {
    const status = venta.Estado__c || "Desconocido";
    // Usamos Ingresos si existe, si no, el Monto normal
    const amount = venta.Ingresos__c || venta.Monto__c || 0;

    if (!statusMap[status]) {
      statusMap[status] = 0;
    }
    statusMap[status] += amount;
  });

  // Convertimos el objeto en el array que necesita Recharts
  const chartData = Object.keys(statusMap).map((key) => ({
    name: key,
    value: statusMap[key],
  }));

  // Ordenamos de mayor a menor monto
  return chartData.sort((a, b) => b.value - a.value);
}

export default function SalesByStatusWrapper() {
  // 2. Usamos SWR con su llave única ("sales-by-status-data")
  const { data, isLoading } = useSWR(
    "sales-by-status-data",
    getAndFormatSalesByStatus,
    {
      revalidateOnFocus: false, // Protege tu límite de API en Salesforce
      dedupingInterval: 60000, // Mantiene la distribución en caché por 1 minuto
    },
  );

  // 3. Renderizamos la pantalla de carga con la variable de SWR
  if (isLoading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando distribución...
      </div>
    );
  }

  // Prevenimos fallos visuales si la data no está lista
  if (!data) return null;

  return <SalesByStatusChart data={data} />;
}
