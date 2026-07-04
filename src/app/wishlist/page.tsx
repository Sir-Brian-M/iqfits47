"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDbProducts } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { useFeatures } from "@/lib/store/features";
import { ProductCard } from "@/components/product/product-card";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { wishlist } = useFeatures();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const list = await getDbProducts();
        setProducts(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-hazard">Your Collection</p>
        <h1 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">
          Wishlist
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-hazard border-t-transparent" />
        </div>
      ) : wishlistProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center border border-dashed border-ink/10 py-20 text-center"
        >
          <div className="rounded-full bg-stone-100 p-4 text-ink/40">
            <Heart size={32} className="stroke-[1.5]" />
          </div>
          <h2 className="mt-4 font-display text-xl uppercase">Your wishlist is empty</h2>
          <p className="mt-2 max-w-xs text-sm text-ink/50">
            Save items here so you don't lose track of new drops or size restocks.
          </p>
          <Link
            href="/shop"
            className="mt-6 flex items-center gap-2 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-stone-50 transition hover:bg-hazard"
          >
            <ShoppingBag size={14} /> Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
