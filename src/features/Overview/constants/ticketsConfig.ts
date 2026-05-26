import { type ChartConfig } from "@/components/ui/chart";

export const ticketsConfig = {
  resolved: { label: "Resueltos", color: "hsl(160 84% 39%)" },
  pending: { label: "Pendientes", color: "hsl(38 92% 50%)" },
} satisfies ChartConfig;
