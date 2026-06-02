"use client";

import useSWR from "swr";
import { fetchOverviewKPIs } from "@/lib/actions/overview";
import StatCard from "@/features/Overview/components/stat/StatCard";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";

export default function KPIsFooter() {
  const { data: rawData, isLoading } = useSWR(
    "overview-kpis",
    fetchOverviewKPIs,
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  const procesarMetricas = () => {
    if (!rawData?.tickets || rawData.tickets.length === 0) {
      return { resueltos: 0, tiempoPromedio: "0m", crecimiento: "0%" };
    }

    let resueltos = 0;
    let sumaMinutos = 0;
    let countMinutos = 0;

    let ticketsMesActual = 0;
    let ticketsMesPasado = 0;

    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();
    const mesPasado = mesActual === 0 ? 11 : mesActual - 1;
    const anioPasado = mesActual === 0 ? anioActual - 1 : anioActual;

    rawData.tickets.forEach((t: any) => {
      if (t.Status__c === "Resuelto") {
        resueltos += 1;
      }

      if (t.Tiempo_Respuesta_Minutos__c != null) {
        sumaMinutos += Number(t.Tiempo_Respuesta_Minutos__c);
        countMinutos += 1;
      }

      if (t.Fecha_de_emision__c) {
        const d = new Date(t.Fecha_de_emision__c);
        if (d.getMonth() === mesActual && d.getFullYear() === anioActual)
          ticketsMesActual += 1;
        if (d.getMonth() === mesPasado && d.getFullYear() === anioPasado)
          ticketsMesPasado += 1;
      }
    });

    const avgMinutos =
      countMinutos > 0 ? Math.round(sumaMinutos / countMinutos) : 0;
    const horas = Math.floor(avgMinutos / 60);
    const minutosRestantes = avgMinutos % 60;
    const tiempoString =
      horas > 0 ? `${horas}h ${minutosRestantes}m` : `${minutosRestantes}m`;

    const crecimientoNum =
      ticketsMesPasado === 0
        ? ticketsMesActual > 0
          ? 100
          : 0
        : Math.round(
            ((ticketsMesActual - ticketsMesPasado) / ticketsMesPasado) * 100,
          );
    const crecimientoString =
      crecimientoNum >= 0 ? `+${crecimientoNum}%` : `${crecimientoNum}%`;

    return {
      resueltos,
      tiempoPromedio: tiempoString,
      crecimiento: crecimientoString,
    };
  };

  const metricas = procesarMetricas();

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-3 animate-pulse">
        <div className="h-[120px] rounded-xl bg-muted/50 border"></div>
        <div className="h-[120px] rounded-xl bg-muted/50 border"></div>
        <div className="h-[120px] rounded-xl bg-muted/50 border"></div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <StatCard
        title="Tickets resueltos"
        value={metricas.resueltos.toString()}
        hint="Total histórico"
        icon={CheckCircle2}
      />
      <StatCard
        title="Tiempo medio respuesta"
        value={metricas.tiempoPromedio}
        hint="Promedio general"
        icon={Clock}
      />
      <StatCard
        title="Crecimiento de volumen"
        value={metricas.crecimiento}
        hint="Tickets vs mes anterior"
        icon={TrendingUp}
      />
    </section>
  );
}
