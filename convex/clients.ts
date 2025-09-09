import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener todos los clientes
export const getAllClients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").collect();
  },
});

// Obtener clientes por estado
export const getClientsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Obtener un cliente por ID
export const getClientById = query({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Crear un nuevo cliente
export const createClient = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    status: v.union(
      v.literal("Activo"),
      v.literal("Inactivo"),
      v.literal("Potencial")
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("clients", {
      name: args.name,
      phone: args.phone,
      status: args.status,
      lastInteraction: now,
      interactions: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Actualizar un cliente
export const updateClient = mutation({
  args: {
    id: v.id("clients"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("Activo"),
        v.literal("Inactivo"),
        v.literal("Potencial")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Eliminar un cliente
export const deleteClient = mutation({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Agregar una interacción
export const addInteraction = mutation({
  args: {
    clientId: v.id("clients"),
    description: v.string(),
    type: v.union(
      v.literal("llamada"),
      v.literal("email"),
      v.literal("reunion"),
      v.literal("otro")
    ),
  },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    const newInteraction = {
      id: crypto.randomUUID(),
      date: Date.now(),
      description: args.description,
      type: args.type,
    };

    const updatedInteractions = [...client.interactions, newInteraction];

    return await ctx.db.patch(args.clientId, {
      interactions: updatedInteractions,
      lastInteraction: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Cambiar estado de relación
export const changeStatus = mutation({
  args: {
    clientId: v.id("clients"),
    status: v.union(
      v.literal("Activo"),
      v.literal("Inactivo"),
      v.literal("Potencial")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.clientId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Obtener estadísticas del dashboard
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    
    const stats = {
      total: clients.length,
      activos: clients.filter(c => c.status === "Activo").length,
      inactivos: clients.filter(c => c.status === "Inactivo").length,
      potenciales: clients.filter(c => c.status === "Potencial").length,
      sinInteraccion30Dias: clients.filter(c => 
        Date.now() - c.lastInteraction > 30 * 24 * 60 * 60 * 1000
      ).length,
    };

    return stats;
  },
});
