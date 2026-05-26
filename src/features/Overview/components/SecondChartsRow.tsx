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
import { ticketsConfig } from "@/features/Overview/constants/ticketsConfig";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ticketsData } from "@/features/Overview/data/ticketsData";
import { performanceConfig } from "@/features/Overview/constants/performanceConfig";
import { performanceData } from "@/features/Overview/data/performanceData";

export default function SecondChartsRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tickets: resueltos vs pendientes</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </div>
          <Link
            href="/tickets"
            className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
          >
            Ver tickets <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ticketsConfig} className="h-[260px] w-full">
            <BarChart data={ticketsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="resolved"
                fill="hsl(160 84% 39%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="pending"
                fill="hsl(38 92% 50%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Desempeño y cumplimiento</CardTitle>
            <CardDescription>Promedio semanal</CardDescription>
          </div>
          <Link
            href="/analytics"
            className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
          >
            Ver analytics <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={performanceConfig}
            className="h-[260px] w-full"
          >
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[60, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="desempeño"
                stroke="hsl(221 83% 53%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cumplimiento"
                stroke="hsl(280 80% 55%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
