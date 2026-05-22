import { BarChartInteractive } from "@/components/custom/BarChartInteractive";
import { SectionCards } from "@/components/custom/SectionCard";
import { SectionChart } from "./_components/SectionChart";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <BarChartInteractive />
          </div>
          <SectionChart />
        </div>
      </div>
    </div>
  );
}
