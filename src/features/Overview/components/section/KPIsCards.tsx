"use client";

import useSWR from "swr";
import StatCard from "@/features/Overview/components/stat/StatCard";
import { DollarSign, ShoppingCart, UsersIcon, TicketIcon } from "lucide-react";
import { fetchOverviewKPIs } from "@/lib/actions/overview";

export default function KPIsCards() {
  const { data, isLoading } = useSWR("overview-kpis", fetchOverviewKPIs, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const procesarTickets = () => {
    if (!data?.tickets || data.tickets.length === 0) {
      return { abiertos: 0, hoy: 0 };
    }

    let abiertos = 0;
    let hoy = 0;

    const fechaHoyStr = new Date().toISOString().split("T")[0];

    data.tickets.forEach((t: any) => {
      const isAbierto =
        t.Status__c !== "Resuelto" && t.Status__c !== "Cancelado";

      if (isAbierto) {
        abiertos += 1;

        if (
          t.Fecha_de_emision__c &&
          t.Fecha_de_emision__c.startsWith(fechaHoyStr)
        ) {
          hoy += 1;
        }
      }
    });

    return { abiertos, hoy };
  };

  const ticketsData = procesarTickets();

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[120px] rounded-xl bg-muted/50 border" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Ingresos totales"
        value="$357K"
        hint="+12.4% vs mes anterior"
        icon={DollarSign}
      />
      <StatCard
        title="Órdenes"
        value="2,730"
        hint="+8.1% vs mes anterior"
        icon={ShoppingCart}
      />
      <StatCard
        title="Usuarios activos"
        value="1,284"
        hint="+3.2% nuevos"
        icon={UsersIcon}
      />

      <StatCard
        title="Tickets abiertos"
        value={ticketsData.abiertos.toString()}
        hint={`${ticketsData.hoy} pendientes hoy`}
        icon={TicketIcon}
      />
    </section>
  );
}
