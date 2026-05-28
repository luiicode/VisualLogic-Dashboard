import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { revenueConfig } from "@/features/Overview/constants/revenueConfig";
import { revenueData } from "@/features/Overview/data/revenueData";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function RevenueAreaChart() {
  return (
    <ChartContainer config={revenueConfig} className="h-[260px] w-full">
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(221 83% 53%)"
          fill="url(#revFill)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

