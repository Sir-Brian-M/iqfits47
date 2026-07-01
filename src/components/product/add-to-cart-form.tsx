"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const addLine = useCart((s) => s.addLine);

  const selectedVariant = product.sizes.find((s) => s.size === size);
  const maxQty = selectedVariant?.stock ?? 1;

  function handleAdd() {
    if (!size) {
      toast.error("Pick a size first.");
      return;
    }
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      price: product.price,
      size,
      quantity: qty,
    });
    toast.success(`${product.name} (${size}) added to your bag.`);
    setQty(1);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display text-sm uppercase tracking-wide">Select size</span>
        <button className="font-mono text-xs text-ink/40 underline underline-offset-4">
          Size guide
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {product.sizes.map((s) => (
          <button
            key={s.size}
            disabled={s.stock === 0}
            onClick={() => {
              setSize(s.size);
              setQty(1);
            }}
            className={cn(
              "rounded-lg border py-2.5 font-mono text-sm transition-colors",
              s.stock === 0
                ? "cursor-not-allowed border-ink/10 text-ink/20 line-through"
                : size === s.size
                ? "border-ink bg-ink text-stone-50"
                : "border-ink/15 hover:border-ink/40"
            )}
          >
            {s.size}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center font-mono text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-hazard py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
        >
          <ShoppingBag size={16} />
          Add to bag
        </motion.button>
      </div>
    </div>
  );
}
