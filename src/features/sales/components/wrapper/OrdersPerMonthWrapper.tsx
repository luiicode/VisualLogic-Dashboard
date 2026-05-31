"use client";

import useSWR from "swr";
import { fetchMonthlyOrdersData } from "@/lib/actions/sales";
import OrdersPerMonthChart from "../chart/OrdersPerMonthChart";

async function getAndFormatMonthlyOrders() {
  const rawData = await fetchMonthlyOrdersData();

  // Plantilla con los meses en cero
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const monthlyCounts = monthNames.map((month) => ({ month, orders: 0 }));

  // Sumamos una orden al mes correspondiente por cada venta
  rawData.forEach((venta: any) => {
    if (venta.Fecha__c) {
      // Se agrega T00:00:00 para evitar desajustes por zona horaria
      const date = new Date(venta.Fecha__c + "T00:00:00");
      const monthIndex = date.getMonth();

      if (monthIndex >= 0 && monthIndex <= 11) {
        monthlyCounts[monthIndex].orders += 1;
      }
    }
  });

  // Noté que en tu código cambiaste a currentMonth + 12 para ver todo el año.
  // Respetamos esa misma lógica para que te devuelva el arreglo completo.
  const currentMonth = new Date().getMonth();
  return monthlyCounts.slice(0, currentMonth + 12);
}

export default function OrdersPerMonthWrapper() {
  // 2. Usamos SWR con su llave única ("monthly-orders-data")
  const { data, isLoading } = useSWR(
    "monthly-orders-data",
    getAndFormatMonthlyOrders,
    {
      revalidateOnFocus: false, // Protege tu límite de peticiones de Salesforce
      dedupingInterval: 60000, // Mantiene los datos en caché por 1 minuto
    },
  );

  // 3. Renderizamos el estado de carga que nos provee SWR
  if (isLoading) {
    return (
      <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground animate-pulse">
        Calculando volumen de transacciones...
      </div>
    );
  }

  // Prevenimos el crasheo si por alguna razón la data es indefinida
  if (!data) return null;

  return <OrdersPerMonthChart data={data} />;
}
