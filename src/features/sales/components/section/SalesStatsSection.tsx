import StatCard from "@/features/sales/components/stat/StatCard";
import { monthly } from "@/features/sales/constants/monthly";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function SalesStatsSection() {
  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthly.reduce((s, m) => s + m.orders, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={DollarSign}
        label="Ingresos totales"
        value={`$${totalRevenue.toLocaleString()}`}
        delta="+12.4% vs período previo"
      />
      <StatCard
        icon={ShoppingCart}
        label="Pedidos"
        value={totalOrders.toLocaleString()}
        delta="+8.1%"
      />
      <StatCard
        icon={Users}
        label="Clientes nuevos"
        value="312"
        delta="+4.6%"
      />
      <StatCard
        icon={TrendingUp}
        label="Ticket promedio"
        value="$148"
        delta="+3.2%"
      />
    </div>
  );
}

