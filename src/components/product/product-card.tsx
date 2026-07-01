"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
  const lowStock = totalStock > 0 && totalStock <= 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNewDrop && (
              <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-50">
                {product.dropNumber}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="rounded-full bg-hazard px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
                Sale
              </span>
            )}
          </div>

          {lowStock && (
            <span className="absolute bottom-3 left-3 rounded-full bg-stone-50/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-hazard">
              Only {totalStock} left
            </span>
          )}
          {totalStock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50/80">
              <span className="font-display text-sm uppercase tracking-wide text-ink/70">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
            {product.brand}
          </p>
          <h3 className="font-display text-base uppercase leading-tight tracking-tight">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-sm">{formatKES(product.price)}</span>
            {product.compareAtPrice && (
              <span className="font-mono text-xs text-ink/40 line-through">
                {formatKES(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
