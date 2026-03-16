import Link from "next/link";

const CAMPAIGNS = [
  {
    title: "Workshop Essentials",
    subtitle: "Power up your workspace",
    href: "/products?category=power-tools",
    bg: "bg-brand-black-soft",
  },
  {
    title: "Site Safety Week",
    subtitle: "Full PPE range on sale",
    href: "/products?category=safety",
    bg: "bg-[#2a3a4a]",
  },
  {
    title: "Fasteners & Fixings",
    subtitle: "Bulk pricing available",
    href: "/products?category=fasteners",
    bg: "bg-brand-black",
  },
];

export function ExplorePromos() {
  return (
    <section className="py-12 md:py-16 bg-brand-orange border-b border-brand-edge">
      <div className="container-page">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
          Explore Current Promotions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPAIGNS.map((campaign) => (
            <Link
              key={campaign.title}
              href={campaign.href}
              className={`${campaign.bg} p-8 flex flex-col items-start justify-end min-h-[200px] group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10">
                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">
                  {campaign.subtitle}
                </p>
                <h3 className="text-xl font-black text-white leading-tight group-hover:text-brand-orange transition-colors">
                  {campaign.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
