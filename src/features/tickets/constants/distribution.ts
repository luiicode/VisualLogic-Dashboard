import {
  allRows,
  pending,
  resolved,
} from "@/features/tickets/constants/elementsTickets";

export const distribution = [
  { name: "Resueltos", value: resolved, color: "hsl(160 84% 39%)" },
  { name: "Pendientes", value: pending, color: "hsl(38 92% 50%)" },
  {
    name: "En progreso",
    value: allRows.filter((r) => r.status === "En progreso").length,
    color: "hsl(221 83% 53%)",
  },
  {
    name: "Cancelados",
    value: allRows.filter((r) => r.status === "Cancelado").length,
    color: "hsl(0 84% 60%)",
  },
];