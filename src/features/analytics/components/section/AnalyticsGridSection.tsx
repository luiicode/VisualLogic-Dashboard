"use client";

import { datasets } from "@/features/analytics/data/datasets";
import { Period } from "@/features/analytics/types/periodType";
import DesempenoCard from "@/features/analytics/components/widget/DesempenoCard";
import CumplimientoCard from "@/features/analytics/components/widget/CumplimientoCard";
import ReportesCard from "@/features/analytics/components/widget/ReportesCard";
import ConductaCard from "@/features/analytics/components/widget/ConductaCard";
import AsistenciaCard from "@/features/analytics/components/widget/AsistenciaCard";
import TicketsCard from "@/features/analytics/components/widget/TicketsCard";

export default function AnalyticsGridSection({ period }: { period: Period }) {
  const d = datasets[period];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DesempenoCard data={d.desempeno} labelKey={d.labelKey} />
      <CumplimientoCard data={d.cumplimiento} />
      <ReportesCard data={d.reportes} />
      <ConductaCard data={d.conducta} />
      <AsistenciaCard data={d.asistencia} />
      <TicketsCard data={d.tickets} />
    </div>
  );
}

