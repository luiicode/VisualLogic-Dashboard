"use client";

import useSWR from "swr";
import { fetchDashboardAnalytics } from "@/lib/actions/analytics";
import { Period } from "@/features/analytics/types/periodType";

import DesempenoCard from "@/features/analytics/components/widget/DesempenoCard";
import CumplimientoCard from "@/features/analytics/components/widget/CumplimientoCard";
import ReportesCard from "@/features/analytics/components/widget/ReportesCard";
import ConductaCard from "@/features/analytics/components/widget/ConductaCard";
import AsistenciaCard from "@/features/analytics/components/widget/AsistenciaCard";
import TicketsCard from "@/features/analytics/components/widget/TicketsCard";

export default function AnalyticsGridSection({ period }: { period: Period }) {
  const { data: rawData, isLoading } = useSWR(
    "analytics-dashboard-v1",
    fetchDashboardAnalytics,
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  const getLabel = (fechaStr: string) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    if (period === "anio") {
      const m = fecha.getMonth();
      return m < 3 ? "Q1" : m < 6 ? "Q2" : m < 9 ? "Q3" : "Q4";
    } else if (period === "mes") {
      const day = fecha.getDate();
      return day <= 7 ? "S1" : day <= 14 ? "S2" : day <= 21 ? "S3" : "S4";
    } else if (period === "trimestre") {
      return fecha
        .toLocaleDateString("es-MX", { month: "short" })
        .toUpperCase();
    }
    return "";
  };

  const ordenEjeX =
    period === "anio"
      ? ["Q1", "Q2", "Q3", "Q4"]
      : period === "mes"
        ? ["S1", "S2", "S3", "S4"]
        : [];

  const procesarDesempeno = () => {
    // 🧹 Si no hay datos, devolvemos un array vacío
    if (!rawData?.evaluations?.length) return [];
    const buckets: Record<string, { sum: number; count: number }> = {};
    ordenEjeX.forEach((l) => (buckets[l] = { sum: 0, count: 0 }));

    rawData.evaluations.forEach((ev: any) => {
      const label = getLabel(ev.Fecha_Evaluacion__c);
      if (!label) return;
      const score =
        ((ev.Puntualidad__c || 0) +
          (ev.Colaboracion__c || 0) +
          (ev.Comunicacion__c || 0) +
          (ev.Iniciativa__c || 0) +
          (ev.Etica__c || 0)) /
        5;
      if (!buckets[label]) buckets[label] = { sum: 0, count: 0 };
      buckets[label].sum += score;
      buckets[label].count += 1;
    });

    const res = Object.keys(buckets).map((label) => ({
      label,
      valor:
        buckets[label].count > 0
          ? Math.round(buckets[label].sum / buckets[label].count)
          : 0,
    }));
    return ordenEjeX.length > 0
      ? ordenEjeX.map(
          (label) => res.find((r) => r.label === label) || { label, valor: 0 },
        )
      : res;
  };

  const procesarCumplimiento = () => {
    if (!rawData?.evaluations?.length) return [];
    const buckets: Record<string, { sum: number; count: number }> = {};
    ordenEjeX.forEach((l) => (buckets[l] = { sum: 0, count: 0 }));

    rawData.evaluations.forEach((ev: any) => {
      if (ev.Cumplimiento_Objetivos__c === undefined) return;
      const label = getLabel(ev.Fecha_Evaluacion__c);
      if (!label) return;
      if (!buckets[label]) buckets[label] = { sum: 0, count: 0 };
      buckets[label].sum += ev.Cumplimiento_Objetivos__c;
      buckets[label].count += 1;
    });

    const res = Object.keys(buckets).map((label) => ({
      label,
      valor:
        buckets[label].count > 0
          ? Math.round(buckets[label].sum / buckets[label].count)
          : 0,
    }));
    return ordenEjeX.length > 0
      ? ordenEjeX.map(
          (label) => res.find((r) => r.label === label) || { label, valor: 0 },
        )
      : res;
  };

  const procesarReportes = () => {
    if (!rawData?.reports?.length) return [];
    const buckets: Record<string, { entregados: number; pendientes: number }> =
      {};
    ordenEjeX.forEach((l) => (buckets[l] = { entregados: 0, pendientes: 0 }));

    rawData.reports.forEach((rep: any) => {
      const label = getLabel(rep.Fecha_Entrega__c);
      if (!label) return;
      if (!buckets[label]) buckets[label] = { entregados: 0, pendientes: 0 };

      if (rep.Status__c === "Entregado") buckets[label].entregados += 1;
      else if (rep.Status__c === "Pendiente") buckets[label].pendientes += 1;
    });

    const res = Object.keys(buckets).map((label) => ({
      label,
      ...buckets[label],
    }));
    return ordenEjeX.length > 0
      ? ordenEjeX.map(
          (label) =>
            res.find((r) => r.label === label) || {
              label,
              entregados: 0,
              pendientes: 0,
            },
        )
      : res;
  };

  const procesarConducta = () => {
    if (!rawData?.evaluations?.length) return [];
    let p = 0,
      c = 0,
      com = 0,
      i = 0,
      e = 0,
      count = 0;

    rawData.evaluations.forEach((ev: any) => {
      const label = getLabel(ev.Fecha_Evaluacion__c);
      if (!label) return;
      p += ev.Puntualidad__c || 0;
      c += ev.Colaboracion__c || 0;
      com += ev.Comunicacion__c || 0;
      i += ev.Iniciativa__c || 0;
      e += ev.Etica__c || 0;
      count += 1;
    });

    if (count === 0) return [];
    return [
      { metric: "Puntualidad", valor: Math.round(p / count) },
      { metric: "Colaboración", valor: Math.round(c / count) },
      { metric: "Comunicación", valor: Math.round(com / count) },
      { metric: "Iniciativa", valor: Math.round(i / count) },
      { metric: "Ética", valor: Math.round(e / count) },
    ];
  };

  const procesarAsistencia = () => {
    if (!rawData?.tickets?.length) return [];
    const buckets: Record<string, { sum: number; count: number }> = {};
    ordenEjeX.forEach((l) => (buckets[l] = { sum: 0, count: 0 }));

    rawData.tickets.forEach((t: any) => {
      if (
        t.Tiempo_Respuesta_Minutos__c === undefined ||
        t.Tiempo_Respuesta_Minutos__c === null
      )
        return;
      const label = getLabel(t.Fecha_de_emision__c);
      if (!label) return;

      if (!buckets[label]) buckets[label] = { sum: 0, count: 0 };
      buckets[label].sum += Number(t.Tiempo_Respuesta_Minutos__c);
      buckets[label].count += 1;
    });

    const res = Object.keys(buckets).map((label) => ({
      label,
      tiempo:
        buckets[label].count > 0
          ? Math.round(buckets[label].sum / buckets[label].count)
          : 0,
    }));
    return ordenEjeX.length > 0
      ? ordenEjeX.map(
          (label) => res.find((r) => r.label === label) || { label, tiempo: 0 },
        )
      : res;
  };

  const procesarTickets = () => {
    if (!rawData?.tickets?.length) return [];
    const buckets: Record<string, { resueltos: number; abiertos: number }> = {};
    ordenEjeX.forEach((l) => (buckets[l] = { resueltos: 0, abiertos: 0 }));

    rawData.tickets.forEach((t: any) => {
      const label = getLabel(t.Fecha_de_emision__c);
      if (!label) return;
      if (!buckets[label]) buckets[label] = { resueltos: 0, abiertos: 0 };

      if (t.Status__c === "Resuelto") buckets[label].resueltos += 1;
      else if (t.Status__c !== "Cancelado") buckets[label].abiertos += 1;
    });

    const res = Object.keys(buckets).map((label) => ({
      label,
      ...buckets[label],
    }));
    return ordenEjeX.length > 0
      ? ordenEjeX.map(
          (label) =>
            res.find((r) => r.label === label) || {
              label,
              resueltos: 0,
              abiertos: 0,
            },
        )
      : res;
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[300px] rounded-xl bg-muted/50 border"
          ></div>
        ))}
      </div>
    );
  }

  const labelKeys = { mes: "semana", trimestre: "mes", anio: "trimestre" };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DesempenoCard data={procesarDesempeno()} labelKey={labelKeys[period]} />
      <CumplimientoCard data={procesarCumplimiento()} />
      <ReportesCard data={procesarReportes()} />
      <ConductaCard data={procesarConducta()} />
      <AsistenciaCard data={procesarAsistencia()} />
      <TicketsCard data={procesarTickets()} />
    </div>
  );
}
