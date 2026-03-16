import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Full sitemap for Baboom SA.",
};

const SITE_LINKS = [
  {
    section: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Power Tools", href: "/products?category=power-tools" },
      { label: "Hand Tools", href: "/products?category=hand-tools" },
      { label: "PPE & Safety", href: "/products?category=safety" },
      { label: "Abrasives", href: "/products?category=abrasives" },
      { label: "Welding", href: "/products?category=welding" },
    ],
  },
  {
    section: "Account",
    links: [
      { label: "Sign In", href: "/account" },
      { label: "Create Account", href: "/account/register" },
      { label: "Order History", href: "/account/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "B2B Portal", href: "/b2b" },
    ],
  },
  {
    section: "Information",
    links: [
      { label: "About Baboom", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Delivery & Payment", href: "/delivery" },
      { label: "Returns Policy", href: "/returns" },
      { label: "Store Locator", href: "/store-locator" },
      { label: "Student Financing", href: "/financing" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Brands", href: "/brands" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Sitemap</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          {SITE_LINKS.map(({ section, links }) => (
            <div key={section}>
              <h2 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-4">{section}</h2>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-brand-gray-600 hover:text-brand-orange transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
