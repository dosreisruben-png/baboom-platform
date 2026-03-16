import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { getFeaturedProducts } from "@/lib/shopify/queries";
import { formatMoney } from "@/lib/utils";
import { Suspense } from "react";

async function SeasonalContent() {
  const products = await getFeaturedProducts(6);

  const featured = products[0];
  const centre = products[1];
  const sideItems = products.slice(2, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: featured product card */}
      <div className="border border-brand-edge bg-white p-4 flex flex-col">
        {featured ? (
          <>
            <div className="flex-1 bg-brand-gray-50 rounded-sm flex items-center justify-center p-6 mb-4 min-h-[200px]">
              <span className="font-black text-5xl text-brand-gray-200">B</span>
            </div>
            <h3 className="font-bold text-sm text-brand-black mb-1 line-clamp-2">{featured.title}</h3>
            <p className="text-brand-orange font-black text-lg">{formatMoney(featured.priceRange.minVariantPrice)}</p>
            <button className="mt-3 btn-primary text-xs py-2.5 w-full">
              <Plus size={14} /> Add to Cart
            </button>
          </>
        ) : (
          <div className="flex-1 bg-brand-gray-50 flex items-center justify-center min-h-[260px]">
            <span className="text-brand-gray-400 text-sm">Featured product</span>
          </div>
        )}
      </div>

      {/* Centre: large featured with arrow nav placeholder */}
      <div className="border border-brand-edge bg-white p-4 flex flex-col items-center justify-center relative min-h-[320px]">
        {centre ? (
          <>
            <div className="w-full bg-brand-gray-50 rounded-sm flex items-center justify-center p-8 mb-4 flex-1">
              <span className="font-black text-6xl text-brand-gray-200">B</span>
            </div>
            <h3 className="font-bold text-base text-brand-black mb-1 text-center line-clamp-2">{centre.title}</h3>
            <p className="text-brand-orange font-black text-xl">{formatMoney(centre.priceRange.minVariantPrice)}</p>
          </>
        ) : (
          <span className="text-brand-gray-400 text-sm">Centre feature</span>
        )}
      </div>

      {/* Right: stacked small rows */}
      <div className="border border-brand-edge bg-white divide-y divide-brand-edge">
        {sideItems.length > 0 ? sideItems.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`} className="flex items-center gap-3 p-3 hover:bg-brand-gray-50 transition-colors group">
            <div className="w-16 h-16 bg-brand-gray-50 flex-shrink-0 flex items-center justify-center">
              <span className="font-black text-xl text-brand-gray-200">B</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-brand-black line-clamp-2 group-hover:text-brand-orange transition-colors">{product.title}</p>
              <p className="text-brand-orange font-bold text-sm mt-1">{formatMoney(product.priceRange.minVariantPrice)}</p>
            </div>
            <button className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange-dark transition-colors">
              <Plus size={14} />
            </button>
          </Link>
        )) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
              <div className="w-16 h-16 bg-brand-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-brand-gray-100 rounded w-3/4" />
                <div className="h-3 bg-brand-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function SeasonalOffers() {
  return (
    <section className="py-12 md:py-16 bg-brand-gray-50 border-b border-brand-edge">
      <div className="container-page">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-brand-black">
            Seasonal Offers <span className="text-brand-orange">Best Choice</span>
          </h2>
          <Link href="/products" className="hidden md:flex items-center gap-1 text-sm font-semibold text-brand-orange hover:underline">
            Show all products <ArrowRight size={14} />
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-brand-edge bg-white min-h-[320px] animate-pulse" />
              ))}
            </div>
          }
        >
          <SeasonalContent />
        </Suspense>
      </div>
    </section>
  );
}
