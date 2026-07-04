"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Ruler, Bell } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import { SizeFinder } from "./size-finder";
import { NotificationModal } from "./notification-modal";

export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeFinderOpen, setSizeFinderOpen] = useState(false);
  const [restockAlertOpen, setRestockAlertOpen] = useState(false);
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const addLine = useCart((s) => s.addLine);

  const selectedVariant = product.sizes.find((s) => s.size === size);
  const maxQty = selectedVariant?.stock ?? 1;
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false;

  function handleAdd() {
    if (!size) {
      toast.error("Pick a size first.");
      return;
    }
    if (isOutOfStock) {
      setRestockAlertOpen(true);
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
        <div className="flex gap-4">
          <button
            onClick={() => setPriceAlertOpen(true)}
            className="flex items-center gap-1.5 font-mono text-xs text-ink/40 hover:text-hazard transition-colors underline underline-offset-4"
          >
            <Bell size={12} /> Price alert
          </button>
          <button
            onClick={() => setSizeFinderOpen(true)}
            className="flex items-center gap-1.5 font-mono text-xs text-ink/40 hover:text-hazard transition-colors underline underline-offset-4"
          >
            <Ruler size={12} /> Size finder
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {product.sizes.map((s) => (
          <button
            key={s.size}
            onClick={() => {
              setSize(s.size);
              setQty(1);
            }}
            className={cn(
              "relative rounded-lg border py-2.5 font-mono text-sm transition-all overflow-hidden",
              s.stock === 0
                ? size === s.size
                  ? "border-hazard bg-hazard/10 text-hazard"
                  : "border-ink/10 text-ink/30"
                : size === s.size
                ? "border-ink bg-ink text-stone-50"
                : "border-ink/15 hover:border-ink/40"
            )}
          >
            {s.size}
            {s.stock === 0 && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                <span className="h-0.5 w-full bg-ink rotate-45" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {!isOutOfStock && (
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
        )}

        {isOutOfStock ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setRestockAlertOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
          >
            <Bell size={16} />
            Notify when restocked
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-hazard py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
          >
            <ShoppingBag size={16} />
            Add to bag
          </motion.button>
        )}
      </div>

      {/* Modals */}
      <SizeFinder
        isOpen={sizeFinderOpen}
        onClose={() => setSizeFinderOpen(false)}
        productBrand={product.brand}
        productName={product.name}
      />

      <NotificationModal
        isOpen={priceAlertOpen}
        onClose={() => setPriceAlertOpen(false)}
        productId={product.id}
        productName={product.name}
        type="price-drop"
        currentPrice={product.price}
      />

      {size && (
        <NotificationModal
          isOpen={restockAlertOpen}
          onClose={() => setRestockAlertOpen(false)}
          productId={product.id}
          productName={product.name}
          selectedSize={size}
          type="back-in-stock"
          currentPrice={product.price}
        />
      )}
    </div>
  );
}

