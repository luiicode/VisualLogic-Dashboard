import { queryDataCloud } from "@/lib/salesforce";

export async function getDashboardMetrics() {
  try {
    // Consultamos los 4 DMOs
    const [equipos, integrantes, ventas, tickets] = await Promise.all([
      queryDataCloud("SELECT Name__c, Id__c FROM Equipo_DMO__dll"),
      queryDataCloud("SELECT Nombre__c, Puesto__c FROM Integrante_DMO__dll"),
      queryDataCloud("SELECT Monto__c, Fecha__c FROM Venta_DMO__dll"),
      queryDataCloud(
        "SELECT Estado__c, Prioridad__c FROM Ticket_Soporte_DMO__dll",
      ),
    ]);

    return {
      // Regresamos el objeto de cada una de las DMOs o un objeto vacio
      equipos: equipos || [],
      integrantes: integrantes || [],
      ventas: ventas || [],
      tickets: tickets || [],
    };
  } catch (error) {
    console.error("Error al traer datos de Data Cloud:", error);
    return { equipos: [], integrantes: [], ventas: [], tickets: [] };
  }
}
