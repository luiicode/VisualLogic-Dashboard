import AnalyticsHeaderSection from "@/features/analytics/components/section/AnalyticsHeaderSection";
import AnalyticsTabsSection from "@/features/analytics/components/section/AnalyticsTabsSection";

export default function DashboardAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <AnalyticsHeaderSection />
      <AnalyticsTabsSection />
    </div>
  );
}
