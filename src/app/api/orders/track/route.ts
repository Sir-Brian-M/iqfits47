import { NextRequest, NextResponse } from "next/server";
import { getOrderForTracking } from "@/lib/orders";

export async function POST(req: NextRequest) {
  const { orderNumber, phone } = await req.json().catch(() => ({}));

  if (!orderNumber || !phone) {
    return NextResponse.json(
      { error: "Enter both your order number and phone number." },
      { status: 400 }
    );
  }

  const order = await getOrderForTracking(orderNumber, phone);

  if (!order) {
    return NextResponse.json(
      { error: "We couldn't find an order matching those details. Double check and try again." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}
