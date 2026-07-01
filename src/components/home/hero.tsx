"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-stone-50">
      <div className="pointer-events-none absolute inset-0 bg-grain" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8 lg:pb-0 lg:pt-0">
        <div className="relative z-10 lg:col-span-7 lg:py-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-50/20 px-3 py-1 font-mono text-xs uppercase tracking-wide text-stone-50/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Drop 015 · Live now
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[16vw] leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl"
          >
            KICKS
            <br />
            WORTH
            <br />
            <span className="text-hazard">QUEUING</span> FOR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-md text-stone-50/60 sm:text-lg"
          >
            Authentic sneakers, designer apparel and accessories, curated for
            Nairobi and delivered anywhere in Kenya. Pay with M-Pesa. Track
            every step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-hazard px-7 py-3.5 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
            >
              Shop the drop
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/track-order"
              className="font-mono text-sm uppercase tracking-wide text-stone-50/70 underline-offset-4 hover:text-stone-50 hover:underline"
            >
              Track an order
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-auto lg:h-[38rem] lg:rounded-none">
            <Image
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=85"
              alt="Featured sneaker from the current IQFIT47 drop"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
