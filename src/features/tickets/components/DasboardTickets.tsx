"use client";

import TicketsHeaderSection from "@/features/tickets/components/section/TicketsHeaderSection";
import TicketsStatsSection from "@/features/tickets/components/section/TicketsStatsSection";
import TicketsChartsSection from "@/features/tickets/components/section/TicketsChartsSection";
import TicketsComparisonSection from "@/features/tickets/components/section/TicketsComparisonSection";
import TicketsListSection from "@/features/tickets/components/section/TicketsListSection";

export default function DashboardTickets() {
  return (
    <div className="p-6 space-y-6">
      <TicketsHeaderSection />
      <TicketsStatsSection />
      <TicketsChartsSection />
      <TicketsComparisonSection />
      <TicketsListSection />
    </div>
  );
}
