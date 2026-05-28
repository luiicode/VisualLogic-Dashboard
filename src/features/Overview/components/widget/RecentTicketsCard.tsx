import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecentTicketsTable from "@/features/Overview/components/table/RecentTicketsTable";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function RecentTicketsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tickets recientes</CardTitle>
          <CardDescription>Últimas actividades</CardDescription>
        </div>
        <Link
          href="/tickets"
          className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
        >
          Ver todos <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <RecentTicketsTable />
      </CardContent>
    </Card>
  );
}

