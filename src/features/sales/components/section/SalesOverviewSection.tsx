import MonthlyRevenueCard from "@/features/sales/components/widget/MonthlyRevenueCard";
import SalesByStatusCard from "@/features/sales/components/widget/SalesByStatusCard";

export default function SalesOverviewSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <MonthlyRevenueCard />
      <SalesByStatusCard />
    </div>
  );
}
