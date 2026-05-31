"use server"; // Indica que este archivo se ejecuta únicamente en el backend (servidor)

import { queryDataCloud } from "../salesforce";

export async function fetchSalesData() {
  console.log("🔥 INICIANDO LLAMADA REAL A SALESFORCE 🔥");

  try {
    // Obtiene las 5 ventas más recientes ordenadas por fecha de creación
    const query =
      "SELECT Id, Cliente__c, Producto__c, Fecha__c, Monto__c, Estado__c FROM Venta__c ORDER BY CreatedDate DESC LIMIT 5";
    console.log("Ejecutando SQL:", query);

    const data = await queryDataCloud(query);

    console.log("✅ Datos crudos obtenidos:", data);
    return data;
  } catch (e: any) {
    // Captura errores de conexión o sintaxis y devuelve un arreglo vacío para no romper la UI
    console.error(
      "❌ Error devuelto por Salesforce:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchTopProductsData() {
  console.log("🔥 INICIANDO LLAMADA TOP PRODUCTOS REALES 🔥");

  try {
    // Agrupa los registros por producto y calcula la suma total de sus unidades e ingresos
    const query =
      "SELECT Producto__c, SUM(Unidades__c) TotalUnidades, SUM(Ingresos__c) TotalIngresos FROM Venta__c GROUP BY Producto__c";

    console.log("Ejecutando SQL Top Products:", query);

    const data = await queryDataCloud(query);

    // Ordena los resultados de mayor a menor ingreso usando JavaScript y toma los primeros 5
    const sortedData = data
      .sort((a: any, b: any) => (b.TotalIngresos || 0) - (a.TotalIngresos || 0))
      .slice(0, 5);

    console.log("✅ Datos reales de tus campos listos:", sortedData);
    return sortedData;
  } catch (e: any) {
    console.error(
      "❌ Error en Top Products:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchMonthlyOrdersData() {
  console.log("🔥 INICIANDO LLAMADA PEDIDOS POR MES 🔥");
  try {
    // Extrae solo las fechas de las ventas para posteriormente contarlas por mes
    const query = "SELECT Fecha__c FROM Venta__c WHERE Fecha__c != null";
    const data = await queryDataCloud(query);
    return data;
  } catch (e: any) {
    console.error(
      "❌ Error en Pedidos por mes:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchMonthlyRevenueData() {
  console.log("🔥 INICIANDO LLAMADA INGRESOS POR MES 🔥");
  try {
    // Extrae fechas y montos para construir la gráfica de evolución de ingresos
    const query =
      "SELECT Fecha__c, Monto__c, Ingresos__c FROM Venta__c WHERE Fecha__c != null";
    const data = await queryDataCloud(query);
    return data;
  } catch (e: any) {
    console.error(
      "❌ Error en Ingresos por mes:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchSalesByStatusData() {
  console.log("🔥 INICIANDO LLAMADA VENTAS POR ESTADO 🔥");
  try {
    // Extrae estados y montos para la gráfica de distribución (ej. canales de venta)
    const query =
      "SELECT Estado__c, Monto__c, Ingresos__c FROM Venta__c WHERE Estado__c != null";
    const data = await queryDataCloud(query);
    return data;
  } catch (e: any) {
    console.error(
      "❌ Error en Ventas por estado:",
      e.response?.data || e.message || e,
    );
    return [];
  }
}

export async function fetchSalesStatsData() {
  console.log("🔥 INICIANDO LLAMADA ESTADÍSTICAS GENERALES 🔥");
  try {
    // Trae los datos base de todas las ventas para calcular los indicadores principales (Cards)
    const query = "SELECT Cliente__c, Monto__c, Ingresos__c FROM Venta__c";
    const data = await queryDataCloud(query);

    let totalRevenue = 0;
    let totalOrders = data.length; // Cada fila representa una venta/pedido
    const uniqueClients = new Set(); // El Set asegura que no se cuenten clientes duplicados

    // Recorre todas las ventas para sumar los ingresos y registrar clientes únicos
    data.forEach((venta: any) => {
      totalRevenue += venta.Ingresos__c || venta.Monto__c || 0;

      if (venta.Cliente__c) {
        uniqueClients.add(venta.Cliente__c);
      }
    });

    // Calcula métricas derivadas de los totales obtenidos
    const newClients = uniqueClients.size;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    console.log("✅ Estadísticas calculadas:", {
      totalRevenue,
      totalOrders,
      newClients,
      avgTicket,
    });

    return {
      totalRevenue,
      totalOrders,
      newClients,
      avgTicket,
    };
  } catch (e: any) {
    console.error(
      "❌ Error en Estadísticas:",
      e.response?.data || e.message || e,
    );
    // Devuelve valores en 0 para evitar que el frontend muestre errores o "undefined"
    return { totalRevenue: 0, totalOrders: 0, newClients: 0, avgTicket: 0 };
  }
}
