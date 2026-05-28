import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { reportesConfig } from "@/features/analytics/constants/reportesConfig";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ReportesData {
  label: string;
  entregados: number;
  pendientes: number;
}

export default function ReportesChart({ data }: { data: ReportesData[] }) {
  return (
    <ChartContainer config={reportesConfig} className="h-[240px] w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="entregados"
          fill="var(--color-entregados)"
          radius={4}
        />
        <Bar dataKey="pendientes" fill="var(--color-pendientes)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

