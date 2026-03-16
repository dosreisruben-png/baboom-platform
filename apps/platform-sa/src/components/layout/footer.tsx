import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      {/* Main footer */}
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="block font-black text-3xl text-brand-orange uppercase mb-3 tracking-tight">
              BABOOM
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              South Africa&apos;s premier MRO and industrial supplies store. 19,000+ products for professionals and tradespeople.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-700 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: My Account */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">My Account</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Sign In", href: "/account" },
                { label: "Create Account", href: "/account/register" },
                { label: "Order History", href: "/account/orders" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "B2B Portal", href: "/b2b" },
                { label: "Track Order", href: "/account/track" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-brand-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Store Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Store Info</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Baboom", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "Sitemap", href: "/sitemap.xml" },
                { label: "Brands", href: "/brands" },
                { label: "Careers", href: "/careers" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-brand-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="text-brand-orange flex-shrink-0 mt-0.5" />
                123 Industrial Drive, Germiston, Johannesburg, 1401
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-brand-orange flex-shrink-0" />
                <a href="tel:+27110000000" className="hover:text-brand-orange transition-colors">
                  +27 11 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-brand-orange flex-shrink-0" />
                <a href="mailto:info@baboom.co.za" className="hover:text-brand-orange transition-colors">
                  info@baboom.co.za
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock size={15} className="text-brand-orange flex-shrink-0 mt-0.5" />
                Mon–Fri: 7:00am – 6:00pm<br />
                Sat: 8:00am – 2:00pm
              </li>
            </ul>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-brand-orange hover:underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-800">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Baboom SA (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "PayFast", "EFT"].map((method) => (
              <span
                key={method}
                className="text-xs border border-gray-700 px-2.5 py-1 text-gray-500"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
