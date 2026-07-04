"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FeaturesState {
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  hasWishlist: (productId: string) => boolean;

  // Comparison
  compareIds: string[]; // product IDs
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  isComparing: (productId: string) => boolean;
  isCompareOpen: boolean;
  setCompareOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewedSlugs: string[]; // product slugs
  addViewedProduct: (slug: string) => void;
}

export const useFeatures = create<FeaturesState>()(
  persist(
    (set, get) => ({
      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) =>
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        }),
      hasWishlist: (productId) => get().wishlist.includes(productId),

      // Comparison
      compareIds: [],
      toggleCompare: (productId) =>
        set((state) => {
          const exists = state.compareIds.includes(productId);
          if (exists) {
            return {
              compareIds: state.compareIds.filter((id) => id !== productId),
            };
          }
          if (state.compareIds.length >= 3) {
            return {
              compareIds: [...state.compareIds.slice(1), productId],
              isCompareOpen: true,
            };
          }
          return {
            compareIds: [...state.compareIds, productId],
            isCompareOpen: true,
          };
        }),
      clearCompare: () => set({ compareIds: [] }),
      isComparing: (productId) => get().compareIds.includes(productId),
      isCompareOpen: false,
      setCompareOpen: (open) => set({ isCompareOpen: open }),

      // Recently Viewed
      recentlyViewedSlugs: [],
      addViewedProduct: (slug) =>
        set((state) => {
          const filtered = state.recentlyViewedSlugs.filter((s) => s !== slug);
          return {
            recentlyViewedSlugs: [slug, ...filtered].slice(0, 4),
          };
        }),
    }),
    {
      name: "IQFITS-47-features",
    }
  )
);
