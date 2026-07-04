"use client";

import { useEffect, useState } from "react";
import { getDbProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { useFeatures } from "@/lib/store/features";
import { ProductCard } from "./product-card";

export function RecentlyViewedShelf({ excludeId }: { excludeId?: string }) {
  const { recentlyViewedSlugs } = useFeatures();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const list = await getDbProducts();
        setProducts(list);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const viewed = products.filter(
    (p) => recentlyViewedSlugs.includes(p.slug) && p.id !== excludeId
  );

  if (viewed.length === 0) return null;

  return (
    <section className="border-t border-ink/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-hazard">History</p>
            <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
              Recently Viewed
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
          {viewed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
