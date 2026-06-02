import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RevenueAreaChart from "@/features/Overview/components/chart/RevenueAreaChart";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function RevenueCard({ data }: { data: any[] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ingresos mensuales</CardTitle>
          <CardDescription>Evolución de los últimos 6 meses</CardDescription>
        </div>
        <Link
          href="/sales"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Ver ventas <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <RevenueAreaChart data={data} />
      </CardContent>
    </Card>
  );
}
