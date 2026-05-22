'use client';

import {
    DollarSign,
    ShoppingCart,
    Users as UsersIcon,
    Ticket as TicketIcon,
    TrendingUp,
    CheckCircle2,
    Clock,
    ArrowUpRight,
} from "lucide-react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts";
import Link from "next/link";
import React from "react";

const revenueData = [
    { month: "Ene", revenue: 42000, orders: 320 },
    { month: "Feb", revenue: 51000, orders: 410 },
    { month: "Mar", revenue: 48000, orders: 380 },
    { month: "Abr", revenue: 61000, orders: 470 },
    { month: "May", revenue: 73000, orders: 540 },
    { month: "Jun", revenue: 82000, orders: 610 },
];
const ticketsData = [
    { month: "Ene", total: 120, resolved: 95, pending: 25 },
    { month: "Feb", total: 145, resolved: 118, pending: 27 },
    { month: "Mar", total: 132, resolved: 110, pending: 22 },
    { month: "Abr", total: 168, resolved: 140, pending: 28 },
    { month: "May", total: 152, resolved: 130, pending: 22 },
    { month: "Jun", total: 178, resolved: 152, pending: 26 },
];
const channelData = [
    { name: "Web", value: 4200, fill: "hsl(221 83% 53%)" },
    { name: "Móvil", value: 3100, fill: "hsl(160 84% 39%)" },
    { name: "Retail", value: 1800, fill: "hsl(38 92% 50%)" },
    { name: "Partners", value: 1200, fill: "hsl(280 80% 55%)" },
];
const performanceData = [
    { week: "S1", desempeño: 78, cumplimiento: 82 },
    { week: "S2", desempeño: 84, cumplimiento: 86 },
    { week: "S3", desempeño: 81, cumplimiento: 88 },
    { week: "S4", desempeño: 90, cumplimiento: 92 },
];
const teams = [
    { project: "Apollo", members: 8, lead: "María López", status: "Activo" },
    { project: "Helios", members: 6, lead: "Carlos Ruiz", status: "Activo" },
    { project: "Orion", members: 5, lead: "Ana Torres", status: "Pausa" },
    { project: "Atlas", members: 7, lead: "Javier Pérez", status: "Activo" },
];
const recentTickets = [
    { id: "#ORD-2041", user: "Lucía Romero", status: "Resuelto", date: "2026-05-21" },
    { id: "#ORD-2042", user: "Diego Salinas", status: "Pendiente", date: "2026-05-21" },
    { id: "#ORD-2043", user: "Sofía Mena", status: "En progreso", date: "2026-05-20" },
    { id: "#ORD-2044", user: "Pablo Vidal", status: "Resuelto", date: "2026-05-20" },
];
const revenueConfig = {
    revenue: { label: "Ingresos", color: "hsl(221 83% 53%)" },
} satisfies ChartConfig;
const ticketsConfig = {
    resolved: { label: "Resueltos", color: "hsl(160 84% 39%)" },
    pending: { label: "Pendientes", color: "hsl(38 92% 50%)" },
} satisfies ChartConfig;
const channelConfig = {
    value: { label: "Ventas" },
} satisfies ChartConfig;
const performanceConfig = {
    desempeño: { label: "Desempeño", color: "hsl(221 83% 53%)" },
    cumplimiento: { label: "Cumplimiento", color: "hsl(280 80% 55%)" },
} satisfies ChartConfig;
function StatCard({
                      title,
                      value,
                      hint,
                      icon: Icon,
                  }: {
    title: string;
    value: string;
    hint: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{hint}</p>
            </CardContent>
        </Card>
    );
}
const statusClass = (s: string) =>
    s === "Resuelto" || s === "Activo"
        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        : s === "Pendiente"
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            : s === "En progreso"
                ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                : "bg-muted text-muted-foreground";

export default function OverviewPage() {
  return (
      <div className="p-6 space-y-6">
          <header className="flex items-end justify-between flex-wrap gap-3">
              <div>
                  <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
                  <p className="text-sm text-muted-foreground">
                      Resumen general de todas las secciones del workspace.
                  </p>
              </div>
          </header>
          {/* KPIs */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Ingresos totales" value="$357K" hint="+12.4% vs mes anterior" icon={DollarSign} />
              <StatCard title="Órdenes" value="2,730" hint="+8.1% vs mes anterior" icon={ShoppingCart} />
              <StatCard title="Usuarios activos" value="1,284" hint="+3.2% nuevos" icon={UsersIcon} />
              <StatCard title="Tickets abiertos" value="148" hint="26 pendientes hoy" icon={TicketIcon} />
          </section>
          {/* Charts row 1 */}
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
                                      <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity={0.4} />
                                      <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
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
                              <Pie data={channelData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                                  {channelData.map((c, i) => (
                                      <Cell key={i} fill={c.fill} />
                                  ))}
                              </Pie>
                          </PieChart>
                      </ChartContainer>
                      <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                          {channelData.map((c) => (
                              <div key={c.name} className="flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full" style={{ background: c.fill }} />
                                  <span className="text-muted-foreground">{c.name}</span>
                                  <span className="ml-auto font-medium">{c.value}</span>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </section>
          {/* Charts row 2 */}
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
                              <Bar dataKey="resolved" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="pending" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
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
                      <ChartContainer config={performanceConfig} className="h-[260px] w-full">
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
          {/* Tables */}
          <section className="grid gap-4 lg:grid-cols-2">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                          <CardTitle>Equipos por proyecto</CardTitle>
                          <CardDescription>Resumen de usuarios</CardDescription>
                      </div>
                      <Link
                          href="/teams"
                          className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
                      >
                          Ver usuarios <ArrowUpRight className="h-3 w-3" />
                      </Link>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Proyecto</TableHead>
                                  <TableHead>Líder</TableHead>
                                  <TableHead className="text-right">Miembros</TableHead>
                                  <TableHead>Status</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {teams.map((t) => (
                                  <TableRow key={t.project}>
                                      <TableCell className="font-medium">{t.project}</TableCell>
                                      <TableCell>{t.lead}</TableCell>
                                      <TableCell className="text-right">{t.members}</TableCell>
                                      <TableCell>
                                          <Badge className={statusClass(t.status)} variant="secondary">
                                              {t.status}
                                          </Badge>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                          <CardTitle>Tickets recientes</CardTitle>
                          <CardDescription>Últimas actividades</CardDescription>
                      </div>
                      <Link
                          href="/tickets"
                          className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
                      >
                          Ver todos <ArrowUpRight className="h-3 w-3" />
                      </Link>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Usuario</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Fecha</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {recentTickets.map((t) => (
                                  <TableRow key={t.id}>
                                      <TableCell className="font-mono text-xs">{t.id}</TableCell>
                                      <TableCell>{t.user}</TableCell>
                                      <TableCell>
                                          <Badge className={statusClass(t.status)} variant="secondary">
                                              {t.status}
                                          </Badge>
                                      </TableCell>
                                      <TableCell className="text-right text-muted-foreground">
                                          {t.date}
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </section>
          {/* Mini KPIs footer */}
          <section className="grid gap-4 sm:grid-cols-3">
              <StatCard title="Tickets resueltos" value="745" hint="+11% mensual" icon={CheckCircle2} />
              <StatCard title="Tiempo medio respuesta" value="2h 14m" hint="-18 min vs sem. pasada" icon={Clock} />
              <StatCard title="Crecimiento" value="+14.6%" hint="trimestre actual" icon={TrendingUp} />
          </section>
      </div>
  );
}
