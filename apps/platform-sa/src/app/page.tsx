import { Hero } from "@/components/home/hero";
import { TrustBadges } from "@/components/home/trust-badges";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { B2BCallout } from "@/components/home/b2b-callout";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <B2BCallout />

      {/* Student Financing Teaser */}
      <section className="py-14 bg-white border-t border-brand-gray-100">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-brand-orange/5 border-2 border-brand-orange p-8 md:p-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-brand-orange flex items-center justify-center">
                <GraduationCap size={32} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-2">
                Student & Graduate Financing
              </p>
              <h2 className="font-condensed font-black text-3xl md:text-4xl text-brand-black uppercase mb-3">
                Get Your Tools Now. Pay Over Time.
              </h2>
              <p className="text-brand-gray-600 leading-relaxed">
                We&apos;re partnering with financing providers to help students and young tradespeople access the tools they need to start their careers. Affordable monthly repayments, no large upfront cost.
              </p>
            </div>
            <Link
              href="/financing"
              className="flex-shrink-0 btn-primary text-sm px-8 py-4 whitespace-nowrap"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
