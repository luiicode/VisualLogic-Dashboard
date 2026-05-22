'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import {
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
import { Ticket as TicketIcon, CheckCircle2, Clock } from "lucide-react";

type TicketStatus = "Resuelto" | "Pendiente" | "En progreso" | "Cancelado";
interface TicketRow {
    orderId: string;
    user: string;
    email: string;
    status: TicketStatus;
    date: string;
}
const tickets: { section: string; rows: TicketRow[] }[] = [
    {
        section: "Soporte Técnico",
        rows: [
            { orderId: "ORD-1042", user: "Lucía Pérez", email: "lucia.perez@acme.com", status: "Resuelto", date: "2026-05-18" },
            { orderId: "ORD-1043", user: "Marcos Díaz", email: "marcos.diaz@acme.com", status: "Pendiente", date: "2026-05-19" },
            { orderId: "ORD-1044", user: "Sofía Romero", email: "sofia.romero@acme.com", status: "En progreso", date: "2026-05-20" },
            { orderId: "ORD-1045", user: "Diego Castro", email: "diego.castro@acme.com", status: "Cancelado", date: "2026-05-20" },
        ],
    },
    {
        section: "Facturación",
        rows: [
            { orderId: "ORD-2031", user: "Andrea Ruiz", email: "andrea.ruiz@orbit.io", status: "Resuelto", date: "2026-05-15" },
            { orderId: "ORD-2032", user: "Pablo Núñez", email: "pablo.nunez@orbit.io", status: "Pendiente", date: "2026-05-21" },
            { orderId: "ORD-2033", user: "Carla Vega", email: "carla.vega@orbit.io", status: "En progreso", date: "2026-05-22" },
        ],
    },
    {
        section: "Onboarding",
        rows: [
            { orderId: "ORD-3010", user: "Jorge Salas", email: "jorge.salas@nimbus.co", status: "Resuelto", date: "2026-05-10" },
            { orderId: "ORD-3011", user: "Valeria Mora", email: "valeria.mora@nimbus.co", status: "Resuelto", date: "2026-05-12" },
            { orderId: "ORD-3012", user: "Iván Ortega", email: "ivan.ortega@nimbus.co", status: "Pendiente", date: "2026-05-22" },
        ],
    },
];
const statusVariant: Record<TicketStatus, string> = {
    Resuelto: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    Pendiente: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    "En progreso": "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
    Cancelado: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
};
const allRows = tickets.flatMap((t) => t.rows);
const total = allRows.length;
const resolved = allRows.filter((r) => r.status === "Resuelto").length;
const pending = allRows.filter((r) => r.status === "Pendiente").length;
const monthly = [
    { month: "Ene", total: 42, resueltos: 30, pendientes: 12 },
    { month: "Feb", total: 51, resueltos: 38, pendientes: 13 },
    { month: "Mar", total: 47, resueltos: 35, pendientes: 12 },
    { month: "Abr", total: 63, resueltos: 49, pendientes: 14 },
    { month: "May", total: 58, resueltos: 41, pendientes: 17 },
];
const distribution = [
    { name: "Resueltos", value: resolved, color: "hsl(160 84% 39%)" },
    { name: "Pendientes", value: pending, color: "hsl(38 92% 50%)" },
    {
        name: "En progreso",
        value: allRows.filter((r) => r.status === "En progreso").length,
        color: "hsl(221 83% 53%)",
    },
    {
        name: "Cancelados",
        value: allRows.filter((r) => r.status === "Cancelado").length,
        color: "hsl(0 84% 60%)",
    },
];
const chartConfig: ChartConfig = {
    total: { label: "Totales", color: "hsl(221 83% 53%)" },
    resueltos: { label: "Resueltos", color: "hsl(160 84% 39%)" },
    pendientes: { label: "Pendientes", color: "hsl(38 92% 50%)" },
};
function StatCard({
                      title,
                      value,
                      icon: Icon,
                      accent,
                  }: {
    title: string;
    value: string | number;
    icon: typeof TicketIcon;
    accent: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${accent}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

export default function TicketsPage() {
  return (
      <div className="p-6 space-y-6">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
              <p className="text-muted-foreground">Resumen, distribución y detalle por área.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
              <StatCard title="Tickets totales" value={total} icon={TicketIcon} accent="text-blue-500" />
              <StatCard title="Resueltos" value={resolved} icon={CheckCircle2} accent="text-emerald-500" />
              <StatCard title="Pendientes" value={pending} icon={Clock} accent="text-amber-500" />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                  <CardHeader>
                      <CardTitle>Evolución mensual</CardTitle>
                      <CardDescription>Totales, resueltos y pendientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer config={chartConfig} className="h-[280px] w-full">
                          <LineChart data={monthly}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                              <Line type="monotone" dataKey="resueltos" stroke="var(--color-resueltos)" strokeWidth={2} />
                              <Line type="monotone" dataKey="pendientes" stroke="var(--color-pendientes)" strokeWidth={2} />
                          </LineChart>
                      </ChartContainer>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle>Distribución por estado</CardTitle>
                      <CardDescription>Proporción actual de tickets</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ChartContainer config={chartConfig} className="h-[280px] w-full">
                          <PieChart>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95}>
                                  {distribution.map((d) => (
                                      <Cell key={d.name} fill={d.color} />
                                  ))}
                              </Pie>
                          </PieChart>
                      </ChartContainer>
                  </CardContent>
              </Card>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>Resueltos vs Pendientes</CardTitle>
                  <CardDescription>Comparativa mensual</CardDescription>
              </CardHeader>
              <CardContent>
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                      <BarChart data={monthly}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="resueltos" fill="var(--color-resueltos)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="pendientes" fill="var(--color-pendientes)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ChartContainer>
              </CardContent>
          </Card>
          <div className="space-y-6">
              {tickets.map((section) => (
                  <Card key={section.section}>
                      <CardHeader>
                          <CardTitle>{section.section}</CardTitle>
                          <CardDescription>{section.rows.length} tickets</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>ID de orden</TableHead>
                                      <TableHead>Usuario encargado</TableHead>
                                      <TableHead>Correo</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Fecha de emisión</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {section.rows.map((row) => (
                                      <TableRow key={row.orderId}>
                                          <TableCell className="font-mono">{row.orderId}</TableCell>
                                          <TableCell className="font-medium">{row.user}</TableCell>
                                          <TableCell className="text-muted-foreground">{row.email}</TableCell>
                                          <TableCell>
                                              <Badge variant="outline" className={statusVariant[row.status]}>
                                                  {row.status}
                                              </Badge>
                                          </TableCell>
                                          <TableCell>{row.date}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  );
}


