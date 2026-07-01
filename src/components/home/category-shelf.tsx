import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/products";

const categoryImages: Record<string, string> = {
  sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
  apparel: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
  accessories: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80",
};

export function CategoryShelf() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Shop by category
        </h2>
        <Link href="/shop" className="font-mono text-xs uppercase tracking-wide text-ink/50 hover:text-hazard">
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.id}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
          >
            <Image
              src={categoryImages[cat.id]}
              alt={cat.label}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-stone-50">
              <p className="font-mono text-[11px] uppercase tracking-wide text-stone-50/60">
                {cat.blurb}
              </p>
              <h3 className="font-display text-2xl uppercase tracking-tight">{cat.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
