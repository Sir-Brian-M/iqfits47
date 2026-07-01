import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/orders";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Webhook receiver for Lipia Online payment callbacks, in case they
 * offer a CallBackURL setting on the app dashboard (recommended —
 * faster than polling). Point that setting to:
 *   https://yourdomain.co.ke/api/payments/callback
 *
 * We look up the order by the transaction reference Lipia sends back,
 * so field names here may need a small tweak once you can see a real
 * callback payload from the dashboard logs.
 */
export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const reference =
    payload.reference ?? payload.CheckoutRequestID ?? payload.checkout_request_id;
  const status = String(payload.status ?? "").toLowerCase();
  const mpesaReceipt = payload.mpesa_receipt ?? payload.MpesaReceiptNumber;

  if (!reference) {
    return NextResponse.json({ error: "Missing transaction reference" }, { status: 400 });
  }

  const { data: order } = await supabaseServer
    .from("orders")
    .select("order_number")
    .eq("transaction_reference", reference)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: "Order not found for this transaction" }, { status: 404 });
  }

  if (["success", "completed", "paid"].includes(status)) {
    await markOrderPaid(order.order_number, mpesaReceipt);
  }

  return NextResponse.json({ received: true });
}
