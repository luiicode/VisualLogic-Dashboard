export const statusClass = (s: string) =>
  s === "Resuelto" || s === "Activo"
    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
    : s === "Pendiente"
      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
      : s === "En progreso"
        ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
        : "bg-muted text-muted-foreground";
