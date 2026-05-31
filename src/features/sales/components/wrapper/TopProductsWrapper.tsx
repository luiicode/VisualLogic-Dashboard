"use client";

import useSWR from "swr";
import { fetchTopProductsData } from "@/lib/actions/sales";
import TopProductsTable from "../table/TopProductsTable";
import { TopProductRecord } from "@/features/sales/interfaces/TopProductRecord";

async function getAndFormatTopProducts() {
  const productos = await fetchTopProductsData();

  // Mapeamos los datos de Data Cloud al formato esperado
  return (productos || []).map((p: TopProductRecord, index: number) => ({
    id: index + 1, // Esto genera el número de ranking (#) automáticamente (1, 2, 3...)
    product: p.Producto__c || "N/A",
    units: p.TotalUnidades || 0,
    revenue: p.TotalIngresos || 0,
  }));
}

export default function TopProductsWrapper() {
  // 2. Usamos SWR con la llave "top-products-data"
  const { data, isLoading } = useSWR(
    "top-products-data",
    getAndFormatTopProducts,
    {
      revalidateOnFocus: false, // Protege los límites de la API
      dedupingInterval: 60000, // 1 minuto de caché
    },
  );

  // 3. Manejamos la carga de SWR
  if (isLoading) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground animate-pulse">
        Calculando ranking de productos top...
      </div>
    );
  }

  // Prevenimos que la tabla falle si data es undefined por un instante
  if (!data) return null;

  return <TopProductsTable data={data} />;
}
