import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PerformanceLineChart from "@/features/Overview/components/chart/PerformanceLineChart";
import { PerformanceLineData } from "@/features/Overview/interfaces/PerformanceLineData";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PerformanceCard({
  data,
}: {
  data: PerformanceLineData[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Desempeño y cumplimiento</CardTitle>
          <CardDescription>Promedio semanal</CardDescription>
        </div>
        <Link
          href="/analytics"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Ver analytics <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <PerformanceLineChart data={data} />
      </CardContent>
    </Card>
  );
}
