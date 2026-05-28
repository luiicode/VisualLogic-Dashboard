import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { channelConfig } from "@/features/Overview/constants/channelConfig";
import { channelData } from "@/features/Overview/data/channelData";
import { Cell, Pie, PieChart } from "recharts";

export default function SalesChannelPieChart() {
  return (
    <>
      <ChartContainer config={channelConfig} className="h-[260px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={channelData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
          >
            {channelData.map((channel, index) => (
              <Cell key={index} fill={channel.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {channelData.map((channel) => (
          <div key={channel.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: channel.fill }}
            />
            <span className="text-muted-foreground">{channel.name}</span>
            <span className="ml-auto font-medium">{channel.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

