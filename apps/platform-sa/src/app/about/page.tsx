import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Baboom SA",
  description: "Learn about Baboom SA — South Africa's premier industrial and hardware supplier.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-14">
        <div className="container-page">
          <h1 className="font-condensed font-black text-5xl text-white uppercase">About Us</h1>
        </div>
      </div>

      <div className="container-page py-14 max-w-3xl">
        <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">
          Who We Are
        </p>
        <h2 className="section-title mb-6">
          Built for South Africa&apos;s <span className="section-title-accent">Tradespeople.</span>
        </h2>
        <div className="space-y-5 text-brand-gray-600 leading-relaxed">
          <p>
            Baboom SA was built to solve a real problem: quality industrial and hardware supplies were too hard to find, overpriced, and delivered through an outdated purchasing experience. We set out to change that.
          </p>
          <p>
            With 19,000+ products spanning power tools, hand tools, safety equipment, electrical, plumbing, fasteners, and more — Baboom SA is the one-stop platform for tradespeople, contractors, and businesses across South Africa.
          </p>
          <p>
            We believe every tradesperson — from a first-year apprentice to a large construction firm — deserves access to genuine, competitively-priced tools with fast delivery and professional support.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 my-12 py-10 border-y border-brand-gray-200">
          {[
            { value: "19,000+", label: "Products" },
            { value: "9", label: "Provinces served" },
            { value: "B2B", label: "Bulk accounts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-condensed font-black text-4xl text-brand-orange mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-brand-gray-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">Our Values</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Quality First", desc: "Only genuine, authorised products from trusted suppliers. No compromises." },
            { title: "SA-Built", desc: "A South African business, built for South African buyers and conditions." },
            { title: "Trade-Grade", desc: "Professional-grade products at honest prices. What the pros use, available to all." },
          ].map((val) => (
            <div key={val.title} className="border-t-2 border-brand-orange pt-4">
              <h3 className="font-condensed font-bold text-lg uppercase mb-2">{val.title}</h3>
              <p className="text-sm text-brand-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
