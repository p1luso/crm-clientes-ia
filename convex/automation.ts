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

// Función para generar recordatorios de seguimiento
export const generateFollowUpReminders = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    const now = Date.now();
    
    const reminders = clients.map(client => {
      const daysSinceLastInteraction = Math.floor(
        (now - client.lastInteraction) / (1000 * 60 * 60 * 24)
      );
      
      // Calcular frecuencia recomendada basada en el estado del cliente
      let recommendedFrequency = 30; // Por defecto 30 días
      let priority = "Media";
      
      switch (client.status) {
        case "Activo":
          recommendedFrequency = 14; // Cada 2 semanas
          priority = "Alta";
          break;
        case "Potencial":
          recommendedFrequency = 7; // Cada semana
          priority = "Alta";
          break;
        case "Inactivo":
          recommendedFrequency = 60; // Cada 2 meses
          priority = "Baja";
          break;
      }
      
      // Calcular si necesita seguimiento
      const needsFollowUp = daysSinceLastInteraction >= recommendedFrequency;
      const daysOverdue = Math.max(0, daysSinceLastInteraction - recommendedFrequency);
      
      // Calcular el mejor momento para contactar (simulado)
      const bestTimeToContact = getBestTimeToContact(client);
      
      return {
        clientId: client._id,
        clientName: client.name,
        clientPhone: client.phone,
        clientStatus: client.status,
        daysSinceLastInteraction,
        recommendedFrequency,
        needsFollowUp,
        daysOverdue,
        priority,
        bestTimeToContact,
        lastInteractionDate: client.lastInteraction,
        totalInteractions: client.interactions.length,
      };
    });
    
    // Filtrar solo los que necesitan seguimiento y ordenar por prioridad
    const urgentReminders = reminders
      .filter(reminder => reminder.needsFollowUp)
      .sort((a, b) => {
        // Ordenar por días de retraso (más urgente primero)
        if (b.daysOverdue !== a.daysOverdue) {
          return b.daysOverdue - a.daysOverdue;
        }
        // Luego por prioridad
        const priorityOrder = { "Alta": 3, "Media": 2, "Baja": 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      });
    
    return {
      totalClients: clients.length,
      clientsNeedingFollowUp: urgentReminders.length,
      reminders: urgentReminders,
      generatedAt: now,
    };
  },
});

// Función para categorización inteligente automática
export const smartCategorization = mutation({
  args: {
    clientId: v.optional(v.id("clients")), // Si no se especifica, procesa todos
  },
  handler: async (ctx, args) => {
    const clients = args.clientId 
      ? [await ctx.db.get(args.clientId)].filter(Boolean)
      : await ctx.db.query("clients").collect();
    
    if (clients.length === 0) {
      throw new Error("No se encontraron clientes para procesar");
    }
    
    const results = [];
    const now = Date.now();
    
    for (const client of clients) {
      const daysSinceLastInteraction = Math.floor(
        (now - client.lastInteraction) / (1000 * 60 * 60 * 24)
      );
      
      // Análisis inteligente basado en múltiples factores
      const analysis = analyzeClientIntelligence(client, daysSinceLastInteraction);
      
      // Solo actualizar si hay un cambio recomendado
      if (analysis.recommendedStatus !== client.status) {
        await ctx.db.patch(client._id, {
          status: analysis.recommendedStatus,
          updatedAt: now,
        });
        
        results.push({
          clientId: client._id,
          clientName: client.name,
          previousStatus: client.status,
          newStatus: analysis.recommendedStatus,
          reason: analysis.reason,
          confidence: analysis.confidence,
          factors: analysis.factors,
        });
      }
    }
    
    return {
      message: `Se procesaron ${clients.length} clientes, ${results.length} fueron recategorizados`,
      processedClients: clients.length,
      recategorizedClients: results.length,
      changes: results,
      processedAt: now,
    };
  },
});

// Función auxiliar para calcular el mejor momento para contactar
function getBestTimeToContact(client: any): string {
  // Simulación de análisis de patrones de respuesta
  const hour = new Date().getHours();
  
  if (hour >= 9 && hour <= 11) {
    return "Mañana (9:00-11:00) - Mejor momento para llamadas";
  } else if (hour >= 14 && hour <= 16) {
    return "Tarde (14:00-16:00) - Buen momento para emails";
  } else if (hour >= 10 && hour <= 12) {
    return "Media mañana (10:00-12:00) - Ideal para seguimientos";
  } else {
    return "Horario comercial (9:00-17:00) - Recomendado";
  }
}

// Función auxiliar para análisis inteligente de clientes
function analyzeClientIntelligence(client: any, daysSinceLastInteraction: number) {
  const factors = [];
  let score = 0;
  
  // Factor 1: Frecuencia de interacciones
  const interactionFrequency = client.interactions.length;
  if (interactionFrequency >= 5) {
    score += 30;
    factors.push("Alta frecuencia de interacciones");
  } else if (interactionFrequency >= 2) {
    score += 15;
    factors.push("Frecuencia moderada de interacciones");
  } else {
    score -= 10;
    factors.push("Baja frecuencia de interacciones");
  }
  
  // Factor 2: Tiempo desde última interacción
  if (daysSinceLastInteraction <= 7) {
    score += 25;
    factors.push("Interacción muy reciente");
  } else if (daysSinceLastInteraction <= 30) {
    score += 10;
    factors.push("Interacción reciente");
  } else if (daysSinceLastInteraction <= 60) {
    score -= 5;
    factors.push("Interacción moderadamente antigua");
  } else {
    score -= 20;
    factors.push("Interacción muy antigua");
  }
  
  // Factor 3: Tiempo como cliente
  const daysAsClient = Math.floor((Date.now() - client.createdAt) / (1000 * 60 * 60 * 24));
  if (daysAsClient >= 90) {
    score += 15;
    factors.push("Cliente establecido");
  } else if (daysAsClient >= 30) {
    score += 5;
    factors.push("Cliente en desarrollo");
  } else {
    score -= 5;
    factors.push("Cliente nuevo");
  }
  
  // Factor 4: Estado actual
  if (client.status === "Activo") {
    score += 20;
    factors.push("Estado actual: Activo");
  } else if (client.status === "Potencial") {
    score += 5;
    factors.push("Estado actual: Potencial");
  } else {
    score -= 15;
    factors.push("Estado actual: Inactivo");
  }
  
  // Determinar estado recomendado basado en el score
  let recommendedStatus: "Activo" | "Inactivo" | "Potencial";
  let confidence: "Alta" | "Media" | "Baja";
  let reason: string;
  
  if (score >= 50) {
    recommendedStatus = "Activo";
    confidence = "Alta";
    reason = "Cliente muestra alta actividad y engagement";
  } else if (score >= 20) {
    recommendedStatus = "Potencial";
    confidence = "Media";
    reason = "Cliente con potencial de desarrollo";
  } else {
    recommendedStatus = "Inactivo";
    confidence = score <= -20 ? "Alta" : "Media";
    reason = "Cliente muestra baja actividad";
  }
  
  return {
    recommendedStatus,
    confidence,
    reason,
    factors,
    score,
  };
}
