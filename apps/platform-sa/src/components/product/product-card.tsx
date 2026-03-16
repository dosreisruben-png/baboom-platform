"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Copy, Settings } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { formatMoney, getDiscountPercentage, cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
  badge?: "popular" | "new" | "sale" | "coming-soon";
}

function StarRating({ rating = 4.5, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          className={star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
        />
      ))}
      <span className="text-xs text-brand-gray-400 ml-0.5">({count})</span>
    </div>
  );
}

export function ProductCard({ product, className, badge }: ProductCardProps) {
  const [cartPulse, setCartPulse] = useState(false);
  const [skuCopied, setSkuCopied] = useState(false);

  const firstVariant = product.variants.nodes[0];
  const discount = firstVariant
    ? getDiscountPercentage(firstVariant.price, firstVariant.compareAtPrice)
    : null;

  const sku = product.handle.toUpperCase().slice(0, 10);

  function handleCopySku(e: React.MouseEvent) {
    e.preventDefault();
    void navigator.clipboard.writeText(sku);
    setSkuCopied(true);
    setTimeout(() => setSkuCopied(false), 1500);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 400);
  }

  return (
    <Link href={`/products/${product.handle}`} className={cn("product-card block group", className)}>
      {/* Image container */}
      <div className="relative aspect-square bg-brand-gray-50 overflow-hidden max-h-40 sm:max-h-none">
        {/* Badges — top left stack */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {discount && (
            <span className="badge-discount">-{discount}%</span>
          )}
          {badge === "popular" && <span className="badge-popular">Most Popular</span>}
          {badge === "new" && <span className="badge-new">New</span>}
          {badge === "coming-soon" && <span className="badge-coming-soon">Coming Soon</span>}
          {badge === "sale" && <span className="badge-sale">On Sale</span>}
        </div>

        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#F0F0F0] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
        )}

        {/* Add to cart button — bottom right */}
        <button
          onClick={handleAddToCart}
          disabled={!product.availableForSale}
          className={cn(
            "absolute bottom-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg hover:bg-brand-orange-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed z-10",
            cartPulse && "animate-pulse-once"
          )}
          aria-label="Add to cart"
        >
          <ShoppingCart size={14} />
        </button>

        {/* Settings / configure icon */}
        <button className="absolute bottom-2 right-12 w-9 h-9 rounded-full bg-white border border-brand-edge text-brand-gray-600 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-all opacity-0 group-hover:opacity-100 z-10">
          <Settings size={14} />
        </button>
      </div>

      {/* Card body */}
      <div className="p-3">
        {/* Product name */}
        <h3 className="text-sm font-semibold text-brand-black line-clamp-2 leading-snug mb-1 group-hover:text-brand-orange transition-colors">
          {product.title}
        </h3>

        {/* SKU */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-brand-gray-400">SKU: {sku}</span>
          <button
            onClick={handleCopySku}
            className="text-brand-gray-400 hover:text-brand-orange transition-colors"
            aria-label="Copy SKU"
          >
            <Copy size={11} />
          </button>
          {skuCopied && <span className="text-xs text-brand-green font-medium">Copied!</span>}
        </div>

        {/* Rating */}
        <StarRating />

        {/* Stock status */}
        <div className="mt-1.5 mb-2">
          {product.availableForSale ? (
            <span className="in-stock">● In stock</span>
          ) : (
            <span className="on-backorder">● On backorder</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-black text-brand-black">
            {formatMoney(product.priceRange.minVariantPrice)}
          </span>
          {firstVariant?.compareAtPrice && (
            <span className="text-xs text-brand-gray-400 line-through">
              {formatMoney(firstVariant.compareAtPrice)}
            </span>
          )}
          {discount && (
            <span className="text-xs bg-brand-orange/10 text-brand-orange font-bold px-1.5 py-0.5 rounded-sm">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-brand-edge bg-white animate-pulse">
      <div className="aspect-square bg-brand-gray-100" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-brand-gray-100 rounded w-3/4" />
        <div className="h-3 bg-brand-gray-100 rounded w-1/2" />
        <div className="h-3 bg-brand-gray-100 rounded w-1/3" />
        <div className="h-4 bg-brand-gray-100 rounded w-2/3 mt-2" />
      </div>
    </div>
  );
}
