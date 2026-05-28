import MonthlyEvolutionCard from "@/features/tickets/components/widget/MonthlyEvolutionCard";
import StatusDistributionCard from "@/features/tickets/components/widget/StatusDistributionCard";

export default function TicketsChartsSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MonthlyEvolutionCard />
      <StatusDistributionCard />
    </div>
  );
}

