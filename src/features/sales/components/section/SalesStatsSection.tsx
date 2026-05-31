"use client";

import { useEffect, useState } from "react";
import StatCard from "@/features/sales/components/stat/StatCard";
import { fetchSalesStatsData } from "@/lib/actions/sales";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function SalesStatsSection() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    newClients: 0,
    avgTicket: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchSalesStatsData();
        setStats(data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[120px] rounded-xl bg-muted/50 border"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={DollarSign}
        label="Ingresos totales"
        value={`$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        delta="+12.4% vs período previo"
      />
      <StatCard
        icon={ShoppingCart}
        label="Pedidos"
        value={stats.totalOrders.toLocaleString()}
        delta="+8.1%"
      />
      <StatCard
        icon={Users}
        label="Clientes únicos"
        value={stats.newClients.toString()}
        delta="+4.6%"
      />
      <StatCard
        icon={TrendingUp}
        label="Ticket promedio"
        value={`$${stats.avgTicket.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        delta="+3.2%"
      />
    </div>
  );
}
