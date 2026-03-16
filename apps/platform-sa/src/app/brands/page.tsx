import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brands",
  description: "Shop top industrial and hardware brands at Baboom SA.",
};

const BRANDS = [
  "3M", "Bosch", "DeWalt", "Makita", "Stanley", "Bahco", "Snap-on",
  "Honeywell", "Brady", "Würth", "SKF", "NSK", "FAG", "Lincoln",
  "ESAB", "Bullard", "MSA Safety", "Elvex", "Ansell", "Portwest",
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Brands</h1>
          <p className="text-brand-gray-400 mt-2">Genuine products from the world&apos;s leading manufacturers.</p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/products?brand=${encodeURIComponent(brand)}`}
              className="border border-brand-edge bg-white flex items-center justify-center py-8 px-4 font-bold text-brand-black hover:border-brand-orange hover:text-brand-orange transition-all text-center"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
