import { Status } from "@/features/sales/types/statusType";

export const statusVariant: Record<Status, string> = {
  Pagado: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Pendiente: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Reembolsado: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Cancelado: "bg-red-500/10 text-red-600 border-red-500/20",
};
