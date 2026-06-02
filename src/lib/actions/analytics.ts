"use server";

import { queryDataCloud } from "../salesforce";

export async function fetchDashboardAnalytics() {
  try {
    // Disparamos las 3 consultas al mismo tiempo para no hacer esperar al usuario
    const [evaluations, reports, tickets] = await Promise.all([
      queryDataCloud(
        "SELECT Puntualidad__c, Colaboracion__c, Comunicacion__c, Iniciativa__c, Etica__c, Cumplimiento_Objetivos__c, Fecha_Evaluacion__c FROM Evaluacion_Equipo__c",
      ),
      queryDataCloud(
        "SELECT Status__c, Fecha_Entrega__c FROM Reporte_Operativo__c",
      ),
      queryDataCloud(
        "SELECT Status__c, Tiempo_Respuesta_Minutos__c, Fecha_de_emision__c FROM Ticket__c",
      ),
    ]);

    return {
      evaluations: evaluations || [],
      reports: reports || [],
      tickets: tickets || [],
    };
  } catch (e: any) {
    console.error(
      "❌ Error en fetchDashboardAnalytics:",
      e.response?.data || e.message,
    );
    return { evaluations: [], reports: [], tickets: [] };
  }
}
