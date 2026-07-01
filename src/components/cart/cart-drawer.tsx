"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatKES } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-stone-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="font-display text-xl uppercase tracking-tight">
                Your Bag {lines.length > 0 && `(${lines.length})`}
              </h2>
              <button onClick={close} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-ink/5">
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={36} className="text-ink/20" />
                <p className="font-display text-lg uppercase">Your bag is empty</p>
                <p className="text-sm text-ink/50">Nothing here yet — go find your next pair.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="mt-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-stone-50 transition-transform hover:scale-105"
                >
                  Shop the drop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  {lines.map((line) => (
                    <div
                      key={`${line.productId}-${line.size}`}
                      className="flex gap-3 border-b border-ink/10 pb-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium leading-tight">{line.name}</p>
                            <p className="text-xs text-ink/50">
                              {line.brand} · Size {line.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeLine(line.productId, line.size)}
                            className="text-xs text-ink/40 hover:text-hazard"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-ink/15 px-1">
                            <button
                              className="p-1"
                              onClick={() =>
                                setQuantity(line.productId, line.size, line.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-4 text-center font-mono text-xs">{line.quantity}</span>
                            <button
                              className="p-1"
                              onClick={() =>
                                setQuantity(line.productId, line.size, line.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="font-mono text-sm">
                            {formatKES(line.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ticket-notch relative border-t-2 border-dashed border-ink/20 px-5 py-5">
                  <div className="flex items-center justify-between font-display text-lg uppercase">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatKES(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink/50">
                    Delivery fee calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-hazard py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Checkout with M-Pesa
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
