import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides and industry news from Baboom SA.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Blog</h1>
          <p className="text-brand-gray-400 mt-2">Tips, guides and industry news.</p>
        </div>
      </div>

      <div className="container-page py-16 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">Coming Soon</p>
          <h2 className="text-3xl font-black text-brand-black mb-4">Our Blog is on Its Way</h2>
          <p className="text-brand-gray-600 leading-relaxed">
            We&apos;re working on expert guides, product comparisons, safety tips and industry news tailored for South African tradespeople and contractors. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}
