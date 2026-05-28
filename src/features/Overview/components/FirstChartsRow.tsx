"use client";

import RevenueCard from "@/features/Overview/components/widget/RevenueCard";
import SalesChannelCard from "@/features/Overview/components/widget/SalesChannelCard";

export default function FirstChartsRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <RevenueCard />
      <SalesChannelCard />
    </section>
  );
}
