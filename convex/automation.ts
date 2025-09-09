import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Función para marcar clientes inactivos automáticamente
export const markInactiveClients = mutation({
  args: {
    daysThreshold: v.optional(v.number()), // Por defecto 30 días
  },
  handler: async (ctx, args) => {
    const threshold = args.daysThreshold || 30;
    const thresholdTime = Date.now() - (threshold * 24 * 60 * 60 * 1000);

    // Obtener todos los clientes que no han tenido interacción en el período especificado
    const clients = await ctx.db.query("clients").collect();
    
    const inactiveClients = clients.filter(client => 
      client.lastInteraction < thresholdTime && 
      client.status !== "Inactivo"
    );

    let updatedCount = 0;

    // Marcar como inactivos
    for (const client of inactiveClients) {
      await ctx.db.patch(client._id, {
        status: "Inactivo",
        updatedAt: Date.now(),
      });
      updatedCount++;
    }

    return {
      message: `Se marcaron ${updatedCount} clientes como inactivos`,
      updatedClients: updatedCount,
      threshold: threshold,
      processedAt: Date.now(),
    };
  },
});

// Función para obtener clientes que necesitan seguimiento
export const getClientsNeedingFollowUp = query({
  args: {
    daysThreshold: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const threshold = args.daysThreshold || 30;
    const thresholdTime = Date.now() - (threshold * 24 * 60 * 60 * 1000);

    const clients = await ctx.db.query("clients").collect();
    
    return clients.filter(client => 
      client.lastInteraction < thresholdTime && 
      client.status !== "Inactivo"
    );
  },
});

// Función para generar reporte de actividad
export const generateActivityReport = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    const now = Date.now();
    
    const report = {
      totalClients: clients.length,
      activeLast7Days: clients.filter(c => 
        now - c.lastInteraction <= 7 * 24 * 60 * 60 * 1000
      ).length,
      activeLast30Days: clients.filter(c => 
        now - c.lastInteraction <= 30 * 24 * 60 * 60 * 1000
      ).length,
      inactiveOver30Days: clients.filter(c => 
        now - c.lastInteraction > 30 * 24 * 60 * 60 * 1000
      ).length,
      inactiveOver60Days: clients.filter(c => 
        now - c.lastInteraction > 60 * 24 * 60 * 60 * 1000
      ).length,
      statusBreakdown: {
        activos: clients.filter(c => c.status === "Activo").length,
        inactivos: clients.filter(c => c.status === "Inactivo").length,
        potenciales: clients.filter(c => c.status === "Potencial").length,
      },
      generatedAt: now,
    };

    return report;
  },
});

// Función para limpiar datos antiguos (opcional)
export const cleanupOldData = mutation({
  args: {
    daysToKeep: v.optional(v.number()), // Por defecto mantener 1 año
  },
  handler: async (ctx, args) => {
    const daysToKeep = args.daysToKeep || 365;
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);

    const clients = await ctx.db.query("clients").collect();
    
    // Filtrar interacciones antiguas de cada cliente
    let cleanedClients = 0;
    
    for (const client of clients) {
      const recentInteractions = client.interactions.filter(
        interaction => interaction.date > cutoffTime
      );
      
      if (recentInteractions.length !== client.interactions.length) {
        await ctx.db.patch(client._id, {
          interactions: recentInteractions,
          updatedAt: Date.now(),
        });
        cleanedClients++;
      }
    }

    return {
      message: `Se limpiaron interacciones antiguas de ${cleanedClients} clientes`,
      cutoffDate: cutoffTime,
      processedAt: Date.now(),
    };
  },
});
