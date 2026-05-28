import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { channelConfig } from "@/features/sales/constants/channelConfig";
import { byChannel } from "@/features/sales/constants/byChannel";
import { channelColors } from "@/features/sales/constants/channelColors";
import { Cell, Pie, PieChart } from "recharts";

export default function SalesByChannelChart() {
  return (
    <>
      <ChartContainer config={channelConfig} className="h-[280px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={byChannel}
            dataKey="value"
            nameKey="channel"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {byChannel.map((_, i) => (
              <Cell key={i} fill={channelColors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {byChannel.map((c, i) => (
          <div key={c.channel} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ background: channelColors[i] }}
            />
            <span className="text-muted-foreground">{c.channel}</span>
            <span className="ml-auto font-medium">
              ${c.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

