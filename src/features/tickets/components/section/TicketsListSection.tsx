import { tickets } from "@/features/tickets/data/ticketsData";
import TicketSectionCard from "@/features/tickets/components/widget/TicketSectionCard";

export default function TicketsListSection() {
  return (
    <div className="space-y-6">
      {tickets.map((section) => (
        <TicketSectionCard key={section.section} sectionName={section.section} />
      ))}
    </div>
  );
}

