"use client";

import useSWR from "swr";
import { fetchOverviewKPIs } from "@/lib/actions/overview";

import RecentTicketsCard from "@/features/Overview/components/widget/RecentTicketsCard";
import RecentReportsCard from "@/features/Overview/components/widget/RecentReportsCard";

export default function TablesSection() {
  const { data: rawData, isLoading } = useSWR(
    "overview-kpis",
    fetchOverviewKPIs,
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  const procesarTickets = () => {
    if (!rawData?.tickets?.length) return [];

    const ticketsOrdenados = [...rawData.tickets].sort((a, b) => {
      const dateA = new Date(a.Fecha_de_emision__c || 0).getTime();
      const dateB = new Date(b.Fecha_de_emision__c || 0).getTime();
      return dateB - dateA;
    });

    return ticketsOrdenados.slice(0, 5).map((t: any) => ({
      id: t.Name || "#TKT-N/A",
      user: t.Trabajador_encargado__c || "Sin asignar",
      status: t.Status__c || "Pendiente",
      date: t.Fecha_de_emision__c
        ? t.Fecha_de_emision__c.split("T")[0]
        : "Sin fecha",
    }));
  };

  const procesarReportes = () => {
    if (!rawData?.reports?.length) return [];

    const reportesOrdenados = [...rawData.reports].sort((a, b) => {
      const dateA = new Date(a.Fecha_Entrega__c || 0).getTime();
      const dateB = new Date(b.Fecha_Entrega__c || 0).getTime();
      return dateB - dateA;
    });

    return reportesOrdenados.slice(0, 5).map((r: any) => ({
      id: "Rep_Op",
      status: r.Status__c || "Pendiente",
      date: r.Fecha_Entrega__c ? r.Fecha_Entrega__c.split("T")[0] : "Sin fecha",
    }));
  };

  if (isLoading) {
    return (
      <section className="grid gap-4 lg:grid-cols-2 animate-pulse">
        <div className="h-[300px] rounded-xl bg-muted/50 border"></div>
        <div className="h-[300px] rounded-xl bg-muted/50 border"></div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <RecentReportsCard data={procesarReportes()} />
      <RecentTicketsCard data={procesarTickets()} />
    </section>
  );
}
