"use client";

import { useEffect, useState } from "react";
import { fetchMonthlyOrdersData } from "@/lib/actions/sales";
import OrdersPerMonthChart from "../chart/OrdersPerMonthChart";

export default function OrdersPerMonthWrapper() {
  const [data, setData] = useState<{ month: string; orders: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const rawData = await fetchMonthlyOrdersData();

        // Plantilla con los meses en cero
        const monthNames = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ];
        const monthlyCounts = monthNames.map((month) => ({ month, orders: 0 }));

        // Sumamos una orden al mes correspondiente por cada venta
        rawData.forEach((venta: any) => {
          if (venta.Fecha__c) {
            // Se agrega T00:00:00 para evitar desajustes por zona horaria
            const date = new Date(venta.Fecha__c + "T00:00:00");
            const monthIndex = date.getMonth(); // 0 para Ene, 11 para Dic
            if (monthIndex >= 0 && monthIndex <= 11) {
              monthlyCounts[monthIndex].orders += 1;
            }
          }
        });

        // Mostramos solo de Enero (0) al mes actual (para no tener la mitad de la gráfica en 0)
        // Puedes cambiar currentMonth + 1 por 12 si prefieres ver todo el año
        const currentMonth = new Date().getMonth();
        const filteredData = monthlyCounts.slice(0, currentMonth + 12);

        setData(filteredData);
      } catch (error) {
        console.error("Error cargando gráfica de meses:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando volumen de transacciones...
      </div>
    );
  }

  return <OrdersPerMonthChart data={data} />;
}
