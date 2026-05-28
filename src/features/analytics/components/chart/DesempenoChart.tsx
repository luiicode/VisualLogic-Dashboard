import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { desempenoConfig } from "@/features/analytics/constants/desempenoConfig";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface DesempenoData {
  label: string;
  valor: number;
}

export default function DesempenoChart({ data }: { data: DesempenoData[] }) {
  return (
    <ChartContainer config={desempenoConfig} className="h-[240px] w-full">
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="valor"
          type="monotone"
          fill="var(--color-valor)"
          fillOpacity={0.3}
          stroke="var(--color-valor)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

