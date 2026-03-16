import type { Metadata } from "next";
import { getProducts } from "@/lib/shopify/queries";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterDrawer } from "@/components/products/filter-drawer";
import { SortSelect } from "./sort-select";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse 19,000+ industrial and hardware products. Filter by category, brand, and price.",
};

const CATEGORIES = [
  "All",
  "Power Tools",
  "Hand Tools",
  "Safety & PPE",
  "Electrical",
  "Plumbing",
  "Fasteners",
  "Abrasives",
  "Welding",
  "Lifting & Rigging",
  "Storage & Workshop",
  "Cleaning",
];

const PRICE_RANGES = [
  { label: "Under R500", value: "under-500" },
  { label: "R500 – R2,000", value: "500-2000" },
  { label: "R2,000 – R10,000", value: "2000-10000" },
  { label: "R10,000+", value: "10000-plus" },
];

function parsePriceRange(price?: string): { minPrice?: number; maxPrice?: number } {
  switch (price) {
    case "under-500": return { maxPrice: 500 };
    case "500-2000": return { minPrice: 500, maxPrice: 2000 };
    case "2000-10000": return { minPrice: 2000, maxPrice: 10000 };
    case "10000-plus": return { minPrice: 10000 };
    default: return {};
  }
}

interface ProductsPageProps {
  searchParams: { category?: string; brand?: string; sort?: string; q?: string; price?: string };
}

async function ProductResults({ searchParams }: ProductsPageProps) {
  const sortKey = searchParams.sort ?? "BEST_SELLING";
  const query = [
    searchParams.q,
    searchParams.category && searchParams.category !== "All"
      ? `product_type:${searchParams.category}`
      : null,
    searchParams.brand ? `vendor:${searchParams.brand}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const priceRange = parsePriceRange(searchParams.price);
  const { products } = await getProducts({
    first: 24,
    query,
    sortKey,
    ...(priceRange.minPrice !== undefined && { minPrice: priceRange.minPrice }),
    ...(priceRange.maxPrice !== undefined && { maxPrice: priceRange.maxPrice }),
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="font-condensed font-bold text-2xl text-brand-black mb-2">
          No products found
        </p>
        <p className="text-brand-gray-400 text-sm">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-brand-black py-10">
        <div className="container-page">
          <h1 className="font-condensed font-black text-4xl md:text-5xl text-white uppercase">
            {searchParams.category ?? "All Products"}
          </h1>
          <p className="text-brand-gray-400 mt-2">
            19,000+ products — power tools, hand tools, safety, electrical & more
          </p>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide mb-4">
              <SlidersHorizontal size={16} />
              Filters
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">
                Category
              </p>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`/products?category=${cat}`}
                      className={`block text-sm py-1.5 px-2 transition-colors ${
                        (searchParams.category ?? "All") === cat
                          ? "bg-brand-orange text-white font-bold"
                          : "text-brand-gray-600 hover:text-brand-orange"
                      }`}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price filter */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">
                Price (ZAR)
              </p>
              <ul className="space-y-1">
                {PRICE_RANGES.map(({ label, value }) => {
                  const params = new URLSearchParams();
                  if (searchParams.category) params.set("category", searchParams.category);
                  if (searchParams.q) params.set("q", searchParams.q);
                  if (searchParams.sort) params.set("sort", searchParams.sort);
                  if (searchParams.price !== value) params.set("price", value);
                  const href = `/products${params.toString() ? `?${params.toString()}` : ""}`;
                  const isActive = searchParams.price === value;
                  return (
                    <li key={value}>
                      <a
                        href={href}
                        className={`block text-sm py-1.5 px-2 transition-colors ${
                          isActive
                            ? "bg-brand-orange text-white font-bold"
                            : "text-brand-gray-600 hover:text-brand-orange"
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-gray-100">
              <p className="text-sm text-brand-gray-600">
                Showing results
                {searchParams.q && (
                  <span className="font-bold text-brand-black"> for &ldquo;{searchParams.q}&rdquo;</span>
                )}
              </p>
              <Suspense fallback={<div className="text-sm border border-brand-gray-200 px-3 py-2 min-w-[160px] h-[38px] bg-brand-gray-50 animate-pulse" />}>
                <SortSelect currentSort={searchParams.sort ?? "BEST_SELLING"} />
              </Suspense>
            </div>

            <FilterDrawer activeCategory={searchParams.category} activePrice={searchParams.price} />

            <Suspense
              fallback={
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <ProductResults searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
