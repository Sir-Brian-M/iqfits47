"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addLine: (line) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === line.productId && l.size === line.size
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing
                  ? { ...l, quantity: l.quantity + line.quantity }
                  : l
              ),
              isOpen: true,
            };
          }
          return { lines: [...state.lines, line], isOpen: true };
        }),
      removeLine: (productId, size) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.size === size)
          ),
        })),
      setQuantity: (productId, size, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productId === productId && l.size === size
                ? { ...l, quantity }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "IQFITS-47-cart" }
  )
);
