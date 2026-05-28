import MonthlyRevenueCard from "@/features/sales/components/widget/MonthlyRevenueCard";
import SalesByChannelCard from "@/features/sales/components/widget/SalesByChannelCard";

export default function SalesOverviewSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <MonthlyRevenueCard />
      <SalesByChannelCard />
    </div>
  );
}

