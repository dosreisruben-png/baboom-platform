import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Money } from "./shopify/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(money: Money): string {
  const amount = parseFloat(money.amount);
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPrice(amount: string, currencyCode = "ZAR"): string {
  return formatMoney({ amount, currencyCode });
}

export function getDiscountPercentage(
  price: Money,
  compareAtPrice: Money | null
): number | null {
  if (!compareAtPrice) return null;
  const original = parseFloat(compareAtPrice.amount);
  const current = parseFloat(price.amount);
  if (original <= current) return null;
  return Math.round(((original - current) / original) * 100);
}
