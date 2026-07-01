import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKES(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Normalizes a Kenyan Safaricom number to the 2547XXXXXXXX / 2541XXXXXXXX
 * format required by the Lipia Online STK push endpoint.
 * Accepts 07..., 01..., 254..., +254...
 */
export function normalizeMpesaPhone(raw: string): string | null {
  const digits = raw.replace(/\s|-/g, "").replace(/^\+/, "");
  let normalized: string | null = null;

  if (/^0(7|1)\d{8}$/.test(digits)) {
    normalized = `254${digits.slice(1)}`;
  } else if (/^254(7|1)\d{8}$/.test(digits)) {
    normalized = digits;
  } else if (/^(7|1)\d{8}$/.test(digits)) {
    normalized = `254${digits}`;
  }

  return normalized;
}

export function isValidMpesaPhone(raw: string) {
  return normalizeMpesaPhone(raw) !== null;
}

/** Generates a human-friendly order number, e.g. IQF-4K7P2Q */
export function generateOrderNumber() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `IQF-${code}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
