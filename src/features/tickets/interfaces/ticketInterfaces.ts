import { TicketStatus } from "@/features/tickets/types/statusType";

export interface TicketRow {
  orderId: string;
  user: string;
  email: string;
  status: TicketStatus;
  date: string;
}
