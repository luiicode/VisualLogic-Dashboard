import StatCard from "@/features/tickets/components/stat/StatCard";
import { pending, resolved, total } from "@/features/tickets/constants/elementsTickets";
import { CheckCircle2, Clock, TicketIcon } from "lucide-react";

export default function TicketsStatsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Tickets totales" value={total} icon={TicketIcon} accent="text-blue-500" />
      <StatCard title="Resueltos" value={resolved} icon={CheckCircle2} accent="text-emerald-500" />
      <StatCard title="Pendientes" value={pending} icon={Clock} accent="text-amber-500" />
    </div>
  );
}

