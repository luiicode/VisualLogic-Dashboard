"use server";

import { queryDataCloud } from "../salesforce";

export async function fetchTeamsData() {
  console.log("🔥 INICIANDO LLAMADA EQUIPOS E INTEGRANTES 🔥");

  try {
    // Usamos Name para el integrante y Equipo__r.Name para traer el nombre del equipo, no el ID
    const query =
      "SELECT Name, Correo__c, Rol__c, Actividad__c, Status__c, Equipo__r.Name FROM Integrante__c";

    console.log("Ejecutando SQL Teams:", query);

    const data = await queryDataCloud(query);

    console.log("✅ Datos de Integrantes obtenidos:", data);
    return data;
  } catch (e: any) {
    console.error("❌ Error en Teams:", e.response?.data || e.message || e);
    return [];
  }
}

export async function fetchSidebarProjects() {
  console.log("🔥 INICIANDO LLAMADA PROYECTOS SIDEBAR 🔥");

  try {
    // Traemos solo la relación del nombre del equipo
    const query =
      "SELECT Equipo__r.Name FROM Integrante__c WHERE Equipo__c != null";
    const data = await queryDataCloud(query);

    // Filtramos para obtener solo nombres únicos (Set elimina los duplicados automáticamente)
    const uniqueProjects = Array.from(
      new Set(data.map((item: any) => item.Equipo__r?.Name).filter(Boolean)),
    );

    console.log("✅ Proyectos únicos para el sidebar:", uniqueProjects);
    return uniqueProjects as string[];
  } catch (e: any) {
    console.error(
      "❌ Error en Sidebar Projects:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}
