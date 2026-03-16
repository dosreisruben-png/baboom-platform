import Link from "next/link";

const PROMOS = [
  {
    brand: "DEWALT",
    title: "Power Tool Sale",
    description: "Up to 30% off selected power tools this month",
    cta: "Shop Now",
    href: "/products?category=power-tools&brand=dewalt",
    bg: "bg-[#f5f0e8]",
    textColor: "text-brand-black",
    accent: "text-brand-orange",
  },
  {
    brand: "3M",
    title: "PPE Essentials",
    description: "Certified safety equipment for every job site",
    cta: "View Range",
    href: "/products?category=safety&brand=3m",
    bg: "bg-brand-black",
    textColor: "text-white",
    accent: "text-brand-orange",
  },
  {
    brand: "BOSCH",
    title: "Professional Grade",
    description: "Precision tools built for South African conditions",
    cta: "Explore",
    href: "/products?category=power-tools&brand=bosch",
    bg: "bg-[#2a3a4a]",
    textColor: "text-white",
    accent: "text-brand-orange",
  },
];

export function PromoBannerGrid() {
  return (
    <section className="py-12 md:py-16 bg-brand-gray-50 border-b border-brand-edge">
      <div className="container-page">
        <h2 className="text-2xl md:text-3xl font-black text-brand-black mb-6">
          Discover some of our <span className="text-brand-orange">promotions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className={`${promo.bg} p-8 flex flex-col justify-between min-h-[240px] group hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
            >
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${promo.accent} mb-2`}>
                  {promo.brand}
                </p>
                <h3 className={`text-2xl font-black ${promo.textColor} mb-2 leading-tight`}>
                  {promo.title}
                </h3>
                <p className={`text-sm ${promo.textColor} opacity-70 leading-relaxed`}>
                  {promo.description}
                </p>
              </div>
              <Link
                href={promo.href}
                className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${promo.accent} hover:underline`}
              >
                {promo.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
