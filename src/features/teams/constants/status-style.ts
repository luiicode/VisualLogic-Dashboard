import { Status } from "@/features/teams/types/statusType";

export const statusVariant: Record<Status, { className: string }> = {
  Completado: {
    className: "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20",
  },
  "En progreso": {
    className: "bg-blue-500/15 text-blue-600 hover:bg-blue-500/20",
  },
  Pendiente: {
    className: "bg-amber-500/15 text-amber-600 hover:bg-amber-500/20",
  },
  Bloqueado: { className: "bg-red-500/15 text-red-600 hover:bg-red-500/20" },
};
