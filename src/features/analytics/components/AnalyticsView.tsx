"use client";

import { datasets } from "@/features/analytics/data/datasets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Period } from "@/features/analytics/types/periodType";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { desempenoConfig } from "@/features/analytics/constants/desempenoConfig";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";
import { cumplimientoConfig } from "@/features/analytics/constants/cumplimientoConfig";
import { reportesConfig } from "@/features/analytics/constants/reportesConfig";
import { conductaConfig } from "@/features/analytics/constants/conductaConfig";
import { asistenciaConfig } from "@/features/analytics/constants/asistenciaConfig";
import { ticketsConfig } from "@/features/analytics/constants/ticketsConfig";

export default function AnalyticsView({ period }: { period: Period }) {
  const d = datasets[period];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Desempeño</CardTitle>
          <CardDescription>
            Promedio del equipo por {d.labelKey.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={desempenoConfig} className="h-[240px] w-full">
            <AreaChart data={d.desempeno}>
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cumplimiento</CardTitle>
          <CardDescription>% de objetivos cumplidos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={cumplimientoConfig}
            className="h-[240px] w-full"
          >
            <LineChart data={d.cumplimiento}>
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reportes</CardTitle>
          <CardDescription>Entregados vs pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={reportesConfig} className="h-[240px] w-full">
            <BarChart data={d.reportes}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="entregados"
                fill="var(--color-entregados)"
                radius={4}
              />
              <Bar
                dataKey="pendientes"
                fill="var(--color-pendientes)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conducta</CardTitle>
          <CardDescription>Evaluación cualitativa del equipo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={conductaConfig} className="h-[240px] w-full">
            <RadarChart data={d.conducta}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                dataKey="valor"
                stroke="var(--color-valor)"
                fill="var(--color-valor)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Asistencia rápida</CardTitle>
          <CardDescription>
            Tiempo promedio de primera respuesta (min)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={asistenciaConfig}
            className="h-[240px] w-full"
          >
            <AreaChart data={d.asistencia}>
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resolución de tickets</CardTitle>
          <CardDescription>Resueltos vs abiertos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ticketsConfig} className="h-[240px] w-full">
            <BarChart data={d.tickets}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="resueltos"
                fill="var(--color-resueltos)"
                radius={4}
              />
              <Bar dataKey="abiertos" fill="var(--color-abiertos)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
