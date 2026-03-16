import Link from "next/link";
import { Wrench, Zap, Scissors, HardHat, Ruler, Flame, Droplets, Settings } from "lucide-react";

const CATEGORIES = [
  { label: "Hand Tools", href: "/products?category=hand-tools", icon: Wrench },
  { label: "Power Tools", href: "/products?category=power-tools", icon: Zap },
  { label: "Cutting Tools", href: "/products?category=cutting-tools", icon: Scissors },
  { label: "PPE & Safety", href: "/products?category=safety", icon: HardHat },
  { label: "Measuring", href: "/products?category=measuring", icon: Ruler },
  { label: "Welding", href: "/products?category=welding", icon: Flame },
  { label: "Lubricants", href: "/products?category=lubricants", icon: Droplets },
  { label: "Abrasives", href: "/products?category=abrasives", icon: Settings },
];

export function FeaturedCategories() {
  return (
    <section className="py-10 border-b border-brand-edge">
      <div className="container-page">
        <div className="grid grid-cols-4 gap-3 sm:flex sm:overflow-x-auto sm:scrollbar-hide sm:gap-4 sm:pb-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-2 group sm:flex-shrink-0 sm:w-[120px]"
              >
                <div className="w-full aspect-square bg-[#F5F5F5] rounded-sm flex items-center justify-center border border-brand-edge group-hover:border-brand-orange group-hover:shadow-md transition-all duration-200 relative overflow-hidden">
                  <Icon size={36} className="text-brand-orange group-hover:scale-110 transition-transform duration-200" />
                  {/* Orange underline slide-in on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </div>
                <span className="text-xs font-semibold text-brand-black text-center group-hover:text-brand-orange transition-colors leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
