import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TicketsBarChart from "@/features/Overview/components/chart/TicketsBarChart";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TicketsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tickets: resueltos vs pendientes</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Ver tickets <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <TicketsBarChart />
      </CardContent>
    </Card>
  );
}

