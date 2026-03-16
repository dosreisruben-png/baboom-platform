"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[52px]">
      <span className="text-3xl font-black text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

interface BestDealsProps {
  products: Product[];
}

export function BestDeals({ products }: BestDealsProps) {
  // Stable reference — must not be recreated on every render or useCountdown's
  // useEffect([targetDate]) will loop: setTimeLeft → re-render → new Date → re-run effect
  const [endDate] = useState(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
  const countdown = useCountdown(endDate);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -560 : 560, behavior: "smooth" });
  }

  return (
    <section className="py-12 md:py-16 bg-brand-black border-b border-brand-edge">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel */}
          <div className="flex flex-col justify-center">
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">
              Limited Time
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Best Deals<br />of the Day
            </h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Prices drop every 24 hours. Stock is limited — don&apos;t miss out on these deals.
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-3 mb-8">
              <TimeUnit value={countdown.days} label="Days" />
              <span className="text-2xl font-black text-brand-orange self-start mt-1">:</span>
              <TimeUnit value={countdown.hours} label="Hours" />
              <span className="text-2xl font-black text-brand-orange self-start mt-1">:</span>
              <TimeUnit value={countdown.minutes} label="Mins" />
              <span className="text-2xl font-black text-brand-orange self-start mt-1">:</span>
              <TimeUnit value={countdown.seconds} label="Secs" />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/products?sale=true" className="btn-primary text-sm px-6 py-3">
                More
              </Link>
              <Link href="/products" className="btn-outline-white text-sm px-6 py-3">
                All promotions
              </Link>
            </div>
          </div>

          {/* Right: product carousel */}
          <div className="lg:col-span-2 relative">
            <div className="flex items-center justify-end gap-2 mb-4">
              <button onClick={() => scroll("left")} className="w-8 h-8 border border-white/30 text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll("right")} className="w-8 h-8 border border-white/30 text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
              {products.length === 0
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-[200px]"><ProductCardSkeleton /></div>
                  ))
                : products.slice(0, 6).map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-[200px]">
                      <ProductCard product={product} badge="sale" />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
