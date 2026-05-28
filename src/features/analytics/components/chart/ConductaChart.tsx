import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { conductaConfig } from "@/features/analytics/constants/conductaConfig";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface ConductaData {
  metric: string;
  valor: number;
}

export default function ConductaChart({ data }: { data: ConductaData[] }) {
  return (
    <ChartContainer config={conductaConfig} className="h-[240px] w-full">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Radar
          dataKey="valor"
          stroke="var(--color-valor)"
          fill="var(--color-valor)"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ChartContainer>
  );
}

