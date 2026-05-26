"use client";

import StatCard from "@/features/tickets/components/StatCard";
import {
  pending,
  resolved,
  total,
} from "@/features/tickets/constants/elementsTickets";
import { CheckCircle2, Clock, TicketIcon } from "lucide-react";
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
} from "@/components/ui/chart";
import { chartConfig } from "@/features/tickets/constants/chartConfig";
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
import { monthly } from "@/features/tickets/constants/monthly";
import { distribution } from "@/features/tickets/constants/distribution";
import { tickets } from "@/features/tickets/data/ticketsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { statusVariant } from "@/features/tickets/constants/status-style";

export default function DashboardTickets() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">
          Resumen, distribución y detalle por área.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Tickets totales"
          value={total}
          icon={TicketIcon}
          accent="text-blue-500"
        />
        <StatCard
          title="Resueltos"
          value={resolved}
          icon={CheckCircle2}
          accent="text-emerald-500"
        />
        <StatCard
          title="Pendientes"
          value={pending}
          icon={Clock}
          accent="text-amber-500"
        />
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
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="resueltos"
                  stroke="var(--color-resueltos)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pendientes"
                  stroke="var(--color-pendientes)"
                  strokeWidth={2}
                />
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
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                >
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
              <Bar
                dataKey="resueltos"
                fill="var(--color-resueltos)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="pendientes"
                fill="var(--color-pendientes)"
                radius={[4, 4, 0, 0]}
              />
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
                      <TableCell className="text-muted-foreground">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusVariant[row.status]}
                        >
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
