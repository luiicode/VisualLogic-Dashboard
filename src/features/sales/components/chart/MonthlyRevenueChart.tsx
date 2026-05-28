import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { revenueConfig } from "@/features/sales/constants/revenueConfig";
import { monthly } from "@/features/sales/constants/monthly";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function MonthlyRevenueChart() {
  return (
    <ChartContainer config={revenueConfig} className="h-[280px] w-full">
      <AreaChart data={monthly}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--color-revenue)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={48} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-revenue)"
          fill="url(#rev)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

