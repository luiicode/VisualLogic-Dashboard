import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TeamsByProjectTable from "@/features/Overview/components/table/TeamsByProjectTable";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TeamsByProjectCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Equipos por proyecto</CardTitle>
          <CardDescription>Resumen de usuarios</CardDescription>
        </div>
        <Link
          href="/teams"
          className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
        >
          Ver usuarios <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <TeamsByProjectTable />
      </CardContent>
    </Card>
  );
}

