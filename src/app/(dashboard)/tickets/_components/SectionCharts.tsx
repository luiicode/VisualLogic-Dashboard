import { BarChartLabel } from "@/components/custom/BarChartLabel";
import { PieChartDonut } from "@/components/custom/PieChartDonut";
import { AreaChartDefault } from "@/components/custom/AreaChartDefault";

export const SectionCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <BarChartLabel />
      <PieChartDonut />
      <AreaChartDefault />
    </div>
  );
};
