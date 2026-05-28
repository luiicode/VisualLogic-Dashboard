"use client";

import SalesHeaderSection from "@/features/sales/components/section/SalesHeaderSection";
import SalesStatsSection from "@/features/sales/components/section/SalesStatsSection";
import SalesOverviewSection from "@/features/sales/components/section/SalesOverviewSection";
import SalesTrendsSection from "@/features/sales/components/section/SalesTrendsSection";
import SalesTablesSection from "@/features/sales/components/section/SalesTablesSection";

export default function DashboardSales() {
  return (
    <div className="p-6 space-y-6">
      <SalesHeaderSection />
      <SalesStatsSection />
      <SalesOverviewSection />
      <SalesTrendsSection />
      <SalesTablesSection />
    </div>
  );
}
