"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { KENYA_COUNTY_PATHS } from "./kenya-map-paths";

const FEATURED_SNEAKERS = [
  {
    name: "Airwave 97",
    brand: "Nike",
    price: "KES 8,500",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&q=80",
    slug: "airwave-97-triple-white",
    color: "from-lime/10 to-transparent",
  },
  {
    name: "Cortez Flux",
    brand: "Nike",
    price: "KES 7,200",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
    slug: "cortez-flux-black-red",
    color: "from-hazard/10 to-transparent",
  },
  {
    name: "Streetform OG",
    brand: "Adidas",
    price: "KES 9,800",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80",
    slug: "streetform-og-cream",
    color: "from-cobalt/10 to-transparent",
  },
  {
    name: "Flux Runner",
    brand: "Adidas",
    price: "KES 8,900",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1000&q=80",
    slug: "flux-runner-cobalt",
    color: "from-hazard/15 to-transparent",
  }
];

export function KenyaMapSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FEATURED_SNEAKERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = FEATURED_SNEAKERS[index];

  return (
    <div className="relative w-full max-w-[430px] mx-auto aspect-[458/580] flex flex-col justify-between">
      {/* Decorative Glow */}
      <div className="absolute inset-0 -z-10 bg-hazard/5 blur-[80px] rounded-full scale-90 transition-colors duration-1000" />
      
      {/* Interactive Map Visual */}
      <div className="relative flex-1 w-full h-[88%] filter drop-shadow-[0_16px_30px_rgba(21,21,26,0.5)] hover:drop-shadow-[0_20px_40px_rgba(255,90,31,0.25)] transition-all duration-500 group">
        <svg
          viewBox="0 0 458 580"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="kenya-map-clip">
              {KENYA_COUNTY_PATHS.map((p) => (
                <path key={p.id} d={p.d} />
              ))}
            </clipPath>
          </defs>

          {/* Clipped image area */}
          <g clipPath="url(#kenya-map-clip)">
            {/* Background solid fill to prevent white screen flashes */}
            <rect width="458" height="580" fill="#15151A" />

            <foreignObject x="0" y="0" width="458" height="580">
              <div className="w-full h-full relative overflow-hidden bg-ink">
                {/* Background color gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${current.color} transition-all duration-1000 z-10 mix-blend-color-dodge`} />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.name}
                    initial={{ opacity: 0, scale: 1.12, rotate: -1.5 }}
                    animate={{ opacity: 1, scale: 1.01, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </AnimatePresence>
                {/* Vignette shadow to give the map depth */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(circle, transparent 45%, rgba(21, 21, 26, 0.5) 100%)" }} />
              </div>
            </foreignObject>
          </g>

          {/* Grid lines (county borders) layered on top of the image to make it look like a map */}
          <g
            fill="none"
            stroke="rgba(244, 242, 237, 0.2)"
            strokeWidth="0.75"
            className="pointer-events-none transition-all duration-500 group-hover:stroke-stone-50/30"
          >
            {KENYA_COUNTY_PATHS.map((p) => (
              <path key={`border-${p.id}`} d={p.d} />
            ))}
          </g>

          {/* Accent outer glow outline */}
          <g
            fill="none"
            stroke="rgba(255, 90, 31, 0.55)"
            strokeWidth="1.5"
            className="pointer-events-none transition-all duration-500 group-hover:stroke-hazard"
          >
            {KENYA_COUNTY_PATHS.map((p) => (
              // Re-draw outer edges only, or draw all with thin glowing lines
              <path key={`glow-${p.id}`} d={p.d} strokeDasharray="3 20" className="animate-marquee" style={{ animationDuration: '40s' }} />
            ))}
          </g>
        </svg>
      </div>

      {/* Floating Info Overlay & Navigation */}
      <div className="mt-4 px-2 flex items-center justify-between bg-stone-100/80 backdrop-blur-md rounded-2xl p-4 border border-ink/5">
        <div>
          <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-hazard font-semibold mb-0.5">
            <Sparkles size={10} /> Nairobi Drop 015
          </span>
          <h4 className="font-display text-lg uppercase tracking-tight text-ink">
            {current.name}
          </h4>
          <p className="font-mono text-xs text-ink/50">
            {current.brand} · <span className="text-ink font-medium">{current.price}</span>
          </p>
        </div>
        
        <Link
          href={`/product/${current.slug}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-stone-50 hover:bg-hazard hover:scale-105 transition-all duration-300"
          aria-label={`View ${current.name}`}
        >
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {FEATURED_SNEAKERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === i ? "w-6 bg-hazard" : "w-1.5 bg-ink/15 hover:bg-ink/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
