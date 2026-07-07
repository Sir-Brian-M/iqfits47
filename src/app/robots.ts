import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Googlebot — full crawl, images included ──────────────
      {
        userAgent: "Googlebot",
        allow: ["/", "/shop", "/product/", "/policies", "/track-order", "/wishlist"],
        disallow: ["/admin/", "/api/", "/checkout/", "/referral/"],
      },
      // ── Googlebot-Image — allow all product + OG images ─────
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
        disallow: ["/admin/", "/api/"],
      },
      // ── Google Shopping crawler ──────────────────────────────
      {
        userAgent: "Googlebot-News",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/"],
      },
      // ── Bingbot ─────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: ["/", "/shop", "/product/"],
        disallow: ["/admin/", "/api/", "/checkout/", "/referral/"],
        crawlDelay: 2,
      },
      // ── All other bots — general rules ───────────────────────
      {
        userAgent: "*",
        allow: ["/", "/shop", "/product/", "/policies", "/track-order", "/wishlist"],
        disallow: [
          "/admin/",
          "/api/",
          "/checkout/",
          "/referral/",
          "/*?ref=",
          "/*?utm_",
        ],
        crawlDelay: 5,
      },
    ],
    sitemap: "https://iqfits47.store/sitemap.xml",
    host: "https://iqfits47.store",
  };
}
