import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iqfit47.co.ke"),
  title: {
    default: "IQFIT47 — Kicks, Sneakers & Designer Fits",
    template: "%s | IQFIT47",
  },
  description:
    "IQFIT47 is Kenya's home for authentic kicks, streetwear and designer clothing. Shop drops, track your order, pay with M-Pesa.",
  keywords: [
    "sneakers Kenya",
    "kicks Nairobi",
    "designer clothing Kenya",
    "streetwear Thika",
    "IQFIT47",
    "buy shoes online Kenya",
  ],
  openGraph: {
    title: "IQFIT47 — Kicks, Sneakers & Designer Fits",
    description:
      "Authentic kicks and designer fits, delivered across Kenya. Pay with M-Pesa, track every order.",
    url: "https://iqfit47.co.ke",
    siteName: "IQFIT47",
    locale: "en_KE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#15151A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-stone-50 font-body text-ink antialiased">
        <Navbar />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
