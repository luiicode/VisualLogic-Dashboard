"use client";

import useSWR from "swr";
import { NavProjects } from "@/components/nav-projects";
import { fetchSidebarProjects } from "@/lib/actions/teams";
import { Hash, FolderOpen, LayoutTemplate, Box } from "lucide-react";

async function getAndFormatSidebarProjects() {
  const projectNames = await fetchSidebarProjects();

  // Una pequeña colección de íconos para asignarlos dinámicamente
  const icons = [
    <Hash key="1" />,
    <LayoutTemplate key="2" />,
    <FolderOpen key="3" />,
    <Box key="4" />,
  ];

  // Transformamos la lista de nombres de Salesforce al formato exacto que pide el NavProjects
  return projectNames.map((name, index) => ({
    name,
    // Creamos una URL amigable automáticamente (ej. "Atlas CRM" -> "/projects/atlas-crm")
    url: `/`,
    // Asignamos un ícono rotativo de la colección
    icon: icons[index % icons.length],
  }));
}

export function NavProjectsWrapper() {
  // 2. Usamos SWR con una llave única.
  // Nota: Renombramos 'data' a 'projects' para que coincida con el prop de abajo.
  const { data: projects, isLoading } = useSWR(
    "sidebar-projects-data",
    getAndFormatSidebarProjects,
    {
      revalidateOnFocus: false,
      // Le damos 5 minutos (300000 ms) de caché porque los nombres de los proyectos
      // rara vez cambian en el día a día. ¡Puro rendimiento!
      dedupingInterval: 300000,
    },
  );

  // 3. Estado de carga de SWR
  if (isLoading) {
    // Un pequeño esqueleto de carga discreto para no romper el diseño del sidebar
    return (
      <div className="px-4 py-3 text-xs text-muted-foreground animate-pulse">
        Sincronizando proyectos...
      </div>
    );
  }

  // Si la data es undefined o el arreglo viene vacío, ocultamos la sección
  if (!projects || projects.length === 0) {
    return null;
  }

  return <NavProjects projects={projects} />;
}
