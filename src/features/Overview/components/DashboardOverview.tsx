import OverviewHeaderPage from "@/features/Overview/components/section/OverviewHeaderPage";
import KPIsCards from "@/features/Overview/components/section/KPIsCards";
import FirstChartsRow from "@/features/Overview/components/section/FirstChartsRow";
import SecondChartsRow from "@/features/Overview/components/section/SecondChartsRow";
import TablesSection from "@/features/Overview/components/section/TablesSection";
import KPIsFooter from "@/features/Overview/components/section/KPIsFooter";

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
