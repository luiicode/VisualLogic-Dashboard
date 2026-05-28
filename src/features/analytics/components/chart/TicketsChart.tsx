import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ticketsConfig } from "@/features/analytics/constants/ticketsConfig";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface TicketsData {
  label: string;
  resueltos: number;
  abiertos: number;
}

export default function TicketsChart({ data }: { data: TicketsData[] }) {
  return (
    <ChartContainer config={ticketsConfig} className="h-[240px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="resueltos"
          fill="var(--color-resueltos)"
          radius={4}
        />
        <Bar dataKey="abiertos" fill="var(--color-abiertos)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

