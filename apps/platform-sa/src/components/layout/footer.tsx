import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const FOOTER_LINKS = {
  Products: [
    { label: "Power Tools", href: "/products?category=power-tools" },
    { label: "Hand Tools", href: "/products?category=hand-tools" },
    { label: "Safety & PPE", href: "/products?category=safety" },
    { label: "Electrical", href: "/products?category=electrical" },
    { label: "View All", href: "/products" },
  ],
  Company: [
    { label: "About Baboom", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
  ],
  "B2B & Finance": [
    { label: "B2B Account Portal", href: "/b2b" },
    { label: "Bulk & Quote Requests", href: "/b2b/quotes" },
    { label: "Student Financing", href: "/financing" },
    { label: "Trade Accounts", href: "/b2b/trade" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      {/* Main footer */}
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-baseline mb-4">
              <span className="font-condensed font-black text-3xl text-white uppercase tracking-tighter">
                BABOOM
              </span>
              <span className="font-condensed font-black text-3xl text-brand-orange">.</span>
              <span className="font-condensed font-semibold text-xs text-brand-gray-400 uppercase tracking-widest ml-1">
                SA
              </span>
            </Link>
            <p className="text-brand-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              South Africa&apos;s premier industrial and hardware supplier. 19,000+ products. B2B bulk pricing. Fast nationwide delivery.
            </p>
            <div className="space-y-2 text-sm text-brand-gray-400">
              <a href="tel:+27800BABOOM" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <Phone size={14} />
                0800 BABOOM
              </a>
              <a href="mailto:info@baboom.co.za" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                <Mail size={14} />
                info@baboom.co.za
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                Johannesburg, South Africa
              </span>
            </div>
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-brand-gray-600 flex items-center justify-center text-brand-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-condensed font-bold text-sm uppercase tracking-widest text-brand-orange mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-brand-gray-600">
        <div className="container-page py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-brand-gray-400 uppercase tracking-wider font-bold">
            {[
              "🔒 Secure Checkout",
              "🚚 Fast SA Delivery",
              "✅ POPIA Compliant",
              "🏭 Direct from Supplier",
            ].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-gray-600">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-gray-600">
          <span>© {new Date().getFullYear()} Baboom SA. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-gray-400 transition-colors">Terms of Service</Link>
            <Link href="/popia" className="hover:text-brand-gray-400 transition-colors">POPIA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
