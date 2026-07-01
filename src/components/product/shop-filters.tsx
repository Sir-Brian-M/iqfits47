"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "New Drops First" },
];

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "featured";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }

  const pills = (
    <>
      <button
        onClick={() => updateParam("category", "all")}
        className={cn(
          "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
          activeCategory === "all"
            ? "border-ink bg-ink text-stone-50"
            : "border-ink/15 text-ink/60 hover:border-ink/40"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => updateParam("category", cat.id)}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
            activeCategory === cat.id
              ? "border-ink bg-ink text-stone-50"
              : "border-ink/15 text-ink/60 hover:border-ink/40"
          )}
        >
          {cat.label}
        </button>
      ))}
    </>
  );

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div className="hidden flex-wrap gap-2 sm:flex">{pills}</div>

      <button
        className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-xs uppercase tracking-wide sm:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <SlidersHorizontal size={14} /> Filter
      </button>

      <select
        value={activeSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-full border border-ink/15 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wide"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/40 sm:hidden">
          <div className="w-full rounded-t-3xl bg-stone-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg uppercase">Filter</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">{pills}</div>
          </div>
        </div>
      )}
    </div>
  );
}
