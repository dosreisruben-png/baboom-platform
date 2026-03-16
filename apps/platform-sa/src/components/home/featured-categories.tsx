import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { label: "Power Tools", href: "/products?category=power-tools", count: "3,200+", emoji: "⚡" },
  { label: "Hand Tools", href: "/products?category=hand-tools", count: "2,800+", emoji: "🔧" },
  { label: "Safety & PPE", href: "/products?category=safety", count: "1,500+", emoji: "🦺" },
  { label: "Electrical", href: "/products?category=electrical", count: "2,100+", emoji: "💡" },
  { label: "Plumbing", href: "/products?category=plumbing", count: "1,800+", emoji: "🔩" },
  { label: "Fasteners", href: "/products?category=fasteners", count: "4,000+", emoji: "⚙️" },
  { label: "Abrasives", href: "/products?category=abrasives", count: "900+", emoji: "🪨" },
  { label: "Welding", href: "/products?category=welding", count: "750+", emoji: "🔥" },
];

export function FeaturedCategories() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-2">
              Shop by Category
            </p>
            <h2 className="section-title">
              19,000+ Products.<br />
              <span className="section-title-accent">Find Yours.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-orange hover:underline"
          >
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center text-center p-4 border-2 border-brand-gray-100 hover:border-brand-orange transition-colors bg-white"
            >
              <span className="text-3xl mb-3">{cat.emoji}</span>
              <span className="font-bold text-xs uppercase tracking-wide text-brand-black group-hover:text-brand-orange transition-colors leading-tight mb-1">
                {cat.label}
              </span>
              <span className="text-xs text-brand-gray-400">{cat.count}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-orange"
          >
            Browse All Categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
