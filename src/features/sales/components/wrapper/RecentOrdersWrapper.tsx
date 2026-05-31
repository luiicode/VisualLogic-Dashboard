"use client";

import useSWR from "swr";
import RecentOrdersTable from "../table/RecentOrdersTable";
import { fetchSalesData } from "@/lib/actions/sales";

import { VentaDMO } from "@/features/sales/interfaces/VentaDMO";

async function getAndFormatRecentOrders() {
  const ventas = await fetchSalesData();

  return (ventas || []).map((v: VentaDMO) => ({
    id: v.Id || v.Id__c || "N/A",
    customer: v.Cliente__c || "Sin cliente",
    product: v.Producto__c || "N/A",
    date: v.Fecha__c || "N/A",
    amount: v.Monto__c || 0,
    status: v.Estado__c || "Pendiente",
  }));
}

export default function RecentOrdersWrapper() {
  // 2. Implementamos SWR con la llave "recent-orders-data"
  const { data, isLoading } = useSWR(
    "recent-orders-data",
    getAndFormatRecentOrders,
    {
      revalidateOnFocus: false, // Evita llamadas extra al cambiar de pestaña
      dedupingInterval: 60000, // Mantiene los datos cacheados por 1 minuto
    },
  );

  // 3. Manejamos el estado de carga que provee SWR automáticamente
  if (isLoading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">
        Cargando datos reales de Salesforce...
      </div>
    );
  }

  // Prevenimos errores si la data aún no está disponible
  if (!data) return null;

  return <RecentOrdersTable data={data} />;
}
