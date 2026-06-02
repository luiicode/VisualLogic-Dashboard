"use client";

import useSWR from "swr";
import { fetchMonthlyTicketsData } from "@/lib/actions/tickets";
import ResolvedVsPendingChart from "../chart/ResolvedVsPendingChart";

async function getAndFormatResolvedVsPending() {
  const rawData = await fetchMonthlyTicketsData();

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
  const monthlyData = monthNames.map((month) => ({
    month,
    resueltos: 0,
    pendientes: 0,
  }));

  rawData.forEach((ticket: any) => {
    const dateStr = ticket.CreatedDate || ticket.Fecha__c;

    if (dateStr) {
      const date = new Date(dateStr);
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex <= 11) {
        const estado = (ticket.Status__c || "").toLowerCase();

        if (
          estado.includes("resuelto") ||
          estado.includes("completado") ||
          estado.includes("cerrado")
        ) {
          monthlyData[monthIndex].resueltos += 1;
        } else if (
          estado.includes("pendiente") ||
          estado.includes("abierto") ||
          estado.includes("en progreso") ||
          estado.includes("nuevo")
        ) {
          monthlyData[monthIndex].pendientes += 1;
        }
      }
    }
  });

  // Mostramos desde Enero hasta el mes actual
  const currentMonth = new Date().getMonth();
  return monthlyData.slice(0, currentMonth + 1);
}

export default function ResolvedVsPendingWrapper() {
  const { data, isLoading } = useSWR(
    "resolved-vs-pending-data",
    getAndFormatResolvedVsPending,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minuto de caché
    },
  );

  if (isLoading) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Procesando comparativa...
      </div>
    );
  }

  if (!data) return null;

  return <ResolvedVsPendingChart data={data} />;
}
