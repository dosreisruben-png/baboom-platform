import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery & Payment",
  description: "Delivery information and payment methods for Baboom SA.",
};

const DELIVERY_INFO = [
  {
    icon: Truck,
    title: "Nationwide Delivery",
    body: "We deliver to all 9 provinces across South Africa. Standard delivery takes 2–5 business days depending on your location.",
  },
  {
    icon: Clock,
    title: "Same-Day Dispatch",
    body: "Orders placed before 12:00pm on business days are dispatched the same day from our Germiston warehouse.",
  },
  {
    icon: MapPin,
    title: "Click & Collect",
    body: "Collect your order free of charge from our Germiston branch. Ready within 2 hours of ordering.",
  },
  {
    icon: Package,
    title: "Bulk & Pallet Orders",
    body: "B2B accounts with large or heavy orders receive dedicated freight quotes. Contact your account manager.",
  },
];

const PAYMENT_METHODS = [
  { name: "Credit / Debit Card", detail: "Visa, Mastercard — processed securely via PayGate" },
  { name: "EFT", detail: "Pay via instant EFT or manual bank transfer (order held until cleared)" },
  { name: "PayFast", detail: "South Africa's leading payment gateway — instant confirmation" },
  { name: "30-Day Trade Account", detail: "Available to approved B2B accounts — apply via the B2B portal" },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">Delivery &amp; Payment</h1>
          <p className="text-brand-gray-400 mt-2">Everything you need to know about getting your order.</p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {DELIVERY_INFO.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-brand-edge p-6">
              <Icon size={28} className="text-brand-orange mb-4" />
              <h2 className="font-bold text-lg text-brand-black mb-2">{title}</h2>
              <p className="text-brand-gray-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black text-brand-black mb-6">Payment Methods</h2>
        <div className="divide-y divide-brand-edge border border-brand-edge">
          {PAYMENT_METHODS.map(({ name, detail }) => (
            <div key={name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-semibold text-brand-black min-w-[220px]">{name}</span>
              <span className="text-sm text-brand-gray-600">{detail}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-brand-gray-600 text-sm mb-4">Have a question about your delivery?</p>
          <Link href="/contact" className="btn-primary">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
