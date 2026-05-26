import { Status } from "@/features/sales/types/statusType";

export const recentOrders: {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: Status;
}[] = [
  {
    id: "#A-1042",
    customer: "Lucía Romero",
    product: "Plan Pro Anual",
    date: "2026-05-20",
    amount: 1290,
    status: "Pagado",
  },
  {
    id: "#A-1041",
    customer: "Carlos Méndez",
    product: "Plan Team",
    date: "2026-05-20",
    amount: 480,
    status: "Pagado",
  },
  {
    id: "#A-1040",
    customer: "Ana Torres",
    product: "Add-on Storage",
    date: "2026-05-19",
    amount: 60,
    status: "Pendiente",
  },
  {
    id: "#A-1039",
    customer: "Diego Castro",
    product: "Plan Pro Mensual",
    date: "2026-05-19",
    amount: 129,
    status: "Reembolsado",
  },
  {
    id: "#A-1038",
    customer: "María Fernández",
    product: "Plan Enterprise",
    date: "2026-05-18",
    amount: 4200,
    status: "Pagado",
  },
  {
    id: "#A-1037",
    customer: "Jorge Salinas",
    product: "Plan Team",
    date: "2026-05-18",
    amount: 480,
    status: "Cancelado",
  },
  {
    id: "#A-1036",
    customer: "Paula Ríos",
    product: "Plan Pro Anual",
    date: "2026-05-17",
    amount: 1290,
    status: "Pagado",
  },
];
