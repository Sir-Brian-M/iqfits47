"use client";

import Link from "next/link";
import { MapPin, Package, Gift, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-3xl tracking-tight">
              {/* Sneaker icon — side-profile low-top, brand colours */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 32"
                width="42"
                height="28"
                aria-hidden="true"
                className="shrink-0"
              >
                {/* Midsole / sole */}
                <path
                  d="M2 24 Q2 28 6 28 L42 28 Q46 28 46 25 L46 23 L2 23 Z"
                  fill="#ffffff"
                  stroke="#15151A"
                  strokeWidth="1.2"
                />
                {/* Orange accent stripe on sole */}
                <path
                  d="M3 24.5 L45 24.5"
                  stroke="#FF5A1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Upper body — toe box */}
                <path
                  d="M4 23 Q4 12 10 10 L28 8 L36 10 Q42 12 44 18 L44 23 Z"
                  fill="#15151A"
                />
                {/* Toe cap highlight */}
                <path
                  d="M5 22 Q5 14 11 12 L20 10.5"
                  fill="none"
                  stroke="#2B2B33"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Collar / ankle opening */}
                <path
                  d="M36 10 Q44 8 46 14 L46 23 L44 23 L44 18 Q42 12 36 10 Z"
                  fill="#1F1F26"
                />
                {/* Heel tab — orange accent */}
                <rect x="42" y="10" width="3" height="8" rx="1.5" fill="#FF5A1F" />
                {/* Lace area — three dashes */}
                <line x1="14" y1="14" x2="22" y2="13" stroke="#D4FF3D" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="14" y1="17" x2="24" y2="15.5" stroke="#D4FF3D" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="14" y1="20" x2="26" y2="18.5" stroke="#D4FF3D" strokeWidth="1.2" strokeLinecap="round" />
                {/* Swoosh-style accent stripe */}
                <path
                  d="M10 21 Q20 15 34 12"
                  fill="none"
                  stroke="#FF5A1F"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
              <span>IQFITS-<span className="text-hazard">47</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-stone-50/60">
              Authentic kicks, designer apparel and accessories, sourced for
              Nairobi and shipped anywhere in Kenya. Every drop is numbered,
              every order is trackable.
            </p>
            <a
              href="https://www.instagram.com/iqfits.47._/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-50/20 px-4 py-2 text-sm font-medium transition-colors hover:border-hazard hover:text-hazard"
            >
              <InstagramIcon size={16} />
              @iqfits.47._
            </a>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-stone-50/50">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-50/80">
              <li><Link href="/shop?category=sneakers" className="hover:text-hazard">Kicks</Link></li>
              <li><Link href="/shop?category=apparel" className="hover:text-hazard">Apparel</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-hazard">Accessories</Link></li>
              <li><Link href="/shop" className="hover:text-hazard">New Drops</Link></li>
              <li>
                <Link href="/referral" className="flex items-center gap-2 hover:text-hazard">
                  <Gift size={14} />
                  Refer &amp; Earn
                  <span className="ml-0.5 inline-block rounded-full bg-hazard px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-white leading-none">
                    NEW
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-stone-50/50">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-50/80">
              <li>
                <Link href="/track-order" className="flex items-center gap-2 hover:text-hazard">
                  <Package size={14} /> Track your order
                </Link>
              </li>
              <li className="flex items-center gap-2 text-stone-50/60">
                <MapPin size={14} /> Nairobi, Kenya
              </li>
              <li>
                <a
                  href="mailto:support@iqfits47.store"
                  className="flex items-center gap-2 hover:text-hazard"
                >
                  <Mail size={14} /> support@iqfits47.store
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254716672878"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-hazard"
                >
                  <span className="font-mono text-xs text-stone-50/50">Phone/WA:</span> +254 716 672 878
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/HKekz4fQhR8AQudjaP4qeH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-hazard text-stone-50/90"
                >
                  Join WhatsApp Community
                </a>
              </li>
              <li className="pt-1 font-mono text-xs text-stone-50/50">
                Payments secured via M-Pesa STK Push
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-50/10 pt-6 text-xs text-stone-50/40 sm:flex-row">
          <span>© {new Date().getFullYear()} IQFITS-47. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/policies/returns" className="hover:text-stone-50 transition-colors">Returns</Link>
            <Link href="/policies/privacy" className="hover:text-stone-50 transition-colors">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-stone-50 transition-colors">Terms</Link>
            <Link href="/policies/cookies" className="hover:text-stone-50 transition-colors">Cookies</Link>
          </div>
          <span className="font-mono">DROP 015 — RESTOCK FRIDAY</span>
        </div>
      </div>
    </footer>
  );
}
