"use client";

import { useEffect, useState } from "react";
import { fetchTopProductsData } from "@/lib/actions/sales";
import TopProductsTable from "../table/TopProductsTable";

interface TopProductRecord {
  Producto__c?: string;
  TotalUnidades?: number;
  TotalIngresos?: number;
}

export default function TopProductsWrapper() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const productos = await fetchTopProductsData();

        // Mapeamos los datos de Data Cloud al formato que esperado
        const formattedData = (productos || []).map(
          (p: TopProductRecord, index: number) => ({
            id: index + 1, // Esto genera el número de ranking (#) automáticamente (1, 2, 3...)
            product: p.Producto__c || "N/A",
            units: p.TotalUnidades || 0,
            revenue: p.TotalIngresos || 0,
          }),
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error cargando productos top:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground animate-pulse">
        Calculando ranking de productos top...
      </div>
    );
  }

  return <TopProductsTable data={data} />;
}
