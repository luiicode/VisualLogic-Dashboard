"use client";

import { useEffect, useState } from "react";
import { fetchSalesByStatusData } from "@/lib/actions/sales";
import SalesByStatusChart from "@/features/sales/components/chart/SalesByStatusChart";

export default function SalesByStatusWrapper() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
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
        chartData.sort((a, b) => b.value - a.value);

        setData(chartData);
      } catch (error) {
        console.error("Error cargando gráfica de estados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando distribución...
      </div>
    );
  }

  return <SalesByStatusChart data={data} />;
}
