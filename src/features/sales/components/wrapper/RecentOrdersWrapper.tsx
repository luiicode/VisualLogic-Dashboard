"use client";

import { useEffect, useState } from "react";
import RecentOrdersTable from "../table/RecentOrdersTable";
import { fetchSalesData } from "@/lib/actions/sales";

interface VentaDMO {
  Id?: string;
  Id__c?: string;
  Cliente__c?: string;
  Producto__c?: string;
  Fecha__c?: string;
  Monto__c?: number;
  Estado__c?: any;
}

export default function RecentOrdersWrapper() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Llamamos al Server Action desde el cliente
        const ventas = await fetchSalesData();

        const formattedData = (ventas || []).map((v: VentaDMO) => ({
          id: v.Id || v.Id__c || "N/A",
          customer: v.Cliente__c || "Sin cliente",
          product: v.Producto__c || "N/A",
          date: v.Fecha__c || "N/A",
          amount: v.Monto__c || 0,
          status: v.Estado__c || "Pendiente",
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []); // Se ejecuta solo una vez al montar

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Cargando datos reales de Salesforce...
      </div>
    );
  }

  return <RecentOrdersTable data={data} />;
}
