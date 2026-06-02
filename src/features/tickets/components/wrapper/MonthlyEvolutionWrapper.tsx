"use client";

import useSWR from "swr";
import { fetchMonthlyTicketsData } from "@/lib/actions/tickets";
import MonthlyEvolutionChart from "../chart/MonthlyEvolutionChart";

async function getAndFormatMonthlyTickets() {
  const rawData = await fetchMonthlyTicketsData();

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
    total: 0,
    resueltos: 0,
    pendientes: 0,
  }));

  rawData.forEach((ticket: any) => {
    const dateStr = ticket.CreatedDate || ticket.Fecha__c;

    if (dateStr) {
      // Intentamos parsear la fecha limpiamente
      const date = new Date(dateStr);
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex <= 11) {
        monthlyData[monthIndex].total += 1; // Sumamos 1 al total del mes

        const estado = (ticket.Status__c || "").toLowerCase();

        // Clasificamos resueltos vs pendientes
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

  // Mostramos solo de Enero hasta el mes actual para no tener la mitad del año plana
  const currentMonth = new Date().getMonth();
  return monthlyData.slice(0, currentMonth + 1);
}

export default function MonthlyEvolutionWrapper() {
  const { data, isLoading } = useSWR(
    "monthly-tickets-evolution",
    getAndFormatMonthlyTickets,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minuto de caché
    },
  );

  if (isLoading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Analizando evolución de tickets...
      </div>
    );
  }

  if (!data) return null;

  return <MonthlyEvolutionChart data={data} />;
}
