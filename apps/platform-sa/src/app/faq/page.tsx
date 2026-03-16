import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Baboom SA — orders, delivery, B2B accounts, and more.",
};

const FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      {
        q: "How fast is delivery?",
        a: "Orders placed before 12pm (Mon–Fri) are dispatched same day. Standard delivery is 2–5 business days depending on your location. Express options are available at checkout.",
      },
      {
        q: "Do you deliver nationwide?",
        a: "Yes — we deliver to all 9 provinces in South Africa. Delivery fees are calculated at checkout based on your address and order weight.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order is dispatched you will receive a tracking number via email and SMS.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept EFT, major credit and debit cards, and trade account terms for approved B2B customers.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "Are products genuine and warranty-backed?",
        a: "Yes. All products are sourced from authorised distributors and carry the manufacturer's warranty.",
      },
      {
        q: "What if I can't find a product?",
        a: "With 19,000+ products it's possible we carry it but it's not listed yet. Contact us at info@baboom.co.za and we'll source it for you.",
      },
    ],
  },
  {
    category: "B2B Accounts",
    items: [
      {
        q: "How do I open a B2B account?",
        a: "Complete the B2B application on our B2B Portal page. We review within 1 business day and your account manager will contact you directly.",
      },
      {
        q: "What is the minimum order for bulk pricing?",
        a: "Bulk pricing applies from 5 units of the same product. Volume tiers are applied automatically once your B2B account is approved.",
      },
      {
        q: "Can I get 30-day credit terms?",
        a: "Yes, subject to credit approval. Apply via the B2B portal and select 'credit account' as your preference.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery for unused items in original packaging. Proof of purchase is required.",
      },
      {
        q: "What if my product is defective?",
        a: "Contact us immediately. We will arrange a replacement or refund. Defective products are covered by the manufacturer's warranty.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-14">
        <div className="container-page">
          <h1 className="font-condensed font-black text-5xl text-white uppercase">FAQ</h1>
          <p className="text-brand-gray-400 mt-2">Frequently asked questions</p>
        </div>
      </div>

      <div className="container-page py-14 max-w-4xl">
        {FAQS.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 className="font-condensed font-black text-2xl uppercase text-brand-black border-l-4 border-brand-orange pl-4 mb-6">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((faq) => (
                <details
                  key={faq.q}
                  className="group border border-brand-gray-200 open:border-brand-orange transition-colors"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-brand-black hover:text-brand-orange transition-colors list-none">
                    {faq.q}
                    <span className="ml-4 flex-shrink-0 font-condensed text-xl text-brand-orange group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-brand-gray-600 leading-relaxed border-t border-brand-gray-100">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="border-2 border-brand-orange p-8 text-center">
          <p className="font-condensed font-bold text-xl uppercase text-brand-black mb-3">
            Still have questions?
          </p>
          <p className="text-brand-gray-600 mb-6">
            Our SA-based support team is available Mon–Fri, 7am–6pm.
          </p>
          <div className="flex flex-col xs:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <a href="tel:+27800BABOOM" className="btn-outline">0800 BABOOM</a>
          </div>
        </div>
      </div>
    </div>
  );
}
