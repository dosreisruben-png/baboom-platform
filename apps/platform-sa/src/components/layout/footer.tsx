"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Clock, Plus, Minus } from "lucide-react";

const MY_ACCOUNT_LINKS = [
  { label: "Sign In", href: "/account" },
  { label: "Create Account", href: "/account/register" },
  { label: "Order History", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "B2B Portal", href: "/b2b" },
  { label: "Track Order", href: "/account/orders" },
];

const STORE_INFO_LINKS = [
  { label: "About Baboom", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Brands", href: "/brands" },
  { label: "Careers", href: "/careers" },
];

const CUSTOMER_SERVICE_LINKS = [
  { label: "Delivery & Payment", href: "/delivery" },
  { label: "Returns Policy", href: "/returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Store Locator", href: "/store-locator" },
];

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  function toggle(section: string) {
    setOpenSection((prev) => (prev === section ? null : section));
  }

  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      {/* Main footer */}
      <div className="container-page py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8">

          {/* Col 1: Brand — always visible */}
          <div className="pb-6 md:pb-0 border-b border-gray-800 md:border-0">
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

          {/* Col 2: My Account — accordion on mobile */}
          <div className="border-b border-gray-800 md:border-0">
            <button
              onClick={() => toggle("account")}
              className="md:hidden w-full flex items-center justify-between py-4 text-left"
              aria-expanded={openSection === "account"}
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">My Account</h3>
              {openSection === "account" ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <h3 className="hidden md:block text-white font-bold text-sm uppercase tracking-widest mb-4">My Account</h3>
            <ul className={`space-y-2.5 pb-4 md:pb-0 ${openSection === "account" ? "block" : "hidden"} md:block`}>
              {MY_ACCOUNT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-brand-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Store Info — accordion on mobile */}
          <div className="border-b border-gray-800 md:border-0">
            <button
              onClick={() => toggle("store")}
              className="md:hidden w-full flex items-center justify-between py-4 text-left"
              aria-expanded={openSection === "store"}
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">Store Info</h3>
              {openSection === "store" ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <h3 className="hidden md:block text-white font-bold text-sm uppercase tracking-widest mb-4">Store Info</h3>
            <ul className={`space-y-2.5 pb-4 md:pb-0 ${openSection === "store" ? "block" : "hidden"} md:block`}>
              {STORE_INFO_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-brand-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Service / Contact Us — accordion on mobile */}
          <div className="border-b border-gray-800 md:border-0">
            <button
              onClick={() => toggle("contact")}
              className="md:hidden w-full flex items-center justify-between py-4 text-left"
              aria-expanded={openSection === "contact"}
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">Contact Us</h3>
              {openSection === "contact" ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <h3 className="hidden md:block text-white font-bold text-sm uppercase tracking-widest mb-4">Contact Us</h3>
            <div className={`pb-4 md:pb-0 ${openSection === "contact" ? "block" : "hidden"} md:block`}>
              <ul className="space-y-3 mb-3">
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
              <ul className="space-y-2 mb-3">
                {CUSTOMER_SERVICE_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm hover:text-brand-orange transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-brand-orange hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
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
