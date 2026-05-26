import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { teams } from "@/features/Overview/data/teamsData";
import { Badge } from "@/components/ui/badge";
import { statusClass } from "@/features/Overview/constants/status-style";
import { recentTickets } from "@/features/Overview/data/recentTickets";

export default function TablesSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Líder</TableHead>
                <TableHead className="text-right">Miembros</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((t) => (
                <TableRow key={t.project}>
                  <TableCell className="font-medium">{t.project}</TableCell>
                  <TableCell>{t.lead}</TableCell>
                  <TableCell className="text-right">{t.members}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusClass(t.status)}
                      variant="secondary"
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.user}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusClass(t.status)}
                      variant="secondary"
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {t.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
