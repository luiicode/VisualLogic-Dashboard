import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ticketsConfig } from "@/features/Overview/constants/ticketsConfig";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TicketsBarData } from "@/features/Overview/interfaces/TicketsBarData";

export default function TicketsBarChart({ data }: { data: TicketsBarData[] }) {
  return (
    <ChartContainer config={ticketsConfig} className="h-[260px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="resolved" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pending" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
