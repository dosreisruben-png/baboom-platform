"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";

interface InDemandClientProps {
  products: Product[];
}

function InDemandCarousel({ products }: InDemandClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 280 * 2;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-brand-border shadow-md flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-all"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {products.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[200px]"><ProductCardSkeleton /></div>
            ))
          : products.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-[200px]">
                <ProductCard product={product} {...(i % 3 === 0 ? { badge: "popular" as const } : {})} />
              </div>
            ))}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-brand-border shadow-md flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-all"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

interface InDemandProps {
  products: Product[];
}

export function InDemand({ products }: InDemandProps) {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-brand-border">
      <div className="container-page">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black">
            <span className="text-brand-black">In Demand</span>{" "}
            <span className="text-brand-orange">This Week</span>
          </h2>
          <Link href="/products" className="hidden md:block text-sm font-semibold text-brand-orange hover:underline">
            View all →
          </Link>
        </div>
        <InDemandCarousel products={products} />
      </div>
    </section>
  );
}
