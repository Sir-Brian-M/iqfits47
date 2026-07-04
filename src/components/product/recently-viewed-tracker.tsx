"use client";

import { useEffect } from "react";
import { useFeatures } from "@/lib/store/features";

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const addViewedProduct = useFeatures((s) => s.addViewedProduct);

  useEffect(() => {
    if (slug) {
      addViewedProduct(slug);
    }
  }, [slug, addViewedProduct]);

  return null;
}
