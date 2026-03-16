import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { formatMoney, getDiscountPercentage, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const firstVariant = product.variants.nodes[0];
  const compareAtPrice = firstVariant?.compareAtPrice ?? null;
  const discount = firstVariant
    ? getDiscountPercentage(firstVariant.price, compareAtPrice)
    : null;

  return (
    <article className={cn("product-card", className)}>
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-square bg-brand-gray-50 overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-gray-200">
            <span className="font-condensed font-black text-4xl text-brand-gray-200 opacity-30">
              BABOOM
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.availableForSale && (
            <span className="badge-b2b">Out of Stock</span>
          )}
          {discount && <span className="badge-sale">-{discount}%</span>}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4">
        <p className="text-xs text-brand-gray-400 uppercase tracking-wide mb-1 truncate">
          {product.vendor}
        </p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-bold text-sm text-brand-black leading-snug line-clamp-2 mb-3 hover:text-brand-orange transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-condensed font-black text-lg text-brand-black">
            {formatMoney(product.priceRange.minVariantPrice)}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-brand-gray-400 line-through">
              {formatMoney(compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white text-xs font-bold py-2.5 uppercase tracking-wide hover:bg-brand-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!product.availableForSale}
        >
          <ShoppingCart size={14} />
          {product.availableForSale ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card animate-pulse">
      <div className="aspect-square bg-brand-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-brand-gray-100 rounded w-1/3" />
        <div className="h-4 bg-brand-gray-100 rounded w-full" />
        <div className="h-4 bg-brand-gray-100 rounded w-2/3" />
        <div className="h-6 bg-brand-gray-100 rounded w-1/2 mt-2" />
        <div className="h-9 bg-brand-gray-100 rounded" />
      </div>
    </div>
  );
}
