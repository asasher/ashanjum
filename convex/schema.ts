import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    lane: v.union(
      v.literal("umbrella"),
      v.literal("delivery-margin-recovery"),
      v.literal("review-insights"),
    ),
    packet: v.optional(v.string()),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    whatsapp: v.optional(v.string()),
    venues: v.optional(v.string()),
    monthlyDeliveryGmv: v.optional(v.string()),
    notes: v.optional(v.string()),
    sourcePath: v.optional(v.string()),
  })
    .index("by_lane", ["lane"])
    .index("by_email", ["email"]),
});
