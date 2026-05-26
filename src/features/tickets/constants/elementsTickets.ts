import { tickets } from "@/features/tickets/data/ticketsData";

export const allRows = tickets.flatMap((t) => t.rows);
export const total = allRows.length;
export const resolved = allRows.filter((r) => r.status === "Resuelto").length;
export const pending = allRows.filter((r) => r.status === "Pendiente").length;
