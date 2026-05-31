"use client";

import { useEffect, useState } from "react";
import { NavProjects } from "@/components/nav-projects";
import { fetchSidebarProjects } from "@/lib/actions/teams";
import { Hash, FolderOpen, LayoutTemplate, Box } from "lucide-react";

export function NavProjectsWrapper() {
  const [projects, setProjects] = useState<
    { name: string; url: string; icon: React.ReactNode }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectNames = await fetchSidebarProjects();

        // Una pequeña colección de íconos para asignarlos dinámicamente
        const icons = [
          <Hash key="1" />,
          <LayoutTemplate key="2" />,
          <FolderOpen key="3" />,
          <Box key="4" />,
        ];

        // Transformamos la lista de nombres de Salesforce al formato exacto que pide el NavProjects
        const formattedProjects = projectNames.map((name, index) => ({
          name,
          // Creamos una URL amigable automáticamente (ej. "Atlas CRM" -> "/projects/atlas-crm")
          url: `/projects/${name.toLowerCase().replace(/\s+/g, "-")}`,
          // Asignamos un ícono rotativo de la colección
          icon: icons[index % icons.length],
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error cargando proyectos del sidebar:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    // Un pequeño esqueleto de carga discreto para no romper el diseño del sidebar
    return (
      <div className="px-4 py-3 text-xs text-muted-foreground animate-pulse">
        Sincronizando proyectos...
      </div>
    );
  }

  // Si no hay proyectos, podemos ocultar la sección o mostrar un mensaje
  if (projects.length === 0) {
    return null;
  }

  return <NavProjects projects={projects} />;
}
