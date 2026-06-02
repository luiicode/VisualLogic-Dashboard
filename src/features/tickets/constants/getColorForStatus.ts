export const getColorForStatus = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("resuelto") || s.includes("cerrado"))
    return "var(--color-resueltos, #10b981)"; // Verde
  if (s.includes("pendiente") || s.includes("espera"))
    return "var(--color-pendientes, #f59e0b)"; // Naranja / Amarillo
  if (s.includes("progreso") || s.includes("abierto") || s.includes("nuevo"))
    return "#3b82f6"; // Azul
  if (s.includes("cancelado")) return "#ef4444"; // Rojo
  return "#8b5cf6"; // Morado para estados desconocidos
};
