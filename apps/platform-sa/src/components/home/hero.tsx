"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "South Africa's #1 MRO Supplier",
    headline: ["The Tools", "Professionals", "Trust."],
    accent: [false, true, false],
    description: "19,000+ industrial and hardware products. Same-day dispatch from Johannesburg.",
    cta: "Shop Now",
    href: "/products",
    bg: "from-[#0a0a0a] via-[#1a1a1a] to-[#111111]",
    pattern: "worker",
  },
  {
    eyebrow: "B2B Bulk Pricing Available",
    headline: ["Power Tools", "for Every", "Job Site."],
    accent: [true, false, false],
    description: "Drills, grinders, saws and more. Volume discounts from 5 units. Open a B2B account today.",
    cta: "Explore Power Tools",
    href: "/products?category=power-tools",
    bg: "from-[#111111] via-[#1c1c1c] to-[#0f0f0f]",
    pattern: "tools",
  },
  {
    eyebrow: "PPE & Safety Equipment",
    headline: ["Work Safe.", "Every", "Day."],
    accent: [false, false, true],
    description: "Full range of certified PPE — hard hats, safety glasses, gloves, hi-vis & more.",
    cta: "Shop Safety",
    href: "/products?category=safety",
    bg: "from-[#0d0d0d] via-[#181818] to-[#111111]",
    pattern: "safety",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  // Use a ref for the guard so goTo has a stable reference (empty dep array).
  // If animating were in the dep array, goTo/next would recreate on every
  // animating toggle, causing useEffect([next]) to restart the interval and
  // loop indefinitely.
  const animatingRef = useRef(false);

  const goTo = useCallback((index: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => {
      animatingRef.current = false;
      setAnimating(false);
    }, 600);
  }, []); // stable — reads animatingRef, not animating state

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current]!;

  return (
    <section className="relative overflow-hidden" style={{ height: "min(600px, 70vh)" }}>
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-700`}>
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #FF6600 0px, #FF6600 1px, transparent 1px, transparent 60px),
                repeating-linear-gradient(-45deg, #FF6600 0px, #FF6600 1px, transparent 1px, transparent 60px)`,
            }}
          />
        </div>
        {/* Orange accent bar left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange" />
      </div>

      {/* Content */}
      <div className="relative h-full container-page flex items-center">
        <div className={`max-w-2xl transition-all duration-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">
            {slide.eyebrow}
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
            {slide.headline.map((word, i) => (
              <span key={i} className={`block ${slide.accent[i] ? "text-brand-orange" : "text-white"}`}>
                {word}
              </span>
            ))}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
            {slide.description}
          </p>
          <div className="flex justify-center md:justify-start">
            <Link href={slide.href} className="btn-primary-outline text-base px-8 py-4">
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-brand-orange border border-white/20 text-white transition-all duration-200 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-brand-orange border border-white/20 text-white transition-all duration-200 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-8 h-2 bg-brand-orange" : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
