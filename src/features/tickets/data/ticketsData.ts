import { TicketRow } from "@/features/tickets/interfaces/ticketInterfaces";

export const tickets: { section: string; rows: TicketRow[] }[] = [
  {
    section: "Soporte Técnico",
    rows: [
      {
        orderId: "ORD-1042",
        user: "Lucía Pérez",
        email: "lucia.perez@acme.com",
        status: "Resuelto",
        date: "2026-05-18",
      },
      {
        orderId: "ORD-1043",
        user: "Marcos Díaz",
        email: "marcos.diaz@acme.com",
        status: "Pendiente",
        date: "2026-05-19",
      },
      {
        orderId: "ORD-1044",
        user: "Sofía Romero",
        email: "sofia.romero@acme.com",
        status: "En progreso",
        date: "2026-05-20",
      },
      {
        orderId: "ORD-1045",
        user: "Diego Castro",
        email: "diego.castro@acme.com",
        status: "Cancelado",
        date: "2026-05-20",
      },
    ],
  },
  {
    section: "Facturación",
    rows: [
      {
        orderId: "ORD-2031",
        user: "Andrea Ruiz",
        email: "andrea.ruiz@orbit.io",
        status: "Resuelto",
        date: "2026-05-15",
      },
      {
        orderId: "ORD-2032",
        user: "Pablo Núñez",
        email: "pablo.nunez@orbit.io",
        status: "Pendiente",
        date: "2026-05-21",
      },
      {
        orderId: "ORD-2033",
        user: "Carla Vega",
        email: "carla.vega@orbit.io",
        status: "En progreso",
        date: "2026-05-22",
      },
    ],
  },
  {
    section: "Onboarding",
    rows: [
      {
        orderId: "ORD-3010",
        user: "Jorge Salas",
        email: "jorge.salas@nimbus.co",
        status: "Resuelto",
        date: "2026-05-10",
      },
      {
        orderId: "ORD-3011",
        user: "Valeria Mora",
        email: "valeria.mora@nimbus.co",
        status: "Resuelto",
        date: "2026-05-12",
      },
      {
        orderId: "ORD-3012",
        user: "Iván Ortega",
        email: "ivan.ortega@nimbus.co",
        status: "Pendiente",
        date: "2026-05-22",
      },
    ],
  },
];
