import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { statusColors } from "@/features/sales/constants/statusColors";
import { Cell, Pie, PieChart } from "recharts";
import { SalesByStatusChartProps } from "@/features/sales/interfaces/SalesByStatusChartProps";

export default function SalesByStatusChart({ data }: SalesByStatusChartProps) {
  const config = { value: { label: "Monto" } };
  return (
    <>
      <ChartContainer config={config} className="h-[280px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={statusColors[i % statusColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ background: statusColors[i % statusColors.length] }}
            />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="ml-auto font-medium">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
