"use server";

import { queryDataCloud } from "../salesforce";

export async function fetchTicketsData() {
  console.log("🔥 INICIANDO LLAMADA TICKETS 🔥");

  try {
    // Obtiene los datos básicos de todos los tickets (ID, Estado y Tipo)
    const query = "SELECT Id, Status__c, Tipo__c FROM Ticket__c";

    console.log("Ejecutando SQL Tickets:", query);
    const data = await queryDataCloud(query);

    return data;
  } catch (e: any) {
    // Captura errores y devuelve un arreglo vacío para que el frontend no colapse
    console.error("❌ Error en Tickets:", e.response?.data || e.message || e);
    return [];
  }
}

export async function fetchMonthlyTicketsData() {
  console.log("🔥 INICIANDO LLAMADA EVOLUCIÓN MENSUAL TICKETS 🔥");

  try {
    // Extrae el ID, Estado y Fecha de creación de los tickets que tengan fecha válida
    // Se usa para armar gráficas de líneas o barras agrupadas por mes
    const query =
      "SELECT Id, Status__c, CreatedDate FROM Ticket__c WHERE CreatedDate != null";
    const data = await queryDataCloud(query);
    return data;
  } catch (e: any) {
    console.error(
      "❌ Error en Evolución Tickets:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchDetailedTicketsData() {
  try {
    const query =
      "SELECT Id, Name, Trabajador_encargado__c, Correo__c, Status__c, Tipo__c, Fecha_de_emision__c FROM Ticket__c";
    const data = await queryDataCloud(query);
    return data || [];
  } catch (e: any) {
    console.error(
      "❌ Error en fetchDetailedTicketsData:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}
