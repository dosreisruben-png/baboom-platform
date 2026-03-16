import { ShieldCheck, Truck, Clock, Award, CreditCard, Headphones } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "POPIA Compliant",
    desc: "Your data is protected under SA law",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Fast shipping across all 9 provinces",
  },
  {
    icon: Clock,
    title: "Same-Day Dispatch",
    desc: "Orders placed before 12pm",
  },
  {
    icon: Award,
    title: "Genuine Products",
    desc: "Direct from authorised suppliers",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    desc: "EFT, card, and trade accounts",
  },
  {
    icon: Headphones,
    title: "SA-Based Support",
    desc: "Local team, Mon–Fri 7am–6pm",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-brand-gray-50 border-y border-brand-gray-200 py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {BADGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
                <Icon size={20} className="text-brand-orange" />
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-brand-black">
                  {title}
                </p>
                <p className="text-xs text-brand-gray-600 mt-0.5 leading-snug">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
