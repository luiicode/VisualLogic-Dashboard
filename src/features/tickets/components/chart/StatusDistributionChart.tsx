import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/features/tickets/constants/chartConfig";
import { PieChart, Pie, Cell } from "recharts";
import { StatusDistributionChartProps } from "@/features/tickets/interfaces/StatusDistributionChartProps";

export default function StatusDistributionChart({
  data,
}: StatusDistributionChartProps) {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={95}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
