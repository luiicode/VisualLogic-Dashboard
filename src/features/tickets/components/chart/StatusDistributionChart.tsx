import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/features/tickets/constants/chartConfig";
import { distribution } from "@/features/tickets/constants/distribution";
import { PieChart, Pie, Cell } from "recharts";

export default function StatusDistributionChart() {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={distribution}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={95}
          >
            {distribution.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}

