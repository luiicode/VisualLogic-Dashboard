import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusPieChart from "@/features/Overview/components/chart/TicketStatusPieChart";
import { TicketStatusData } from "@/features/Overview/interfaces/TicketStatusData";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TicketStatusCard({
  data,
}: {
  data: TicketStatusData[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Estado de Tickets</CardTitle>
          <CardDescription>Distribución operativa actual</CardDescription>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Detalle <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <TicketStatusPieChart data={data} />
      </CardContent>
    </Card>
  );
}
