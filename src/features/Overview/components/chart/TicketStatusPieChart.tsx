import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { TicketStatusData } from "@/features/Overview/interfaces/TicketStatusData";

const pieConfig = {};

export default function TicketStatusPieChart({
  data,
}: {
  data: TicketStatusData[];
}) {
  return (
    <>
      <ChartContainer config={pieConfig} className="h-[260px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: entry.fill }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}
