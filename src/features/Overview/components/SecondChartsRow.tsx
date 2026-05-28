"use client";

import PerformanceCard from "@/features/Overview/components/widget/PerformanceCard";
import TicketsCard from "@/features/Overview/components/widget/TicketsCard";

export default function SecondChartsRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <TicketsCard />
      <PerformanceCard />
    </section>
  );
}
