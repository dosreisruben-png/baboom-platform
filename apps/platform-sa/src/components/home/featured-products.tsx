"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/shopify/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { Suspense, useState } from "react";
import type { Product } from "@/lib/shopify/types";

const TABS = ["Most Popular", "Bestsellers", "On Sale"] as const;
type Tab = typeof TABS[number];

interface ProductGridInnerProps {
  popular: Product[];
  bestsellers: Product[];
  onSale: Product[];
}

function ProductGridInner({ popular, bestsellers, onSale }: ProductGridInnerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Most Popular");

  const allEmpty = popular.length === 0 && bestsellers.length === 0 && onSale.length === 0;

  const products =
    activeTab === "Most Popular" ? popular :
    activeTab === "Bestsellers" ? bestsellers :
    onSale;

  if (allEmpty) {
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
            {...(activeTab === "Most Popular" && i === 0 ? { badge: "popular" as const } : {})}
            {...(activeTab === "Most Popular" && i === 1 ? { badge: "new" as const } : {})}
            {...(activeTab === "On Sale" ? { badge: "sale" as const } : {})}
          />
        ))}
      </div>
    </>
  );
}

async function ProductGridServer() {
  const [popularRes, bestsellersRes, onSaleRes] = await Promise.all([
    getProducts({ first: 6, query: "tag:featured", sortKey: "BEST_SELLING" }),
    getProducts({ first: 6, query: "tag:bestseller", sortKey: "BEST_SELLING" }),
    getProducts({ first: 6, query: "tag:sale", sortKey: "BEST_SELLING" }),
  ]);

  // Fallback: if a tab returns 0 products, use a slice of all products
  const popular = popularRes.products;
  const bestsellers = bestsellersRes.products.length > 0
    ? bestsellersRes.products
    : popular;
  const onSale = onSaleRes.products.length > 0
    ? onSaleRes.products
    : popular.slice(0, 6).reverse();

  return <ProductGridInner popular={popular} bestsellers={bestsellers} onSale={onSale} />;
}

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-brand-edge">
      <div className="container-page">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-brand-black text-center md:text-left">
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
