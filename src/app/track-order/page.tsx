"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageSearch, Loader2, Search } from "lucide-react";
import { Order } from "@/lib/types";
import { OrderTimeline } from "@/components/order/order-timeline";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Order not found.");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <PackageSearch size={32} className="mx-auto mb-3 text-hazard" />
        <h1 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Track your order
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Enter your order number and the phone number you checked out with.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
          placeholder="Order number, e.g. IQF-4K7P2Q"
          className="input sm:flex-1"
          required
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="input sm:flex-1"
          inputMode="tel"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-stone-50 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Track
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-xl bg-hazard-100 px-4 py-3 text-center text-sm font-medium text-hazard">
          {error}
        </p>
      )}

      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <OrderTimeline order={order} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
