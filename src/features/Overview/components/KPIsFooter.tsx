import StatCard from "@/features/Overview/components/StatCard";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";

export default function KPIsFooter() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <StatCard
        title="Tickets resueltos"
        value="745"
        hint="+11% mensual"
        icon={CheckCircle2}
      />
      <StatCard
        title="Tiempo medio respuesta"
        value="2h 14m"
        hint="-18 min vs sem. pasada"
        icon={Clock}
      />
      <StatCard
        title="Crecimiento"
        value="+14.6%"
        hint="trimestre actual"
        icon={TrendingUp}
      />
    </section>
  );
}
