import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SalesChannelPieChart from "@/features/Overview/components/chart/SalesChannelPieChart";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SalesChannelCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ventas por canal</CardTitle>
          <CardDescription>Distribución actual</CardDescription>
        </div>
        <Link
          href="/sales"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Detalle <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <SalesChannelPieChart />
      </CardContent>
    </Card>
  );
}

