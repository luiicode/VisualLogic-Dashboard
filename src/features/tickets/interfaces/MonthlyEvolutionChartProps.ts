export interface MonthlyEvolutionChartProps {
  data: {
    month: string;
    total: number;
    resueltos: number;
    pendientes: number;
  }[];
}
