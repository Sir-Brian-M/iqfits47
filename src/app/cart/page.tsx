"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatKES } from "@/lib/utils";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart((s) => s.subtotal());

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <ShoppingBag size={40} className="mb-4 text-ink/20" />
        <h1 className="font-display text-3xl uppercase tracking-tight">Your bag is empty</h1>
        <p className="mt-2 text-sm text-ink/50">Time to fix that.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-hazard px-7 py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
        >
          Shop the drop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-4xl uppercase tracking-tight">Your Bag</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map((line) => (
            <motion.div
              key={`${line.productId}-${line.size}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 rounded-2xl border border-ink/10 p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                <Image src={line.image} alt={line.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-base uppercase tracking-tight">{line.name}</p>
                    <p className="text-xs text-ink/50">
                      {line.brand} · Size {line.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeLine(line.productId, line.size)}
                    className="rounded-full p-1 text-ink/40 hover:bg-ink/5 hover:text-hazard"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center font-mono text-sm">{line.quantity}</span>
                    <button
                      onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-mono text-sm">{formatKES(line.price * line.quantity)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ticket-notch relative h-fit rounded-3xl border-2 border-dashed border-ink/15 bg-stone-100 p-6">
          <h2 className="font-display text-lg uppercase tracking-tight">Order summary</h2>
          <div className="mt-4 space-y-2 font-mono text-sm text-ink/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatKES(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-ink/40">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink/15 pt-4 font-display text-lg uppercase">
            <span>Total</span>
            <span className="font-mono">{formatKES(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-hazard py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
          >
            Checkout with M-Pesa <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
