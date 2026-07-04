// Uses the generic builders so the app compiles before `bunx convex dev` has
// generated ./_generated. After the first codegen run, switch to:
//   import { mutation } from "./_generated/server";
import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("leads", args);
  },
});
