"use client";

import useSWR from "swr";
import { fetchOverviewKPIs } from "@/lib/actions/overview";

import PerformanceCard from "@/features/Overview/components/widget/PerformanceCard";
import TicketsCard from "@/features/Overview/components/widget/TicketsCard";

export default function SecondChartsRow() {
  const { data: rawData, isLoading } = useSWR(
    "overview-kpis",
    fetchOverviewKPIs,
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  const procesarTicketsBarras = () => {
    if (!rawData?.tickets?.length) return [];

    const ultimos6Meses = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const mes = d
        .toLocaleDateString("es-MX", { month: "short" })
        .replace(".", "");
      return mes.charAt(0).toUpperCase() + mes.slice(1);
    });

    const buckets: Record<string, { resolved: number; pending: number }> = {};
    ultimos6Meses.forEach((m) => (buckets[m] = { resolved: 0, pending: 0 }));

    rawData.tickets.forEach((t: any) => {
      if (!t.Fecha_de_emision__c) return;
      const d = new Date(t.Fecha_de_emision__c);
      const mesTicket = d
        .toLocaleDateString("es-MX", { month: "short" })
        .replace(".", "");
      const label = mesTicket.charAt(0).toUpperCase() + mesTicket.slice(1);

      if (buckets[label]) {
        if (t.Status__c === "Resuelto") buckets[label].resolved += 1;
        else if (t.Status__c !== "Cancelado") buckets[label].pending += 1;
      }
    });

    return ultimos6Meses.map((mes) => ({
      month: mes,
      resolved: buckets[mes].resolved,
      pending: buckets[mes].pending,
    }));
  };

  const procesarPerformance = () => {
    if (!rawData?.evaluations?.length) return [];

    const buckets: Record<
      string,
      { sumaDesempeno: number; sumaCumplimiento: number; count: number }
    > = {
      S1: { sumaDesempeno: 0, sumaCumplimiento: 0, count: 0 },
      S2: { sumaDesempeno: 0, sumaCumplimiento: 0, count: 0 },
      S3: { sumaDesempeno: 0, sumaCumplimiento: 0, count: 0 },
      S4: { sumaDesempeno: 0, sumaCumplimiento: 0, count: 0 },
    };

    rawData.evaluations.forEach((ev: any) => {
      if (!ev.Fecha_Evaluacion__c) return;

      const day = new Date(ev.Fecha_Evaluacion__c).getDate();
      const label =
        day <= 7 ? "S1" : day <= 14 ? "S2" : day <= 21 ? "S3" : "S4";

      const scoreDesempeno =
        ((ev.Puntualidad__c || 0) +
          (ev.Colaboracion__c || 0) +
          (ev.Comunicacion__c || 0) +
          (ev.Iniciativa__c || 0) +
          (ev.Etica__c || 0)) /
        5;
      const scoreCumplimiento = ev.Cumplimiento_Objetivos__c || 0;

      buckets[label].sumaDesempeno += scoreDesempeno;
      buckets[label].sumaCumplimiento += scoreCumplimiento;
      buckets[label].count += 1;
    });

    return ["S1", "S2", "S3", "S4"].map((week) => ({
      week,
      desempeño:
        buckets[week].count > 0
          ? Math.round(buckets[week].sumaDesempeno / buckets[week].count)
          : 0,
      cumplimiento:
        buckets[week].count > 0
          ? Math.round(buckets[week].sumaCumplimiento / buckets[week].count)
          : 0,
    }));
  };

  if (isLoading) {
    return (
      <section className="grid gap-4 lg:grid-cols-2 animate-pulse">
        <div className="h-[350px] rounded-xl bg-muted/50 border"></div>
        <div className="h-[350px] rounded-xl bg-muted/50 border"></div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <TicketsCard data={procesarTicketsBarras()} />
      <PerformanceCard data={procesarPerformance()} />
    </section>
  );
}
