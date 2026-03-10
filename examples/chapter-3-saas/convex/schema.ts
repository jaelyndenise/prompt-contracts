import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  reports: defineTable({
    userId: v.id("users"),
    productDescription: v.string(),
    targetMarket: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    tier: v.union(v.literal("standard"), v.literal("premium")),
    contactCount: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  contacts: defineTable({
    reportId: v.id("reports"),
    name: v.string(),
    platform: v.string(),
    audienceSize: v.string(),
    relevanceScore: v.number(),
    category: v.union(
      v.literal("influencer"),
      v.literal("newsletter"),
      v.literal("podcast"),
      v.literal("community"),
      v.literal("media")
    ),
    suggestedAngle: v.string(),
    profileUrl: v.string(),
  }).index("by_report", ["reportId"]),

  payments: defineTable({
    userId: v.id("users"),
    reportId: v.id("reports"),
    stripeSessionId: v.string(),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  }).index("by_stripe_session", ["stripeSessionId"]),
});
