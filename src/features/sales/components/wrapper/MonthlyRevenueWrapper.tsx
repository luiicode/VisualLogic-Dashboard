"use client";

import useSWR from "swr";
import { fetchMonthlyRevenueData } from "@/lib/actions/sales";
import MonthlyRevenueChart from "../chart/MonthlyRevenueChart";
import { monthNames } from "@/features/sales/constants/monthNames";

async function getAndFormatMonthlyRevenue() {
  const rawData = await fetchMonthlyRevenueData();

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
  return monthlyRevenue.slice(0, currentMonth + 1);
}

export default function MonthlyRevenueWrapper() {
  // 2. Usamos SWR con una llave única para esta gráfica ("monthly-revenue-data")
  const { data, isLoading } = useSWR(
    "monthly-revenue-data",
    getAndFormatMonthlyRevenue,
    {
      revalidateOnFocus: false, // Evita peticiones innecesarias al cambiar de pestaña
      dedupingInterval: 60000, // Usa el caché durante 1 minuto completo
    },
  );

  // 3. SWR nos da la variable isLoading automáticamente
  if (isLoading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando ingresos mensuales...
      </div>
    );
  }

  // Prevención de errores por si la data llega vacía momentáneamente
  if (!data) return null;

  return <MonthlyRevenueChart data={data} />;
}
