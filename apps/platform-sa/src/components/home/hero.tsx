import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-brand-black overflow-hidden min-h-[75vh] md:min-h-[80vh] flex items-center">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #FF6600 0px,
            #FF6600 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      {/* Orange accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-brand-orange" />

      <div className="container-page relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <Zap size={16} className="text-brand-orange" fill="#FF6600" />
            <span className="text-brand-orange font-bold text-sm uppercase tracking-widest">
              South Africa&apos;s Industrial Powerhouse
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-condensed font-black text-white uppercase leading-none mb-6">
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              19,000+
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-brand-orange">
              PRODUCTS.
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl">
              ONE PLATFORM.
            </span>
          </h1>

          <p className="text-brand-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Power tools, hand tools, safety equipment, electrical, plumbing and more.
            Built for tradespeople, contractors and B2B buyers across South Africa.
          </p>

          <div className="flex flex-col xs:flex-row gap-4">
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/b2b" className="btn-outline text-base px-8 py-4">
              B2B Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-brand-gray-600">
            {[
              { value: "19K+", label: "Products" },
              { value: "ZAR", label: "Local pricing" },
              { value: "B2B", label: "Bulk accounts" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-condensed font-black text-2xl md:text-3xl text-brand-orange">
                  {stat.value}
                </div>
                <div className="text-xs text-brand-gray-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
