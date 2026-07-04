"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, GitCompare, ArrowRight, Trash2 } from "lucide-react";
import { useFeatures } from "@/lib/store/features";
import { getDbProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store/cart";

export function CompareDrawer() {
  const { compareIds, toggleCompare, clearCompare, isCompareOpen, setCompareOpen } = useFeatures();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const addCartLine = useCart((s) => s.addLine);

  useEffect(() => {
    async function load() {
      try {
        const list = await getDbProducts();
        setAllProducts(list);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const items = allProducts.filter((p) => compareIds.includes(p.id));

  if (compareIds.length === 0) return null;

  return (
    <AnimatePresence>
      {isCompareOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-stone-50/95 shadow-[0_-8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md"
        >
          {/* Header */}
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between border-b border-ink/5">
            <div className="flex items-center gap-2">
              <GitCompare size={18} className="text-hazard" />
              <span className="font-display text-sm uppercase tracking-wide">
                Product Comparison ({items.length}/3)
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={clearCompare}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/50 transition hover:text-hazard"
              >
                <Trash2 size={12} /> Clear all
              </button>
              <button
                onClick={() => setCompareOpen(false)}
                className="rounded-full p-1.5 hover:bg-ink/5"
                aria-label="Minimize"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Compare Content Grid */}
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-x-auto">
            {items.length === 0 ? (
              <div className="text-center py-6 text-sm text-ink/40">Loading products...</div>
            ) : (
              <div className="min-w-[600px] grid grid-cols-4 gap-6 text-xs sm:text-sm">
                {/* Labels Column */}
                <div className="flex flex-col justify-between py-2 border-r border-ink/5 font-mono text-[10px] uppercase tracking-wider text-ink/40">
                  <div className="h-28" /> {/* offset image area */}
                  <div className="py-2 border-b border-ink/5 font-bold">Brand</div>
                  <div className="py-2 border-b border-ink/5 font-bold">Price</div>
                  <div className="py-2 border-b border-ink/5 font-bold">Rating</div>
                  <div className="py-2 border-b border-ink/5 font-bold">Colorway</div>
                  <div className="py-2 border-b border-ink/5 font-bold">Fit Rating</div>
                  <div className="py-2 font-bold">Sizes Available</div>
                </div>

                {/* Compare items */}
                {Array.from({ length: 3 }).map((_, idx) => {
                  const item = items[idx];
                  if (!item) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink/10 bg-stone-100/50 p-6 text-center text-[11px] text-ink/30"
                      >
                        <GitCompare size={20} className="stroke-[1.5] mb-2 opacity-50" />
                        Add another product to compare
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="relative flex flex-col justify-between">
                      {/* Close button */}
                      <button
                        onClick={() => toggleCompare(item.id)}
                        className="absolute right-0 top-0 rounded-full bg-stone-200/80 p-1 text-ink/70 transition hover:bg-hazard hover:text-white"
                        aria-label="Remove"
                      >
                        <X size={12} />
                      </button>

                      {/* Image & Title */}
                      <Link href={`/product/${item.slug}`} className="group h-28 flex gap-3 items-start border-b border-ink/5 pb-3">
                        <div className="relative aspect-square w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="font-display uppercase leading-tight tracking-tight group-hover:text-hazard transition-colors">
                            {item.name}
                          </h4>
                          <span className="font-mono text-[10px] text-ink/40">{item.brand}</span>
                        </div>
                      </Link>

                      {/* Brand */}
                      <div className="py-2 border-b border-ink/5 font-medium">{item.brand}</div>

                      {/* Price */}
                      <div className="py-2 border-b border-ink/5 font-mono">
                        {formatKES(item.price)}
                        {item.compareAtPrice && (
                          <span className="ml-1 text-[11px] text-hazard line-through">
                            {formatKES(item.compareAtPrice)}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="py-2 border-b border-ink/5">
                        ⭐ {item.rating.toFixed(1)}{" "}
                        <span className="text-[11px] text-ink/40">({item.reviewCount})</span>
                      </div>

                      {/* Colorway */}
                      <div className="py-2 border-b border-ink/5 truncate" title={item.colorway}>
                        {item.colorway}
                      </div>

                      {/* Fit Rating */}
                      <div className="py-2 border-b border-ink/5">
                        <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-ink/75">
                          {item.fitRating || "True to size"}
                        </span>
                      </div>

                      {/* Sizes */}
                      <div className="py-2 flex flex-wrap gap-1">
                        {item.sizes
                          .filter((s) => s.stock > 0)
                          .map((s) => (
                            <span
                              key={s.size}
                              className="rounded border border-ink/10 bg-white px-1 text-[10px] font-mono text-ink/65"
                            >
                              {s.size}
                            </span>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
