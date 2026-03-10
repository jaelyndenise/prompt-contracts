import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.warn("Stripe signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await convex.mutation(api.payments.markPaid, {
          stripeSessionId: session.id,
        });
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await convex.mutation(api.payments.markFailed, {
          stripeInvoiceId: invoice.id!,
        });
        break;
      }
      default:
        // Unknown event type — ignore silently
        break;
    }
  } catch (err) {
    console.error(`Error processing ${event.type}:`, err);
    // Still return 200 — Stripe will retry on non-200,
    // which we don't want for app-level errors
  }

  return NextResponse.json({ received: true });
}
