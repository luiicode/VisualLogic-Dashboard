"use client";

import useSWR from "swr";
import { fetchDetailedTicketsData } from "@/lib/actions/tickets";
import TicketSectionCard from "@/features/tickets/components/widget/TicketSectionCard";
import { TicketRow } from "@/features/tickets/interfaces/TicketRow";
import { TicketGroup } from "@/features/tickets/interfaces/TicketGroup";

async function getAndFormatTicketsList() {
  const rawData = await fetchDetailedTicketsData();
  const groups: Record<string, TicketRow[]> = {};

  rawData.forEach((ticket: any) => {
    const tipo = ticket.Tipo__c || "Sin clasificar";

    if (!groups[tipo]) {
      groups[tipo] = [];
    }

    const rawDate = ticket.Fecha_de_emision__c || "";
    const formattedDate = rawDate
      ? new Date(rawDate).toISOString().split("T")[0]
      : "N/A";

    groups[tipo].push({
      orderId: ticket.Name || "N/A",
      user: ticket.Trabajador_encargado__c || "Sin asignar",
      email: ticket.Correo__c || "Sin correo",
      status: ticket.Status__c || "Pendiente",
      date: formattedDate,
    });
  });

  return Object.keys(groups).map((key) => ({
    section: key,
    rows: groups[key],
  }));
}

export default function TicketsListWrapper() {
  const { data: groups, isLoading } = useSWR<TicketGroup[]>(
    "detailed-tickets-list-v5",
    getAndFormatTicketsList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-[250px] w-full rounded-xl bg-muted/50 border"
          ></div>
        ))}
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-6">
        No hay tickets registrados en el sistema.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <TicketSectionCard
          key={group.section}
          sectionName={group.section}
          rows={group.rows}
        />
      ))}
    </div>
  );
}
