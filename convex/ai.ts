import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Analizar cliente con IA (simulado)
export const analyzeClient = query({
  args: { clientId: v.id("clients") },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    const daysSinceLastInteraction = Math.floor(
      (Date.now() - client.lastInteraction) / (1000 * 60 * 60 * 24)
    );

    // Simulación de análisis de IA
    let analysis = "";
    let priority = "Media";
    let suggestion = "";

    if (daysSinceLastInteraction > 90) {
      analysis = "Cliente con muy baja actividad";
      priority = "Alta";
      suggestion = "Este cliente lleva más de 3 meses sin contacto. Recomendaría marcarlo como prioridad alta y contactarlo inmediatamente.";
    } else if (daysSinceLastInteraction > 30) {
      analysis = "Cliente con actividad moderada";
      priority = "Media";
      suggestion = "Este cliente lleva más de un mes sin contacto. Consideraría programar una llamada de seguimiento.";
    } else {
      analysis = "Cliente activo";
      priority = "Baja";
      suggestion = "Este cliente tiene buena actividad reciente. Mantener el contacto regular.";
    }

    // Análisis basado en el número de interacciones
    if (client.interactions.length < 3) {
      analysis += " - Pocas interacciones registradas";
      suggestion += " Considerar aumentar la frecuencia de contacto para fortalecer la relación.";
    }

    return {
      analysis,
      priority,
      suggestion,
      daysSinceLastInteraction,
      totalInteractions: client.interactions.length,
    };
  },
});

// Categorizar automáticamente con IA (simulado)
export const categorizeClient = mutation({
  args: { clientId: v.id("clients") },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    const daysSinceLastInteraction = Math.floor(
      (Date.now() - client.lastInteraction) / (1000 * 60 * 60 * 24)
    );

    let newStatus: "Activo" | "Inactivo" | "Potencial";

    // Lógica de categorización automática
    if (daysSinceLastInteraction <= 30 && client.interactions.length >= 2) {
      newStatus = "Activo";
    } else if (daysSinceLastInteraction > 60) {
      newStatus = "Inactivo";
    } else {
      newStatus = "Potencial";
    }

    // Actualizar el estado del cliente
    await ctx.db.patch(args.clientId, {
      status: newStatus,
      updatedAt: Date.now(),
    });

    return {
      previousStatus: client.status,
      newStatus,
      reason: `Categorizado automáticamente basado en ${daysSinceLastInteraction} días desde la última interacción y ${client.interactions.length} interacciones totales.`,
    };
  },
});

// Generar resumen de la cartera de clientes
export const generatePortfolioSummary = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);

    const activeClients = clients.filter(c => c.status === "Activo");
    const inactiveClients = clients.filter(c => c.status === "Inactivo");
    const potentialClients = clients.filter(c => c.status === "Potencial");

    const clientsNeedingAttention = clients.filter(c => 
      c.lastInteraction < thirtyDaysAgo && c.status !== "Inactivo"
    );

    const summary = {
      totalClients: clients.length,
      activeClients: activeClients.length,
      inactiveClients: inactiveClients.length,
      potentialClients: potentialClients.length,
      clientsNeedingAttention: clientsNeedingAttention.length,
      recommendations: [
        clientsNeedingAttention.length > 0 
          ? `${clientsNeedingAttention.length} clientes necesitan atención inmediata`
          : "Todos los clientes están al día",
        inactiveClients.length > 0 
          ? `Revisar ${inactiveClients.length} clientes inactivos para reactivación`
          : "No hay clientes inactivos",
        potentialClients.length > 0 
          ? `Desarrollar ${potentialClients.length} clientes potenciales`
          : "No hay clientes potenciales pendientes"
      ].filter(Boolean),
    };

    return summary;
  },
});
