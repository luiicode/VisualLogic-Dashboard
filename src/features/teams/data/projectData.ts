import { Project } from "@/features/teams/interfaces/ProjectInterface";

export const projects: Project[] = [
  {
    name: "Atlas CRM",
    members: [
      {
        name: "María González",
        email: "maria.g@atlas.io",
        role: "Project Manager",
        activity: "Definir roadmap Q3",
        status: "En progreso",
      },
      {
        name: "Carlos Ruiz",
        email: "carlos.r@atlas.io",
        role: "Frontend Lead",
        activity: "Refactor del dashboard",
        status: "Completado",
      },
      {
        name: "Lucía Pérez",
        email: "lucia.p@atlas.io",
        role: "QA Engineer",
        activity: "Pruebas de regresión",
        status: "Pendiente",
      },
    ],
  },
  {
    name: "Orbit Analytics",
    members: [
      {
        name: "Andrés Molina",
        email: "andres.m@orbit.io",
        role: "Data Scientist",
        activity: "Modelo de predicción de churn",
        status: "En progreso",
      },
      {
        name: "Sofía Vargas",
        email: "sofia.v@orbit.io",
        role: "Backend Developer",
        activity: "API de métricas v2",
        status: "Bloqueado",
      },
      {
        name: "Diego Torres",
        email: "diego.t@orbit.io",
        role: "DevOps",
        activity: "Migración a Kubernetes",
        status: "Completado",
      },
    ],
  },
  {
    name: "Nimbus Mobile",
    members: [
      {
        name: "Valentina Cruz",
        email: "vale.c@nimbus.io",
        role: "iOS Developer",
        activity: "Onboarding screens",
        status: "Completado",
      },
      {
        name: "Mateo Herrera",
        email: "mateo.h@nimbus.io",
        role: "Android Developer",
        activity: "Push notifications",
        status: "En progreso",
      },
      {
        name: "Isabela Romero",
        email: "isa.r@nimbus.io",
        role: "Product Designer",
        activity: "Prototipo de checkout",
        status: "Pendiente",
      },
    ],
  },
];
