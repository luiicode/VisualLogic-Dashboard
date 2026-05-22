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
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const monthly = [
    { month: "Ene", revenue: 18200, orders: 142 },
    { month: "Feb", revenue: 22400, orders: 168 },
    { month: "Mar", revenue: 19800, orders: 154 },
    { month: "Abr", revenue: 27600, orders: 201 },
    { month: "May", revenue: 31200, orders: 234 },
    { month: "Jun", revenue: 29800, orders: 218 },
    { month: "Jul", revenue: 35400, orders: 262 },
    { month: "Ago", revenue: 38900, orders: 289 },
];

const byChannel = [
    { channel: "Web", value: 48200 },
    { channel: "Móvil", value: 31400 },
    { channel: "Retail", value: 18600 },
    { channel: "Partners", value: 12800 },
];

const channelColors = [
    "hsl(221 83% 53%)",
    "hsl(160 84% 39%)",
    "hsl(38 92% 50%)",
    "hsl(280 65% 60%)",
];

type Status = "Pagado" | "Pendiente" | "Reembolsado" | "Cancelado";

const statusVariant: Record<Status, string> = {
    Pagado: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Pendiente: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Reembolsado: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Cancelado: "bg-red-500/10 text-red-600 border-red-500/20",
};

const recentOrders: {
    id: string;
    customer: string;
    product: string;
    date: string;
    amount: number;
    status: Status;
}[] = [
    { id: "#A-1042", customer: "Lucía Romero", product: "Plan Pro Anual", date: "2026-05-20", amount: 1290, status: "Pagado" },
    { id: "#A-1041", customer: "Carlos Méndez", product: "Plan Team", date: "2026-05-20", amount: 480, status: "Pagado" },
    { id: "#A-1040", customer: "Ana Torres", product: "Add-on Storage", date: "2026-05-19", amount: 60, status: "Pendiente" },
    { id: "#A-1039", customer: "Diego Castro", product: "Plan Pro Mensual", date: "2026-05-19", amount: 129, status: "Reembolsado" },
    { id: "#A-1038", customer: "María Fernández", product: "Plan Enterprise", date: "2026-05-18", amount: 4200, status: "Pagado" },
    { id: "#A-1037", customer: "Jorge Salinas", product: "Plan Team", date: "2026-05-18", amount: 480, status: "Cancelado" },
    { id: "#A-1036", customer: "Paula Ríos", product: "Plan Pro Anual", date: "2026-05-17", amount: 1290, status: "Pagado" },
];

const topProducts = [
    { name: "Plan Pro Anual", units: 412, revenue: 531480 },
    { name: "Plan Enterprise", units: 38, revenue: 159600 },
    { name: "Plan Team", units: 286, revenue: 137280 },
    { name: "Plan Pro Mensual", units: 524, revenue: 67596 },
    { name: "Add-on Storage", units: 1180, revenue: 70800 },
];

const revenueConfig = {
    revenue: { label: "Ingresos", color: "hsl(221 83% 53%)" },
    orders: { label: "Pedidos", color: "hsl(160 84% 39%)" },
} satisfies ChartConfig;

const channelConfig = {
    value: { label: "Ventas" },
} satisfies ChartConfig;

function StatCard({
                      icon: Icon,
                      label,
                      value,
                      delta,
                  }: {
    icon: typeof DollarSign;
    label: string;
    value: string;
    delta: string;
}) {
    return (
        <Card>
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{label}</div>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
                <div className="mt-1 text-xs text-emerald-600">{delta}</div>
            </CardContent>
        </Card>
    );
}

export default function SalesPage() {
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
              <StatCard icon={DollarSign} label="Ingresos totales" value={`$${totalRevenue.toLocaleString()}`} delta="+12.4% vs período previo" />
              <StatCard icon={ShoppingCart} label="Pedidos" value={totalOrders.toLocaleString()} delta="+8.1%" />
              <StatCard icon={Users} label="Clientes nuevos" value="312" delta="+4.6%" />
              <StatCard icon={TrendingUp} label="Ticket promedio" value="$148" delta="+3.2%" />
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
                                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.4} />
                                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
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
                              <Pie data={byChannel} dataKey="value" nameKey="channel" innerRadius={55} outerRadius={90} paddingAngle={2}>
                                  {byChannel.map((_, i) => (
                                      <Cell key={i} fill={channelColors[i]} />
                                  ))}
                              </Pie>
                          </PieChart>
                      </ChartContainer>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          {byChannel.map((c, i) => (
                              <div key={c.channel} className="flex items-center gap-2">
                                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: channelColors[i] }} />
                                  <span className="text-muted-foreground">{c.channel}</span>
                                  <span className="ml-auto font-medium">${c.value.toLocaleString()}</span>
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
                          <Bar dataKey="orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} />
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
                                  <TableCell className="text-muted-foreground">{o.product}</TableCell>
                                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                                  <TableCell className="text-right font-medium">${o.amount.toLocaleString()}</TableCell>
                                  <TableCell>
                                      <Badge variant="outline" className={statusVariant[o.status]}>{o.status}</Badge>
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
                                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                                  <TableCell className="font-medium">{p.name}</TableCell>
                                  <TableCell className="text-right">{p.units.toLocaleString()}</TableCell>
                                  <TableCell className="text-right font-medium">${p.revenue.toLocaleString()}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </div>
  );
}


