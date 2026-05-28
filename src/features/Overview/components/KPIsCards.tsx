import StatCard from "@/features/Overview/components/stat/StatCard";
import { DollarSign, ShoppingCart, UsersIcon, TicketIcon } from "lucide-react";

export default function KPIsCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Ingresos totales"
        value="$357K"
        hint="+12.4% vs mes anterior"
        icon={DollarSign}
      />
      <StatCard
        title="Órdenes"
        value="2,730"
        hint="+8.1% vs mes anterior"
        icon={ShoppingCart}
      />
      <StatCard
        title="Usuarios activos"
        value="1,284"
        hint="+3.2% nuevos"
        icon={UsersIcon}
      />
      <StatCard
        title="Tickets abiertos"
        value="148"
        hint="26 pendientes hoy"
        icon={TicketIcon}
      />
    </section>
  );
}
