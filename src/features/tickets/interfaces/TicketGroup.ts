import { TicketRow } from "@/features/tickets/interfaces/TicketRow";

export interface TicketGroup {
  section: string;
  rows: TicketRow[];
}
