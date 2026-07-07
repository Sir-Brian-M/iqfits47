"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Package, Heart } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useFeatures } from "@/lib/store/features";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

const links = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=sneakers", label: "Kicks" },
  { href: "/shop?category=apparel", label: "Apparel" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const openCart = useCart((s) => s.open);
  const count = useCart((s) => s.count());
  const wishlistCount = useFeatures((s) => s.wishlist.length);

  const [announcements, setAnnouncements] = useState<string[]>([
    "FREE DELIVERY IN NAIROBI & KIAMBU ON ORDERS OVER KES 15,000",
    "PAY SECURELY WITH M-PESA",
    "NEW DROPS EVERY FRIDAY",
  ]);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("message")
          .eq("active", true)
          .order("priority", { ascending: false });

        if (data && data.length > 0) {
          setAnnouncements(data.map((a: any) => a.message));
        }
      } catch {
        // Fallback to defaults
      }
    }
    loadAnnouncements();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-stone-50/90 backdrop-blur">
      {/* running ticker */}
      <div className="overflow-hidden border-b border-ink/10 bg-ink text-stone-50">
        <div className="flex animate-marquee whitespace-nowrap py-1.5 text-[11px] font-medium tracking-wide">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 px-4">
              {announcements.map((ann, idx) => (
                <span key={`${idx}-${ann}`} className="flex items-center gap-8">
                  <span>{ann}</span>
                  <span className="text-hazard">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-x-0 inset-y-0 z-30 flex items-center bg-stone-50 px-4 sm:px-6 lg:px-8"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchVal.trim()) {
                    router.push(`/shop?q=${encodeURIComponent(searchVal.trim())}`);
                    setSearchOpen(false);
                    setSearchVal("");
                  }
                }}
                className="flex w-full items-center gap-3"
              >
                <Search size={20} className="text-ink/50" />
                <input
                  type="text"
                  placeholder="Search kicks, apparel, accessories..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="flex-1 bg-transparent py-2 font-mono text-sm tracking-wide focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-2 hover:bg-ink/5"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="rounded-full p-2 hover:bg-ink/5 lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="flex items-center gap-2 font-display text-2xl tracking-tight">
          {/* Sneaker logo — detailed side-profile low-top illustration, brand colours */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 44"
            width="48"
            height="33"
            aria-label="IQFITS-47 sneaker logo"
            className="shrink-0"
          >
            {/* ── Outsole (thick rubber base) ─────────────────── */}
            <path
              d="M3 32 Q2 38 7 39 L56 39 Q61 39 62 35 L62 31 Z"
              fill="#F5F5F0"
              stroke="#15151A"
              strokeWidth="1"
            />
            {/* Orange midsole stripe */}
            <path d="M3.5 33 L61.5 33" stroke="#FF5A1F" strokeWidth="2.2" strokeLinecap="round" />
            {/* Heel curvature detail */}
            <path d="M56 39 Q62 39 62 34" fill="none" stroke="#E0DDD5" strokeWidth="1" />

            {/* ── Main upper body ─────────────────────────────── */}
            <path
              d="M5 31 Q5 16 13 13 L35 10 L48 13 Q56 16 59 24 L59 31 Z"
              fill="#15151A"
            />

            {/* ── Toe box panel (lighter shade, subtle depth) ── */}
            <path
              d="M5 31 Q5 17 13 14 L24 11.5 Q14 15 13 28 Z"
              fill="#1E1E24"
            />
            {/* Toe cap stitching line */}
            <path
              d="M7 30 Q7 19 14 16 L21 13.5"
              fill="none"
              stroke="#2D2D36"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="2 1.5"
            />

            {/* ── Quarter / side panel ────────────────────────── */}
            <path
              d="M24 11.5 L48 13 Q56 16 59 24 L59 31 L13 31 Q13 18 24 11.5 Z"
              fill="#1A1A21"
            />

            {/* ── Collar (ankle opening) ──────────────────────── */}
            <path
              d="M48 13 Q58 11 61 18 L61 31 L59 31 L59 24 Q56 16 48 13 Z"
              fill="#222229"
            />
            {/* Collar padded edge */}
            <path
              d="M48 13 Q58 10 61 18"
              fill="none"
              stroke="#2E2E38"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* ── Heel tab — orange ───────────────────────────── */}
            <rect x="57" y="12" width="4" height="12" rx="2" fill="#FF5A1F" />
            {/* Heel tab notch */}
            <rect x="58.5" y="13.5" width="1" height="3" rx="0.5" fill="#CC4010" />

            {/* ── Lace cage / eyelets ─────────────────────────── */}
            <path
              d="M18 20 L34 17.5"
              stroke="#2B2B35"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Laces — lime/hazard */}
            <line x1="18" y1="20" x2="34" y2="17.5" stroke="#D4FF3D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            <line x1="18" y1="23" x2="36" y2="20.5" stroke="#D4FF3D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            <line x1="18" y1="26" x2="38" y2="23.5" stroke="#D4FF3D" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            {/* Lace eyelet dots */}
            <circle cx="18" cy="20" r="1.2" fill="#333340" />
            <circle cx="18" cy="23" r="1.2" fill="#333340" />
            <circle cx="18" cy="26" r="1.2" fill="#333340" />

            {/* ── Swoosh-style brand accent stripe ────────────── */}
            <path
              d="M13 29 Q28 20 46 15.5"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* ── Perforations on toe box (Air Force 1 style) ── */}
            <circle cx="9" cy="24" r="0.7" fill="#2B2B33" />
            <circle cx="9" cy="27" r="0.7" fill="#2B2B33" />
            <circle cx="11" cy="22" r="0.7" fill="#2B2B33" />
          </svg>
          IQFITS-<span className="text-hazard">47</span>
        </Link>

        <nav className="hidden items-center gap-8 font-display text-sm uppercase tracking-wide lg:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition-colors hover:text-hazard">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 hover:bg-ink/5"
            aria-label="Search products"
          >
            <Search size={20} />
          </button>
          <Link
            href="/track-order"
            className="hidden rounded-full p-2 hover:bg-ink/5 sm:block"
            aria-label="Track order"
          >
            <Package size={20} />
          </Link>
          <Link
            href="/wishlist"
            className="relative rounded-full p-2 hover:bg-ink/5"
            aria-label="Wishlist"
          >
            <Heart size={20} className={cn(wishlistCount > 0 && "fill-hazard text-hazard")} />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-hazard text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            className="relative rounded-full p-2 hover:bg-ink/5"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-hazard text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs bg-stone-50 p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">MENU</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {links.map((l, i) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "border-b border-ink/10 py-4 font-display text-2xl uppercase tracking-tight"
                    )}
                  >
                    <span className="mr-3 font-mono text-xs text-ink/40">0{i + 1}</span>
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-ink/60"
                >
                  <Heart size={16} /> Wishlist
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-ink/60"
                >
                  <Package size={16} /> Track an order
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
