"use server";

import { queryDataCloud } from "../salesforce";

export async function fetchOverviewKPIs() {
  try {
    const [tickets, evaluations, reports, revenues] = await Promise.all([
      queryDataCloud(
        "SELECT Name, Trabajador_encargado__c, Status__c, Fecha_de_emision__c, Tiempo_Respuesta_Minutos__c FROM Ticket__c",
      ),
      queryDataCloud(
        "SELECT Puntualidad__c, Colaboracion__c, Comunicacion__c, Iniciativa__c, Etica__c, Cumplimiento_Objetivos__c, Fecha_Evaluacion__c FROM Evaluacion_Equipo__c",
      ),
      queryDataCloud(
        "SELECT Status__c, Fecha_Entrega__c FROM Reporte_Operativo__c",
      ),
      queryDataCloud("SELECT Monto__c, Fecha__c FROM Ingreso__c"),
    ]);

    return {
      tickets: tickets || [],
      evaluations: evaluations || [],
      reports: reports || [],
      revenues: revenues || [],
    };
  } catch (e: any) {
    console.error("❌ Error en fetchOverviewKPIs:", e.message || e);
    return { tickets: [], evaluations: [], reports: [], revenues: [] };
  }
}
