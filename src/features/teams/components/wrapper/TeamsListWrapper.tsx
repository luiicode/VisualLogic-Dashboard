"use client";

import useSWR from "swr";
import ProjectCard from "@/features/teams/components/widget/ProjectCard";
import { fetchTeamsData } from "@/lib/actions/teams";
import { Project } from "@/features/teams/interfaces/ProjectInterface";
import { Member } from "@/features/teams/interfaces/MemberInterface";

// Esta es la función que procesa los datos
async function getAndFormatTeamsData() {
  const rawData = await fetchTeamsData();
  const projectMap: Record<string, Member[]> = {};

  rawData.forEach((item: any) => {
    const projectName =
      item.Equipo__r && item.Equipo__r.Name
        ? item.Equipo__r.Name
        : "Proyectos Generales";

    if (!projectMap[projectName]) {
      projectMap[projectName] = [];
    }

    projectMap[projectName].push({
      name: item.Name || "Sin nombre",
      email: item.Correo__c || "Sin correo",
      role: item.Rol__c || "Sin rol",
      activity: item.Actividad__c || "Sin actividad",
      status: item.Status__c || "Pendiente",
    });
  });

  return Object.keys(projectMap).map((key) => ({
    name: key,
    members: projectMap[key],
  }));
}

export default function TeamsListWrapper() {
  // useSWR recibe una llave única ("teams-data") y la función que trae los datos.
  // Nos devuelve la data, si está cargando y si hubo error.
  const { data: projects, isLoading } = useSWR<Project[]>(
    "teams-data",
    getAndFormatTeamsData,
    {
      // Configuraciones opcionales del caché:
      revalidateOnFocus: false, // Evita que recargue datos si cambias de pestaña en Chrome y regresas
      dedupingInterval: 60000, // Durante 60 segundos, cualquier petición extra usará el caché sin ir a Salesforce
    },
  );

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-[300px] w-full rounded-xl bg-muted/50 border"
          ></div>
        ))}
      </div>
    );
  }

  // Si por alguna razón projects está vacío, mostramos un fallback
  if (!projects) return null;

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
