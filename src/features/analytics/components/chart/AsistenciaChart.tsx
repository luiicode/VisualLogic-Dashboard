import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { asistenciaConfig } from "@/features/analytics/constants/asistenciaConfig";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface AsistenciaData {
  label: string;
  tiempo: number;
}

export default function AsistenciaChart({ data }: { data: AsistenciaData[] }) {
  return (
    <ChartContainer config={asistenciaConfig} className="h-[240px] w-full">
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="tiempo"
          type="monotone"
          fill="var(--color-tiempo)"
          fillOpacity={0.3}
          stroke="var(--color-tiempo)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

