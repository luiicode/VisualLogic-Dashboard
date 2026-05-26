"use client";

import StatCard from "@/features/sales/components/StatCard";
import { monthly } from "@/features/sales/constants/monthly";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
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
import { revenueConfig } from "@/features/sales/constants/revenueConfig";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { channelConfig } from "@/features/sales/constants/channelConfig";
import { byChannel } from "@/features/sales/constants/byChannel";
import { channelColors } from "@/features/sales/constants/channelColors";
import { topProducts } from "@/features/sales/constants/topProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusVariant } from "@/features/sales/constants/status-style";
import { recentOrders } from "@/features/sales/data/recentOrders";
import { Badge } from "@/components/ui/badge";

export default function DashboardSales() {
  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthly.reduce((s, m) => s + m.orders, 0);
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de ventas, tendencias y pedidos recientes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Ingresos totales"
          value={`$${totalRevenue.toLocaleString()}`}
          delta="+12.4% vs período previo"
        />
        <StatCard
          icon={ShoppingCart}
          label="Pedidos"
          value={totalOrders.toLocaleString()}
          delta="+8.1%"
        />
        <StatCard
          icon={Users}
          label="Clientes nuevos"
          value="312"
          delta="+4.6%"
        />
        <StatCard
          icon={TrendingUp}
          label="Ticket promedio"
          value="$148"
          delta="+3.2%"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ingresos mensuales</CardTitle>
            <CardDescription>Últimos 8 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="h-[280px] w-full">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={48} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  fill="url(#rev)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por canal</CardTitle>
            <CardDescription>Distribución actual</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos por mes</CardTitle>
          <CardDescription>Volumen de transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="h-[240px] w-full">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="orders"
                fill="var(--color-orders)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos recientes</CardTitle>
          <CardDescription>Últimas transacciones registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {o.product}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {o.date}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${o.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusVariant[o.status]}
                    >
                      {o.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productos top</CardTitle>
          <CardDescription>Ranking por ingresos generados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((p, i) => (
                <TableRow key={p.name}>
                  <TableCell className="text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right">
                    {p.units.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${p.revenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
