import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Store Locator",
  description: "Find your nearest Baboom SA store or collection point.",
};

const STORES = [
  {
    name: "Baboom SA — Germiston (Head Office)",
    address: "123 Industrial Drive, Germiston, Johannesburg, 1401",
    phone: "+27 11 000 0000",
    hours: "Mon–Fri: 7:00am – 6:00pm | Sat: 8:00am – 2:00pm",
    services: ["Click & Collect", "Trade Counter", "B2B Accounts", "Showroom"],
  },
];

export default function StoreLocatorPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Store Locator</h1>
          <p className="text-brand-gray-400 mt-2">Find your nearest Baboom SA branch.</p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {STORES.map((store) => (
            <div key={store.name} className="border border-brand-edge p-6">
              <h2 className="font-black text-xl text-brand-black mb-4">{store.name}</h2>
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3 text-sm text-brand-gray-600">
                  <MapPin size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  {store.address}
                </li>
                <li className="flex items-center gap-3 text-sm text-brand-gray-600">
                  <Phone size={16} className="text-brand-orange flex-shrink-0" />
                  <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="hover:text-brand-orange transition-colors">
                    {store.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-gray-600">
                  <Clock size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  {store.hours}
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {store.services.map((s) => (
                  <span key={s} className="text-xs bg-brand-gray-50 border border-brand-edge px-3 py-1 text-brand-gray-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-brand-gray-50 border border-brand-edge flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <MapPin size={40} className="text-brand-gray-200 mx-auto mb-3" />
              <p className="text-brand-gray-400 text-sm">Interactive map coming soon</p>
              <a
                href="https://maps.google.com/?q=Germiston+Johannesburg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand-orange hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
