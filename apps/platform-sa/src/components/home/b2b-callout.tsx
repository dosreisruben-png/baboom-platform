import Link from "next/link";
import { Building2, FileText, Percent, Headphones } from "lucide-react";

const B2B_FEATURES = [
  { icon: Percent, label: "Bulk Pricing", desc: "Volume discounts from 5 units" },
  { icon: FileText, label: "Quote Requests", desc: "Custom quotes in 24 hours" },
  { icon: Building2, label: "Trade Accounts", desc: "30-day credit terms available" },
  { icon: Headphones, label: "Dedicated Rep", desc: "Your own account manager" },
];

export function B2BCallout() {
  return (
    <section className="bg-brand-black py-14 md:py-20">
      <div className="container-page">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">
              For Businesses & Contractors
            </p>
            <h2 className="font-condensed font-black text-white text-4xl md:text-5xl uppercase leading-none mb-6">
              Built For<br />
              <span className="text-brand-orange">B2B Buyers.</span>
            </h2>
            <p className="text-brand-gray-400 leading-relaxed mb-8 max-w-md">
              Whether you&apos;re a sole trader, contractor, or large enterprise — Baboom SA has dedicated B2B tools to streamline your procurement. Bulk pricing, quote requests, and credit accounts all in one place.
            </p>
            <div className="flex flex-col xs:flex-row gap-4">
              <Link href="/b2b" className="btn-primary">
                Open B2B Account
              </Link>
              <Link href="/b2b/quotes" className="btn-outline border-brand-gray-600 text-brand-gray-400 hover:border-brand-orange hover:text-white hover:bg-transparent">
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            {B2B_FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-brand-black-soft border border-brand-gray-600 p-5 hover:border-brand-orange transition-colors"
              >
                <Icon size={24} className="text-brand-orange mb-3" />
                <p className="font-bold text-white text-sm uppercase tracking-wide mb-1">
                  {label}
                </p>
                <p className="text-brand-gray-400 text-xs leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
