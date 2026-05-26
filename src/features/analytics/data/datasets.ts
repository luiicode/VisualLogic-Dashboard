import { Period } from "@/features/analytics/types/periodType";

export const datasets: Record<
  Period,
  {
    labelKey: string;
    desempeno: Array<{ label: string; valor: number }>;
    cumplimiento: Array<{ label: string; valor: number }>;
    reportes: Array<{ label: string; entregados: number; pendientes: number }>;
    conducta: Array<{ metric: string; valor: number }>;
    asistencia: Array<{ label: string; tiempo: number }>;
    tickets: Array<{ label: string; resueltos: number; abiertos: number }>;
  }
> = {
  mes: {
    labelKey: "Semana",
    desempeno: [
      { label: "S1", valor: 78 },
      { label: "S2", valor: 82 },
      { label: "S3", valor: 85 },
      { label: "S4", valor: 90 },
    ],
    cumplimiento: [
      { label: "S1", valor: 88 },
      { label: "S2", valor: 91 },
      { label: "S3", valor: 87 },
      { label: "S4", valor: 94 },
    ],
    reportes: [
      { label: "S1", entregados: 24, pendientes: 6 },
      { label: "S2", entregados: 28, pendientes: 4 },
      { label: "S3", entregados: 30, pendientes: 5 },
      { label: "S4", entregados: 32, pendientes: 2 },
    ],
    conducta: [
      { metric: "Puntualidad", valor: 88 },
      { metric: "Colaboración", valor: 92 },
      { metric: "Comunicación", valor: 85 },
      { metric: "Iniciativa", valor: 80 },
      { metric: "Ética", valor: 95 },
    ],
    asistencia: [
      { label: "S1", tiempo: 4.2 },
      { label: "S2", tiempo: 3.8 },
      { label: "S3", tiempo: 3.5 },
      { label: "S4", tiempo: 3.1 },
    ],
    tickets: [
      { label: "S1", resueltos: 42, abiertos: 12 },
      { label: "S2", resueltos: 51, abiertos: 9 },
      { label: "S3", resueltos: 48, abiertos: 14 },
      { label: "S4", resueltos: 60, abiertos: 7 },
    ],
  },
  trimestre: {
    labelKey: "Mes",
    desempeno: [
      { label: "Ene", valor: 80 },
      { label: "Feb", valor: 84 },
      { label: "Mar", valor: 88 },
    ],
    cumplimiento: [
      { label: "Ene", valor: 86 },
      { label: "Feb", valor: 90 },
      { label: "Mar", valor: 93 },
    ],
    reportes: [
      { label: "Ene", entregados: 110, pendientes: 18 },
      { label: "Feb", entregados: 124, pendientes: 14 },
      { label: "Mar", entregados: 132, pendientes: 9 },
    ],
    conducta: [
      { metric: "Puntualidad", valor: 90 },
      { metric: "Colaboración", valor: 89 },
      { metric: "Comunicación", valor: 87 },
      { metric: "Iniciativa", valor: 83 },
      { metric: "Ética", valor: 96 },
    ],
    asistencia: [
      { label: "Ene", tiempo: 4.0 },
      { label: "Feb", tiempo: 3.6 },
      { label: "Mar", tiempo: 3.2 },
    ],
    tickets: [
      { label: "Ene", resueltos: 180, abiertos: 40 },
      { label: "Feb", resueltos: 210, abiertos: 32 },
      { label: "Mar", resueltos: 245, abiertos: 25 },
    ],
  },
  anio: {
    labelKey: "Trimestre",
    desempeno: [
      { label: "Q1", valor: 82 },
      { label: "Q2", valor: 85 },
      { label: "Q3", valor: 88 },
      { label: "Q4", valor: 91 },
    ],
    cumplimiento: [
      { label: "Q1", valor: 88 },
      { label: "Q2", valor: 90 },
      { label: "Q3", valor: 92 },
      { label: "Q4", valor: 95 },
    ],
    reportes: [
      { label: "Q1", entregados: 360, pendientes: 45 },
      { label: "Q2", entregados: 410, pendientes: 38 },
      { label: "Q3", entregados: 445, pendientes: 30 },
      { label: "Q4", entregados: 490, pendientes: 22 },
    ],
    conducta: [
      { metric: "Puntualidad", valor: 91 },
      { metric: "Colaboración", valor: 90 },
      { metric: "Comunicación", valor: 88 },
      { metric: "Iniciativa", valor: 85 },
      { metric: "Ética", valor: 97 },
    ],
    asistencia: [
      { label: "Q1", tiempo: 3.9 },
      { label: "Q2", tiempo: 3.5 },
      { label: "Q3", tiempo: 3.2 },
      { label: "Q4", tiempo: 2.8 },
    ],
    tickets: [
      { label: "Q1", resueltos: 640, abiertos: 110 },
      { label: "Q2", resueltos: 720, abiertos: 95 },
      { label: "Q3", resueltos: 810, abiertos: 80 },
      { label: "Q4", resueltos: 890, abiertos: 65 },
    ],
  },
};
