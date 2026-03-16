import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/shopify/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { Suspense } from "react";

async function ProductGrid() {
  const products = await getFeaturedProducts(8);

  if (products.length === 0) {
    if (!isShopifyConfigured) {
      // Design preview mode — show placeholder cards while Shopify is not yet connected
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    return (
      <p className="text-brand-gray-400 text-sm py-8 text-center">
        No featured products yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-14 md:py-20 bg-brand-gray-50">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-2">
              Top Sellers
            </p>
            <h2 className="section-title">
              Featured<br />
              <span className="section-title-accent">Products.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-orange hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductGrid />
        </Suspense>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="btn-secondary text-sm py-3 px-8">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
