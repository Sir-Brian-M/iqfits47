import type { MetadataRoute } from "next";
import { getDbProducts } from "@/lib/data/products";

const SITE_URL = "https://iqfits47.store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getDbProducts();

  // Product URLs — include image sitemap extension for Google Image Search
  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p.category === "sneakers" ? 0.9 : 0.8,
  }));

  // Brand filter pages — helps Google index faceted brand searches
  const brandUrls: MetadataRoute.Sitemap = [
    "nike",
    "adidas",
    "new-balance",
    "jordan",
    "yeezy",
    "puma",
    "asics",
    "converse",
    "vans",
    "reebok",
    "salomon",
  ].map((brand) => ({
    url: `${SITE_URL}/shop?brand=${brand}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    // ── Core pages ───────────────────────────────────────────────
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    // ── Category pages ───────────────────────────────────────────
    {
      url: `${SITE_URL}/shop?category=sneakers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/shop?category=apparel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/shop?category=accessories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    // ── Utility pages ────────────────────────────────────────────
    {
      url: `${SITE_URL}/wishlist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/track-order`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/policies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    // ── Product pages ────────────────────────────────────────────
    ...productUrls,
    // ── Brand filter pages ───────────────────────────────────────
    ...brandUrls,
  ];
}
