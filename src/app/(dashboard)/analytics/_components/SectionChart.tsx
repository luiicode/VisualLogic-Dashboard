import { PieChartDonutText } from "@/components/custom/PieChartDonutText";
import { RadarChartDefault } from "@/components/custom/RadarChartDefault";
import { TooltipChartAdvanced } from "@/components/custom/TooltipAdvanced";

export const SectionChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <TooltipChartAdvanced />
      <PieChartDonutText />
      <RadarChartDefault />
    </div>
  );
};
