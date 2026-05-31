"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/features/teams/components/widget/ProjectCard";
import { fetchTeamsData } from "@/lib/actions/teams";
import { Project } from "@/features/teams/interfaces/ProjectInterface";
import { Member } from "@/features/teams/interfaces/MemberInterface";

export default function TeamsListWrapper() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const rawData = await fetchTeamsData();

        // Creamos un diccionario (Map) para agrupar a los integrantes por proyecto
        const projectMap: Record<string, Member[]> = {};

        rawData.forEach((item: any) => {
          // Extraemos el nombre del equipo desde el objeto relacional __r
          const projectName =
            item.Equipo__r && item.Equipo__r.Name
              ? item.Equipo__r.Name
              : "Proyectos Generales";

          if (!projectMap[projectName]) {
            projectMap[projectName] = [];
          }

          // Mapeamos usando las llaves correctas que vimos en tus capturas
          projectMap[projectName].push({
            name: item.Name || "Sin nombre",
            email: item.Correo__c || "Sin correo",
            role: item.Rol__c || "Sin rol",
            activity: item.Actividad__c || "Sin actividad",
            status: item.Status__c || "Pendiente",
          });
        });

        // Convertimos el diccionario en el arreglo de Proyectos que espera tu UI
        const formattedProjects: Project[] = Object.keys(projectMap).map(
          (key) => ({
            name: key,
            members: projectMap[key],
          }),
        );

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error agrupando equipos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
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

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
