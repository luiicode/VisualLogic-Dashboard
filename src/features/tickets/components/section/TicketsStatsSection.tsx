"use client";

import useSWR from "swr";
import StatCard from "@/features/tickets/components/stat/StatCard";
import { fetchTicketsData } from "@/lib/actions/tickets";
import { CheckCircle2, Clock, TicketIcon } from "lucide-react";

async function getAndFormatTicketStats() {
  const rawData = await fetchTicketsData();

  let total = 0;
  let resolved = 0;
  let pending = 0;

  rawData.forEach((ticket: any) => {
    total++;

    // Normalizamos el texto a minúsculas para que sea fácil compararlo
    const estado = (ticket.Status__c || "").toLowerCase();

    if (
      estado.includes("resuelto") ||
      estado.includes("completado") ||
      estado.includes("cerrado")
    ) {
      resolved++;
    } else if (
      estado.includes("pendiente") ||
      estado.includes("abierto") ||
      estado.includes("en progreso") ||
      estado.includes("nuevo")
    ) {
      pending++;
    }
  });

  return { total, resolved, pending };
}

export default function TicketsStatsSection() {

  const { data, isLoading } = useSWR(
    "ticket-stats-data",
    getAndFormatTicketStats,
    {
      revalidateOnFocus: false, // Protegemos los límites de tu API
      dedupingInterval: 60000, // Caché de 1 minuto
    },
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[120px] rounded-xl bg-muted/50 border"
          ></div>
        ))}
      </div>
    );
  }

  // Prevenimos crasheos si la data llega vacía
  const stats = data || { total: 0, resolved: 0, pending: 0 };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Tickets totales"
        value={stats.total}
        icon={TicketIcon}
        accent="text-blue-500"
      />
      <StatCard
        title="Resueltos"
        value={stats.resolved}
        icon={CheckCircle2}
        accent="text-emerald-500"
      />
      <StatCard
        title="Pendientes"
        value={stats.pending}
        icon={Clock}
        accent="text-amber-500"
      />
    </div>
  );
}
