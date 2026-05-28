import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cumplimientoConfig } from "@/features/analytics/constants/cumplimientoConfig";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface CumplimientoData {
  label: string;
  valor: number;
}

export default function CumplimientoChart({ data }: { data: CumplimientoData[] }) {
  return (
    <ChartContainer config={cumplimientoConfig} className="h-[240px] w-full">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="valor"
          type="monotone"
          stroke="var(--color-valor)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

