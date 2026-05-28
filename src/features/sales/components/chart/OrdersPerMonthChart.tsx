import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { revenueConfig } from "@/features/sales/constants/revenueConfig";
import { monthly } from "@/features/sales/constants/monthly";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function OrdersPerMonthChart() {
  return (
    <ChartContainer config={revenueConfig} className="h-[240px] w-full">
      <BarChart data={monthly}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="orders"
          fill="var(--color-orders)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

