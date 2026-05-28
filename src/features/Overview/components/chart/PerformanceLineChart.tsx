import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { performanceConfig } from "@/features/Overview/constants/performanceConfig";
import { performanceData } from "@/features/Overview/data/performanceData";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export default function PerformanceLineChart() {
  return (
    <ChartContainer config={performanceConfig} className="h-[260px] w-full">
      <LineChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} domain={[60, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="desempeño"
          stroke="hsl(221 83% 53%)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="cumplimiento"
          stroke="hsl(280 80% 55%)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

