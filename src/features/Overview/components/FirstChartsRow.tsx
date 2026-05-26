"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { revenueConfig } from "@/features/Overview/constants/revenueConfig";
import { revenueData } from "@/features/Overview/data/revenueData";
import { channelConfig } from "@/features/Overview/constants/channelConfig";
import { channelData } from "@/features/Overview/data/channelData";

export default function FirstChartsRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ingresos mensuales</CardTitle>
            <CardDescription>Evolución de los últimos 6 meses</CardDescription>
          </div>
          <Link
            href="/sales"
            className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
          >
            Ver ventas <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="h-[260px] w-full">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(221 83% 53%)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(221 83% 53%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(221 83% 53%)"
                fill="url(#revFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ventas por canal</CardTitle>
            <CardDescription>Distribución actual</CardDescription>
          </div>
          <Link
            href="/sales"
            className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
          >
            Detalle <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
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
                {channelData.map((c, i) => (
                  <Cell key={i} fill={c.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            {channelData.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: c.fill }}
                />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="ml-auto font-medium">{c.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
