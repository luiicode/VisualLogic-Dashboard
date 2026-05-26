import OverviewHeaderPage from "@/features/Overview/components/OverviewHeaderPage";
import KPIsCards from "@/features/Overview/components/KPIsCards";
import FirstChartsRow from "@/features/Overview/components/FirstChartsRow";
import SecondChartsRow from "@/features/Overview/components/SecondChartsRow";
import TablesSection from "@/features/Overview/components/TablesSection";
import KPIsFooter from "@/features/Overview/components/KPIsFooter";

export default function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <OverviewHeaderPage />
      {/* KPIs */}
      <KPIsCards />
      {/* Charts row 1 */}
      <FirstChartsRow />
      {/* Charts row 2 */}
      <SecondChartsRow />
      {/* Tables */}
      <TablesSection />
      {/* Mini KPIs footer */}
      <KPIsFooter />
    </div>
  );
}
