import { NextRequest, NextResponse } from "next/server";
import { checkTransactionStatus } from "@/lib/lipia";
import { getOrderByNumber, markOrderPaid } from "@/lib/orders";

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get("order");
  if (!orderNumber) {
    return NextResponse.json({ error: "Missing order number." }, { status: 400 });
  }

  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  // Already confirmed — no need to hit Lipia again.
  if (order.status !== "payment_pending") {
    return NextResponse.json({ order, status: "success" });
  }

  if (!order.transactionReference) {
    return NextResponse.json({ order, status: "pending" });
  }

  const result = await checkTransactionStatus(order.transactionReference);

  if (result.status === "success") {
    const updated = await markOrderPaid(orderNumber, result.mpesaReceipt);
    return NextResponse.json({ order: updated ?? order, status: "success" });
  }

  return NextResponse.json({ order, status: result.status, message: result.message });
}
