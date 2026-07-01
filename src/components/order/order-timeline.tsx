"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatKES } from "@/lib/utils";

const STEPS: OrderStatus[] = [
  "paid",
  "processing",
  "dispatched",
  "out_for_delivery",
  "delivered",
];

export function OrderTimeline({ order }: { order: Order }) {
  const isCancelled = order.status === "cancelled";
  const currentIndex = STEPS.indexOf(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-3xl border border-ink/10 bg-white"
    >
      <div className="ticket-notch relative border-b-2 border-dashed border-ink/15 bg-ink px-6 py-6 text-stone-50">
        <p className="font-mono text-xs uppercase tracking-wide text-stone-50/50">Order number</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-3xl tracking-tight">{order.orderNumber}</h2>
          <span className="font-mono text-sm">{formatKES(order.total)}</span>
        </div>
        <p className="mt-1 text-xs text-stone-50/50">Placed {formatDate(order.createdAt)}</p>
      </div>

      <div className="px-6 py-6">
        {isCancelled ? (
          <p className="rounded-xl bg-hazard-100 px-4 py-3 text-sm font-medium text-hazard">
            This order was cancelled.
          </p>
        ) : (
          <ol className="relative space-y-6 pl-6">
            <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px bg-ink/10" />
            {STEPS.map((step, i) => {
              const entry = order.timeline.find((t) => t.status === step);
              const done = currentIndex >= i;
              return (
                <li key={step} className="relative">
                  <span
                    className={`absolute -left-6 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                      done ? "bg-hazard" : "bg-stone-200"
                    }`}
                  />
                  <p
                    className={`font-display text-sm uppercase tracking-wide ${
                      done ? "text-ink" : "text-ink/30"
                    }`}
                  >
                    {entry?.label ?? stepLabel(step)}
                  </p>
                  {entry && (
                    <p className="text-xs text-ink/40">{formatDate(entry.timestamp)}</p>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="border-t border-dashed border-ink/15 px-6 py-6">
        <h3 className="mb-3 font-display text-sm uppercase tracking-wide">Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">{item.name}</p>
                <p className="text-xs text-ink/50">
                  {item.brand} · Size {item.size} · Qty {item.quantity}
                </p>
              </div>
              <span className="font-mono text-sm">{formatKES(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1 border-t border-ink/10 pt-4 font-mono text-sm">
          <div className="flex justify-between text-ink/60">
            <span>Subtotal</span>
            <span>{formatKES(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink/60">
            <span>Delivery</span>
            <span>{order.deliveryFee === 0 ? "Free" : formatKES(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-ink">
            <span>Total</span>
            <span>{formatKES(order.total)}</span>
          </div>
        </div>

        {order.mpesaReceipt && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/50">
            <CheckCircle2 size={13} className="text-hazard" />
            M-Pesa receipt: {order.mpesaReceipt}
          </p>
        )}
      </div>

      <div className="border-t border-ink/10 px-6 py-5 text-xs text-ink/50">
        Delivering to <span className="font-medium text-ink">{order.delivery.fullName}</span>,{" "}
        {order.delivery.addressLine}, {order.delivery.town}, {order.delivery.county}
      </div>
    </motion.div>
  );
}

function stepLabel(step: OrderStatus) {
  const labels: Record<OrderStatus, string> = {
    payment_pending: "Waiting for payment",
    paid: "Payment received",
    processing: "Being packed",
    dispatched: "Dispatched",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[step];
}
