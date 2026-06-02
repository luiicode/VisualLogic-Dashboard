import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/features/tickets/constants/chartConfig";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MonthlyEvolutionChartProps } from "@/features/tickets/interfaces/MonthlyEvolutionChartProps";

export default function MonthlyEvolutionChart({
  data,
}: MonthlyEvolutionChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="total"
          stroke="var(--color-total)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="resueltos"
          stroke="var(--color-resueltos)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="pendientes"
          stroke="var(--color-pendientes)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
