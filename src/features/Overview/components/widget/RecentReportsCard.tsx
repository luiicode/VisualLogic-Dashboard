import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentReportsTable from "@/features/Overview/components/table/RecentReportsTable";
import { ReportRow } from "@/features/Overview/interfaces/ReportRow";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function RecentReportsCard({ data }: { data: ReportRow[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Reportes Operativos</CardTitle>
          <CardDescription>Últimas entregas del equipo</CardDescription>
        </div>
        <Link
          href="/analytics"
          className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
        >
          Ver análisis <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <RecentReportsTable data={data} />
      </CardContent>
    </Card>
  );
}
