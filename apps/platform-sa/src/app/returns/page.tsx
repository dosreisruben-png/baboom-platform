import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Baboom SA returns and exchange policy.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">Returns Policy</h1>
          <p className="text-brand-gray-400 mt-2">Hassle-free returns within 30 days.</p>
        </div>
      </div>

      <div className="container-page py-12 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {[
            { icon: RotateCcw, title: "30-Day Returns", body: "Return any item within 30 days of receipt for a full refund or exchange, provided it is unused and in original packaging." },
            { icon: ShieldCheck, title: "Faulty Items", body: "Defective or damaged items are covered under manufacturer warranty. Contact us within 7 days of receiving a faulty product." },
            { icon: Clock, title: "Processing Time", body: "Refunds are processed within 5–7 business days of receiving the returned item at our warehouse." },
            { icon: Phone, title: "Easy Process", body: "Contact our support team to initiate a return. We'll arrange collection or provide a return address." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-brand-edge p-6">
              <Icon size={24} className="text-brand-orange mb-3" />
              <h2 className="font-bold text-brand-black mb-2">{title}</h2>
              <p className="text-sm text-brand-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-gray-50 border border-brand-edge p-6 mb-8">
          <h3 className="font-bold text-brand-black mb-3">What Cannot Be Returned</h3>
          <ul className="text-sm text-brand-gray-600 space-y-1 list-disc list-inside">
            <li>Items that have been used, worn, or damaged by the customer</li>
            <li>Custom-cut or specially ordered items</li>
            <li>Chemicals, lubricants, or consumables once opened</li>
            <li>Items returned after 30 days without prior authorisation</li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-brand-gray-600 text-sm mb-4">Ready to start a return?</p>
          <Link href="/contact" className="btn-primary">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
