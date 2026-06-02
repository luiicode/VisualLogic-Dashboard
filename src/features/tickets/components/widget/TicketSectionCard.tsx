import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import TicketsTable from "@/features/tickets/components/table/TicketsTable";
import { TicketSectionCardProps } from "@/features/tickets/interfaces/TicketSectionCardProps";

export default function TicketSectionCard({
  sectionName,
  rows,
}: TicketSectionCardProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sectionName}</CardTitle>
        <CardDescription>
          {rows.length} {rows.length === 1 ? "ticket" : "tickets"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TicketsTable rows={rows} />
      </CardContent>
    </Card>
  );
}
