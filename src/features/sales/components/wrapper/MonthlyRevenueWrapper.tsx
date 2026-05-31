"use client";

import { useEffect, useState } from "react";
import { fetchMonthlyRevenueData } from "@/lib/actions/sales";
import MonthlyRevenueChart from "../chart/MonthlyRevenueChart";

export default function MonthlyRevenueWrapper() {
  const [data, setData] = useState<{ month: string; revenue: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const rawData = await fetchMonthlyRevenueData();

        // Plantilla de meses en cero
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
        const monthlyRevenue = monthNames.map((month) => ({
          month,
          revenue: 0,
        }));

        // Sumamos los ingresos al mes correspondiente
        rawData.forEach((venta: any) => {
          if (venta.Fecha__c) {
            const date = new Date(venta.Fecha__c + "T00:00:00");
            const monthIndex = date.getMonth();

            if (monthIndex >= 0 && monthIndex <= 11) {
              // Toma el valor de Ingresos__c. Si está vacío, toma Monto__c.
              const amount = venta.Ingresos__c || venta.Monto__c || 0;
              monthlyRevenue[monthIndex].revenue += amount;
            }
          }
        });

        // Filtramos para mostrar desde Enero hasta el mes actual
        const currentMonth = new Date().getMonth();
        const filteredData = monthlyRevenue.slice(0, currentMonth + 1);

        setData(filteredData);
      } catch (error) {
        console.error("Error cargando gráfica de ingresos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando ingresos mensuales...
      </div>
    );
  }

  return <MonthlyRevenueChart data={data} />;
}
