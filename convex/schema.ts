import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clients: defineTable({
    name: v.string(),
    phone: v.string(),
    status: v.union(
      v.literal("Activo"),
      v.literal("Inactivo"),
      v.literal("Potencial")
    ),
    lastInteraction: v.number(), // timestamp
    interactions: v.array(v.object({
      id: v.string(),
      date: v.number(),
      description: v.string(),
      type: v.union(
        v.literal("llamada"),
        v.literal("email"),
        v.literal("reunion"),
        v.literal("otro")
      )
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_last_interaction", ["lastInteraction"])
    .index("by_created_at", ["createdAt"]),
});
