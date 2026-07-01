# IQFIT47

Kicks, streetwear and designer apparel e-store for the Kenyan market. Next.js
14 (App Router) + TypeScript + Tailwind + Framer Motion, M-Pesa checkout via
Lipia Online, order tracking backed by Supabase.

## What's built

- **Home** — animated hero, new drops shelf, category shelf, trust strip, Instagram CTA
- **Shop** (`/shop`) — full catalogue with category filter and sort, responsive grid
- **Product pages** (`/product/[slug]`) — gallery, size selector, stock-aware add to cart, related products
- **Cart** — slide-out drawer (any page) + dedicated `/cart` page, persisted in local storage
- **Checkout** (`/checkout`) — delivery form → M-Pesa STK push → live payment status polling → confirmation with order ticket
- **Order tracking** (`/track-order`) — look up any order by order number + phone, no account needed
- Fully responsive, animated with Framer Motion, reduced-motion respected

The product catalogue currently lives in `src/lib/data/products.ts` as mock
data with stock-photo images so the whole site works out of the box. Swap
this for real product photography and a Supabase `products` table whenever
you're ready — happy to wire that up next.

## 1. Install

```bash
npm install
```

## 2. Set up Supabase (orders + tracking)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run everything in `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

   All three are under **Project Settings → API**.

## 3. Set up Lipia Online (M-Pesa payments)

1. Log in at [lipia-online.vercel.app](https://lipia-online.vercel.app/) and generate an API key from your app's **Security** tab.
2. Add it to `.env.local` as `LIPIA_API_KEY`.
3. All Lipia calls live in **one file**: `src/lib/lipia.ts`. I built it
   against the documented STK push + status endpoints, but I couldn't fully
   confirm the exact request/response field names from the docs site (it's
   client-rendered, so I could only reach the page titles from here). Once
   you've got a real API key, test a checkout and check the browser network
   tab / server logs — if the field names differ from what's in `lipia.ts`,
   that's the only file that needs adjusting.
4. If the Lipia dashboard has a webhook / callback URL setting, point it at
   `/api/payments/callback` for instant payment confirmation instead of
   polling. It works either way — checkout also polls `/api/payments/status`
   every 3 seconds as a fallback.

## 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. Deploy

This deploys to Vercel the same way as your other projects:

```bash
git init && git add -A && git commit -m "Initial IQFIT47 build"
# push to a new GitHub repo, then import it in Vercel
```

Add the same environment variables from `.env.local` to the Vercel project
settings before your first deploy.

## Project structure

```
src/
  app/                  routes (App Router)
    api/checkout/        creates an order + triggers STK push
    api/payments/status/ polled by the checkout page after STK push
    api/payments/callback/ optional webhook receiver from Lipia
    api/orders/track/    order number + phone lookup
  components/
    layout/               navbar, footer
    home/                 hero, category shelf, new drops, trust strip
    product/               product card, gallery, size selector, filters
    cart/                  slide-out cart drawer
    order/                 shared order timeline / ticket component
  lib/
    data/products.ts       mock product catalogue — replace with real data
    lipia.ts               all Lipia Online API calls, isolated
    orders.ts              Supabase order read/writes
    store/cart.ts           cart state (zustand, persisted)
    types.ts                shared TypeScript types
supabase/schema.sql       run this in the Supabase SQL editor
```

## Notes for next steps

- **Product images**: currently Unsplash stock photos. Swap in real shoot
  photography by editing `src/lib/data/products.ts`, or move products into
  Supabase and build a small admin page for managing stock/prices.
- **Delivery fee logic** is a simple flat-rate rule in `api/checkout/route.ts`
  (free over KES 15,000, KES 300 for Nairobi/Kiambu, KES 500 elsewhere) —
  easy to swap for a real courier rate table later.
- **Admin/order management**: right now, status changes (processing →
  dispatched → delivered) need a manual Supabase update or a quick script.
  A proper admin dashboard is a natural next build if you want staff to
  update orders without touching the database directly.
