import { TicketStatus } from "@/features/tickets/types/statusType";

export const statusVariant: Record<TicketStatus, string> = {
  Resuelto:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Pendiente:
    "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  "En progreso":
    "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  Cancelado: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
};
