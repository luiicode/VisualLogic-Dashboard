import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TicketsTable from "@/features/tickets/components/table/TicketsTable";
import { tickets } from "@/features/tickets/data/ticketsData";

export default function TicketSectionCard({ sectionName }: { sectionName: string }) {
  const section = tickets.find((s) => s.section === sectionName);
  if (!section) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.section}</CardTitle>
        <CardDescription>{section.rows.length} tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <TicketsTable sectionName={section.section} />
      </CardContent>
    </Card>
  );
}

