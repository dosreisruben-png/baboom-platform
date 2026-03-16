"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/shopify/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { Suspense, useState } from "react";

const TABS = ["Most Popular", "Bestsellers", "On Sale"] as const;
type Tab = typeof TABS[number];

function ProductGridInner({ products }: { products: Awaited<ReturnType<typeof getFeaturedProducts>> }) {
  const [activeTab, setActiveTab] = useState<Tab>("Most Popular");

  if (products.length === 0) {
    return (
      <>
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === tab ? "tab-active" : "tab-inactive"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: isShopifyConfigured ? 0 : 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
          {isShopifyConfigured && (
            <div className="col-span-full text-center py-10 text-brand-gray-400 text-sm">
              No products yet — check back soon.
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === tab ? "tab-active" : "tab-inactive"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            {...(i === 0 ? { badge: "popular" as const } : i === 1 ? { badge: "new" as const } : {})}
          />
        ))}
      </div>
    </>
  );
}

async function ProductGridServer() {
  const products = await getFeaturedProducts(6);
  return <ProductGridInner products={products} />;
}

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-brand-edge">
      <div className="container-page">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-brand-black">
              You May Be <span className="text-brand-orange">Interested</span>
            </h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-1 text-sm font-semibold text-brand-orange hover:underline">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <Suspense
          fallback={
            <>
              <div className="flex gap-2 mb-6">
                {TABS.map((tab) => (
                  <div key={tab} className="px-4 py-2 text-sm font-semibold rounded-full bg-brand-gray-100 text-transparent animate-pulse">
                    {tab}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            </>
          }
        >
          <ProductGridServer />
        </Suspense>

        <div className="mt-8 text-center">
          <Link href="/products" className="btn-outline text-sm px-8 py-3">
            Show more products
          </Link>
        </div>
      </div>
    </section>
  );
}
