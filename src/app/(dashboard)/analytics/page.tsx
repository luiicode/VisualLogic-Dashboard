'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Radar,
    RadarChart,
    PolarAngleAxis,
    PolarGrid,
    Area,
    AreaChart,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Period = "mes" | "trimestre" | "anio";
const datasets: Record<
    Period,
    {
        labelKey: string;
        desempeno: Array<{ label: string; valor: number }>;
        cumplimiento: Array<{ label: string; valor: number }>;
        reportes: Array<{ label: string; entregados: number; pendientes: number }>;
        conducta: Array<{ metric: string; valor: number }>;
        asistencia: Array<{ label: string; tiempo: number }>;
        tickets: Array<{ label: string; resueltos: number; abiertos: number }>;
    }
> = {
    mes: {
        labelKey: "Semana",
        desempeno: [
            { label: "S1", valor: 78 },
            { label: "S2", valor: 82 },
            { label: "S3", valor: 85 },
            { label: "S4", valor: 90 },
        ],
        cumplimiento: [
            { label: "S1", valor: 88 },
            { label: "S2", valor: 91 },
            { label: "S3", valor: 87 },
            { label: "S4", valor: 94 },
        ],
        reportes: [
            { label: "S1", entregados: 24, pendientes: 6 },
            { label: "S2", entregados: 28, pendientes: 4 },
            { label: "S3", entregados: 30, pendientes: 5 },
            { label: "S4", entregados: 32, pendientes: 2 },
        ],
        conducta: [
            { metric: "Puntualidad", valor: 88 },
            { metric: "Colaboración", valor: 92 },
            { metric: "Comunicación", valor: 85 },
            { metric: "Iniciativa", valor: 80 },
            { metric: "Ética", valor: 95 },
        ],
        asistencia: [
            { label: "S1", tiempo: 4.2 },
            { label: "S2", tiempo: 3.8 },
            { label: "S3", tiempo: 3.5 },
            { label: "S4", tiempo: 3.1 },
        ],
        tickets: [
            { label: "S1", resueltos: 42, abiertos: 12 },
            { label: "S2", resueltos: 51, abiertos: 9 },
            { label: "S3", resueltos: 48, abiertos: 14 },
            { label: "S4", resueltos: 60, abiertos: 7 },
        ],
    },
    trimestre: {
        labelKey: "Mes",
        desempeno: [
            { label: "Ene", valor: 80 },
            { label: "Feb", valor: 84 },
            { label: "Mar", valor: 88 },
        ],
        cumplimiento: [
            { label: "Ene", valor: 86 },
            { label: "Feb", valor: 90 },
            { label: "Mar", valor: 93 },
        ],
        reportes: [
            { label: "Ene", entregados: 110, pendientes: 18 },
            { label: "Feb", entregados: 124, pendientes: 14 },
            { label: "Mar", entregados: 132, pendientes: 9 },
        ],
        conducta: [
            { metric: "Puntualidad", valor: 90 },
            { metric: "Colaboración", valor: 89 },
            { metric: "Comunicación", valor: 87 },
            { metric: "Iniciativa", valor: 83 },
            { metric: "Ética", valor: 96 },
        ],
        asistencia: [
            { label: "Ene", tiempo: 4.0 },
            { label: "Feb", tiempo: 3.6 },
            { label: "Mar", tiempo: 3.2 },
        ],
        tickets: [
            { label: "Ene", resueltos: 180, abiertos: 40 },
            { label: "Feb", resueltos: 210, abiertos: 32 },
            { label: "Mar", resueltos: 245, abiertos: 25 },
        ],
    },
    anio: {
        labelKey: "Trimestre",
        desempeno: [
            { label: "Q1", valor: 82 },
            { label: "Q2", valor: 85 },
            { label: "Q3", valor: 88 },
            { label: "Q4", valor: 91 },
        ],
        cumplimiento: [
            { label: "Q1", valor: 88 },
            { label: "Q2", valor: 90 },
            { label: "Q3", valor: 92 },
            { label: "Q4", valor: 95 },
        ],
        reportes: [
            { label: "Q1", entregados: 360, pendientes: 45 },
            { label: "Q2", entregados: 410, pendientes: 38 },
            { label: "Q3", entregados: 445, pendientes: 30 },
            { label: "Q4", entregados: 490, pendientes: 22 },
        ],
        conducta: [
            { metric: "Puntualidad", valor: 91 },
            { metric: "Colaboración", valor: 90 },
            { metric: "Comunicación", valor: 88 },
            { metric: "Iniciativa", valor: 85 },
            { metric: "Ética", valor: 97 },
        ],
        asistencia: [
            { label: "Q1", tiempo: 3.9 },
            { label: "Q2", tiempo: 3.5 },
            { label: "Q3", tiempo: 3.2 },
            { label: "Q4", tiempo: 2.8 },
        ],
        tickets: [
            { label: "Q1", resueltos: 640, abiertos: 110 },
            { label: "Q2", resueltos: 720, abiertos: 95 },
            { label: "Q3", resueltos: 810, abiertos: 80 },
            { label: "Q4", resueltos: 890, abiertos: 65 },
        ],
    },
};
const desempenoConfig = {
    valor: { label: "Desempeño %", color: "hsl(221 83% 53%)" },
} satisfies ChartConfig;
const cumplimientoConfig = {
    valor: { label: "Cumplimiento %", color: "hsl(160 84% 39%)" },
} satisfies ChartConfig;
const reportesConfig = {
    entregados: { label: "Entregados", color: "hsl(221 83% 53%)" },
    pendientes: { label: "Pendientes", color: "hsl(38 92% 50%)" },
} satisfies ChartConfig;
const conductaConfig = {
    valor: { label: "Puntaje", color: "hsl(280 80% 55%)" },
} satisfies ChartConfig;
const asistenciaConfig = {
    tiempo: { label: "Tiempo respuesta (min)", color: "hsl(199 89% 48%)" },
} satisfies ChartConfig;
const ticketsConfig = {
    resueltos: { label: "Resueltos", color: "hsl(160 84% 39%)" },
    abiertos: { label: "Abiertos", color: "hsl(0 72% 51%)" },
} satisfies ChartConfig;

function AnalyticsView({ period }: { period: Period }) {
    const d = datasets[period];
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Desempeño</CardTitle>
                    <CardDescription>Promedio del equipo por {d.labelKey.toLowerCase()}</CardDescription>
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
                    <ChartContainer config={cumplimientoConfig} className="h-[240px] w-full">
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
                            <Bar dataKey="entregados" fill="var(--color-entregados)" radius={4} />
                            <Bar dataKey="pendientes" fill="var(--color-pendientes)" radius={4} />
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
                    <CardDescription>Tiempo promedio de primera respuesta (min)</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={asistenciaConfig} className="h-[240px] w-full">
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
                            <Bar dataKey="resueltos" fill="var(--color-resueltos)" radius={4} />
                            <Bar dataKey="abiertos" fill="var(--color-abiertos)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AnalyticsPage() {
  return (
      <div className="p-6 space-y-6">
          <div>
              <h1 className="text-2xl font-semibold">Analytics</h1>
              <p className="text-sm text-muted-foreground">
                  Métricas de desempeño, cumplimiento y operación del equipo
              </p>
          </div>
          <Tabs defaultValue="mes" className="w-full">
              <TabsList>
                  <TabsTrigger value="mes">Mes</TabsTrigger>
                  <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
                  <TabsTrigger value="anio">Año</TabsTrigger>
              </TabsList>
              <TabsContent value="mes" className="mt-4">
                  <AnalyticsView period="mes" />
              </TabsContent>
              <TabsContent value="trimestre" className="mt-4">
                  <AnalyticsView period="trimestre" />
              </TabsContent>
              <TabsContent value="anio" className="mt-4">
                  <AnalyticsView period="anio" />
              </TabsContent>
          </Tabs>
      </div>
  );
}

