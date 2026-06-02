"use client";

import useSWR from "swr";
import { fetchTicketsData } from "@/lib/actions/tickets";
import StatusDistributionChart from "../chart/StatusDistributionChart";
import { getColorForStatus } from "@/features/tickets/constants/getColorForStatus";

async function getAndFormatStatusDistribution() {
  const rawData = await fetchTicketsData();

  // Objeto para contar cuántos tickets hay por cada estado
  const statusCount: Record<string, number> = {};

  rawData.forEach((ticket: any) => {
    const status = ticket.Status__c || "Desconocido";

    if (!statusCount[status]) {
      statusCount[status] = 0;
    }
    statusCount[status] += 1;
  });

  // Convertimos el objeto en el arreglo que necesita Recharts
  return Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
    color: getColorForStatus(key),
  }));
}

export default function StatusDistributionWrapper() {
  const { data, isLoading } = useSWR(
    "status-distribution-data",
    getAndFormatStatusDistribution,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minuto de caché
    },
  );

  if (isLoading) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando distribución...
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return <StatusDistributionChart data={data} />;
}
