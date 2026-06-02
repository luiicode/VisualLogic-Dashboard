import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/features/tickets/constants/chartConfig";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { ResolvedVsPendingChartProps } from "@/features/tickets/interfaces/ResolvedVsPendingChartProps";

export default function ResolvedVsPendingChart({
  data,
}: ResolvedVsPendingChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="resueltos"
          fill="var(--color-resueltos)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="pendientes"
          fill="var(--color-pendientes)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
