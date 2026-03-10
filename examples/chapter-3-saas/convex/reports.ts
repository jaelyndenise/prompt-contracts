import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";

export const generateReport = action({
  args: {
    reportId: v.id("reports"),
    productDescription: v.string(),
    targetMarket: v.string(),
    tier: v.union(v.literal("standard"), v.literal("premium")),
  },
  handler: async (ctx, args) => {
    const client = new Anthropic();

    const systemPrompt = `You are a Dream 100 research analyst.
Your job is to identify the 100 most relevant distribution
partners, influencers, and audience holders for a given product
and market.

Return ONLY a valid JSON array of exactly 100 objects. No
preamble, no explanation, no markdown. Raw JSON.

Each object must have: name, platform, audience_size (string),
relevance_score (integer 1-10), relevance_justification
(1-2 sentences), category (one of: influencer, newsletter,
podcast, community, media), suggested_outreach_angle (specific,
not generic), profile_url (real, verifiable URL).

CRITICAL: Every contact MUST be a real, verifiable person or
brand. Do NOT invent names or generate plausible-sounding URLs.
Do NOT combine traits from multiple people into composites.
If you cannot find 100 real contacts, return fewer.

Category minimum: 15 per category. Prioritize relevance over
follower count. No accounts inactive for 6+ months. No
duplicates.

${args.tier === "premium" ? `PREMIUM TIER: Include additional
fields for each contact: priority_rank (1-100),
activation_channel (how to best reach them),
content_frequency (how often they post),
partnership_signals (evidence they do collabs/sponsorships).` : ""}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514", // Use latest stable model ID
      max_tokens: 8192,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Product: ${args.productDescription}\nTarget Market: ${args.targetMarket}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    let contacts;
    try {
      contacts = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`AI returned invalid JSON: ${responseText.slice(0, 200)}`);
    }

    for (const contact of contacts) {
      await ctx.runMutation(api.contacts.create, {
        reportId: args.reportId,
        name: contact.name,
        platform: contact.platform,
        audienceSize: contact.audience_size,
        relevanceScore: contact.relevance_score,
        category: contact.category,
        suggestedAngle: contact.suggested_outreach_angle,
        profileUrl: contact.profile_url,
      });
    }

    await ctx.runMutation(api.reports.markComplete, {
      reportId: args.reportId,
      contactCount: contacts.length,
    });
  },
});
