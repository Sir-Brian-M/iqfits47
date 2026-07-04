"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { getDbProducts } from "@/lib/data/products";
import { formatKES } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";

export function OutfitBuilder({ currentProduct }: { currentProduct: Product }) {
  const [outfitItems, setOutfitItems] = useState<Product[]>([]);
  const addLine = useCart((s) => s.addLine);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const all = await getDbProducts();
        
        // Find 2 matching items of different categories
        // E.g., if current is sneaker, find 1 apparel and 1 accessory
        const matches = all.filter((p) => {
          if (p.id === currentProduct.id) return false;
          // Match by brand or tags or color
          const brandMatch = p.brand.toLowerCase() === currentProduct.brand.toLowerCase();
          const tagMatch = p.tags.some((t) => currentProduct.tags.includes(t));
          return (brandMatch || tagMatch) && p.category !== currentProduct.category;
        });

        // Group by category to ensure variety
        const variety: Product[] = [];
        const categoriesSeen = new Set<string>();
        
        for (const item of matches) {
          if (!categoriesSeen.has(item.category) && variety.length < 2) {
            variety.push(item);
            categoriesSeen.add(item.category);
          }
        }

        // Fallback if no matching items
        if (variety.length < 2) {
          const fallbacks = all.filter(
            (p) => p.id !== currentProduct.id && p.category !== currentProduct.category
          );
          for (const item of fallbacks) {
            if (!categoriesSeen.has(item.category) && variety.length < 2) {
              variety.push(item);
              categoriesSeen.add(item.category);
            }
          }
        }

        setOutfitItems(variety);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [currentProduct]);

  if (outfitItems.length === 0) return null;

  const handleAddOutfitItem = (item: Product) => {
    // Select first available size
    const availableSize = item.sizes.find((s) => s.stock > 0)?.size;
    if (!availableSize) {
      toast.error("Item is out of stock.");
      return;
    }

    addLine({
      productId: item.id,
      slug: item.slug,
      name: item.name,
      brand: item.brand,
      image: item.images[0],
      price: item.price,
      size: availableSize,
      quantity: 1,
    });

    setAddedIds((prev) => [...prev, item.id]);
    toast.success(`${item.name} (${availableSize}) added to bag.`);
  };

  return (
    <div className="mt-12 rounded-3xl border border-ink/10 bg-stone-100/40 p-6 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-hazard">Get The Fit</p>
      <h3 className="font-display text-xl uppercase tracking-tight mt-1">Shop The Look</h3>
      <p className="text-xs text-ink/50 mt-1">Pair this item with these handpicked coordinates.</p>

      <div className="mt-6 space-y-4">
        {outfitItems.map((item) => {
          const hasAdded = addedIds.includes(item.id);
          const firstAvailableSize = item.sizes.find((s) => s.stock > 0)?.size;

          return (
            <div key={item.id} className="flex items-center justify-between gap-4 border-b border-ink/5 pb-4 last:border-0 last:pb-0">
              <Link href={`/product/${item.slug}`} className="flex items-center gap-4 group">
                <div className="relative aspect-square w-16 h-16 overflow-hidden rounded-xl bg-stone-100 shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">{item.brand}</span>
                  <h4 className="font-display text-sm uppercase leading-tight tracking-tight group-hover:text-hazard transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-mono text-xs text-ink/70 mt-0.5">{formatKES(item.price)}</p>
                </div>
              </Link>

              <button
                disabled={!firstAvailableSize}
                onClick={() => handleAddOutfitItem(item)}
                className={`rounded-full p-2.5 transition-all ${
                  hasAdded
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-ink text-stone-50 hover:bg-hazard disabled:bg-ink/10 disabled:text-ink/30"
                }`}
                aria-label="Add to bag"
              >
                {hasAdded ? <Check size={16} /> : <Plus size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
