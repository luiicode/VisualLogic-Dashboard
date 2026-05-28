import RecentOrdersCard from "@/features/sales/components/widget/RecentOrdersCard";
import TopProductsCard from "@/features/sales/components/widget/TopProductsCard";

export default function SalesTablesSection() {
  return (
    <div className="space-y-4">
      <RecentOrdersCard />
      <TopProductsCard />
    </div>
  );
}

