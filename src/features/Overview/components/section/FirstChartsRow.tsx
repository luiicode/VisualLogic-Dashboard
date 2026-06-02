"use client";

import useSWR from "swr";
import { fetchOverviewKPIs } from "@/lib/actions/overview";

import RevenueCard from "@/features/Overview/components/widget/RevenueCard";
import TicketStatusCard from "@/features/Overview/components/widget/TicketStatusCard";

export default function FirstChartsRow() {
  const { data: rawData, isLoading } = useSWR(
    "overview-kpis",
    fetchOverviewKPIs,
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  // 🎯 1. Procesar Ingresos Mensuales (Últimos 6 meses reales)
  const procesarIngresosDinamicos = () => {
    if (!rawData?.revenues?.length) return [];

    // Generamos las etiquetas ordenadas de los últimos 6 meses (Ene, Feb...)
    const mesesFiltro = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const nombreMes = d
        .toLocaleDateString("es-MX", { month: "short" })
        .replace(".", "");
      return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    });

    const buckets: Record<string, number> = {};
    mesesFiltro.forEach((m) => (buckets[m] = 0));

    rawData.revenues.forEach((rev: any) => {
      if (!rev.Fecha__c || rev.Monto__c == null) return;

      const d = new Date(rev.Fecha__c);
      const mesTicket = d
        .toLocaleDateString("es-MX", { month: "short" })
        .replace(".", "");
      const label = mesTicket.charAt(0).toUpperCase() + mesTicket.slice(1);

      // Si el registro cae dentro de los últimos 6 meses, sumamos su monto
      if (buckets[label] !== undefined) {
        buckets[label] += Number(rev.Monto__c);
      }
    });

    return mesesFiltro.map((month) => ({
      month,
      revenue: buckets[month],
    }));
  };

  // 🎯 2. Procesar Distribución de Tickets (Dona)
  const procesarDistribucionTickets = () => {
    if (!rawData?.tickets || rawData.tickets.length === 0) return [];

    let resueltos = 0;
    let pendientes = 0;
    let cancelados = 0;

    rawData.tickets.forEach((t: any) => {
      if (t.Status__c === "Resuelto") resueltos += 1;
      else if (t.Status__c === "Cancelado") cancelados += 1;
      else pendientes += 1;
    });

    return [
      { name: "Resueltos", value: resueltos, fill: "#10b981" },
      { name: "Pendientes", value: pendientes, fill: "#f59e0b" },
      { name: "Cancelados", value: cancelados, fill: "#ef4444" },
    ].filter((item) => item.value > 0);
  };

  const revenueDynamicData = procesarIngresosDinamicos();
  const ticketPieData = procesarDistribucionTickets();

  if (isLoading) {
    return (
      <section className="grid gap-4 lg:grid-cols-3 animate-pulse">
        <div className="h-[350px] rounded-xl bg-muted/50 border lg:col-span-2"></div>
        <div className="h-[350px] rounded-xl bg-muted/50 border"></div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <RevenueCard data={revenueDynamicData} />
      <TicketStatusCard data={ticketPieData} />
    </section>
  );
}
