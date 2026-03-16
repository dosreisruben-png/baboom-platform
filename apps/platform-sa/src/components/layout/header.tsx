"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    label: "Power Tools",
    href: "/products?category=power-tools",
    sub: ["Drills", "Grinders", "Sanders", "Saws", "Impact Wrenches"],
  },
  {
    label: "Hand Tools",
    href: "/products?category=hand-tools",
    sub: ["Hammers", "Screwdrivers", "Spanners", "Pliers", "Measuring"],
  },
  {
    label: "Safety & PPE",
    href: "/products?category=safety",
    sub: ["Helmets", "Gloves", "Eyewear", "Footwear", "High-Vis"],
  },
  {
    label: "Electrical",
    href: "/products?category=electrical",
    sub: ["Cable & Wire", "Conduit", "Switches", "Lighting", "Generators"],
  },
  {
    label: "Plumbing",
    href: "/products?category=plumbing",
    sub: ["Pipes", "Fittings", "Valves", "Pumps", "Fixtures"],
  },
  {
    label: "Fasteners",
    href: "/products?category=fasteners",
    sub: ["Bolts & Nuts", "Screws", "Anchors", "Rivets", "Washers"],
  },
];

const NAV_LINKS = [
  { label: "Products", href: "/products", hasMega: true },
  { label: "B2B / Bulk", href: "/b2b" },
  { label: "Student Finance", href: "/financing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-black text-white text-xs py-2 hidden md:block">
        <div className="container-page flex items-center justify-between">
          <span className="text-brand-gray-400">
            South Africa&apos;s Premier Industrial & Hardware Supplier
          </span>
          <div className="flex items-center gap-6">
            <a href="tel:+27800BABOOM" className="flex items-center gap-1 hover:text-brand-orange transition-colors">
              <Phone size={12} />
              0800 BABOOM
            </a>
            <Link href="/b2b" className="hover:text-brand-orange transition-colors">
              B2B Portal
            </Link>
            <Link href="/financing" className="hover:text-brand-orange transition-colors">
              Student Finance
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow",
          scrolled && "shadow-md"
        )}
      >
        <div className="container-page">
          <div className="flex items-center gap-4 h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              <span className="font-condensed font-black text-2xl md:text-3xl text-brand-black uppercase tracking-tighter">
                BABOOM
              </span>
              <span className="font-condensed font-black text-2xl md:text-3xl text-brand-orange uppercase tracking-tighter">
                .
              </span>
              <span className="hidden xs:block font-condensed font-semibold text-xs text-brand-gray-600 uppercase tracking-widest ml-1 leading-tight">
                SA
              </span>
            </Link>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="flex w-full border-2 border-brand-black focus-within:border-brand-orange transition-colors">
                <input
                  type="search"
                  placeholder="Search 19,000+ products..."
                  className="flex-1 px-4 py-2.5 text-sm outline-none bg-brand-gray-50"
                />
                <button className="bg-brand-orange text-white px-5 flex items-center hover:bg-brand-orange-dark transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto md:ml-0">
              <button className="md:hidden p-2 text-brand-gray-600">
                <Search size={20} />
              </button>
              <Link
                href="/cart"
                className="relative flex items-center gap-2 font-bold text-sm hover:text-brand-orange transition-colors"
              >
                <ShoppingCart size={22} />
                <span className="hidden sm:inline uppercase tracking-wide">Cart</span>
                <span className="absolute -top-1 -right-1 md:-right-3 md:static md:inline-flex items-center justify-center bg-brand-orange text-white text-xs font-bold min-w-[20px] h-5 px-1 rounded-full md:rounded-none">
                  0
                </span>
              </Link>
              <Link
                href="/b2b"
                className="hidden lg:inline-flex btn-secondary text-sm py-2 px-4"
              >
                B2B Login
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-brand-black"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center border-t border-brand-gray-100">
            {NAV_LINKS.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-3 text-sm font-bold uppercase tracking-wide hover:text-brand-orange transition-colors">
                    {link.label}
                    <ChevronDown size={14} className={cn("transition-transform", megaOpen && "rotate-180")} />
                  </button>
                  {megaOpen && <MegaMenu />}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-wide hover:text-brand-orange transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white flex flex-col animate-slide-down overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b bg-brand-black text-white">
              <span className="font-condensed font-black text-xl uppercase tracking-tight">
                BABOOM<span className="text-brand-orange">.</span>SA
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b">
              <div className="flex border-2 border-brand-black">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="flex-1 px-3 py-2.5 text-sm outline-none"
                />
                <button className="bg-brand-orange text-white px-4">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between px-5 py-4 font-bold uppercase tracking-wide border-b border-brand-gray-100 hover:bg-brand-gray-50 hover:text-brand-orange transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Categories */}
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs font-bold text-brand-gray-400 uppercase tracking-widest mb-3">
                  Shop by Category
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="flex items-center py-2.5 text-sm font-semibold hover:text-brand-orange transition-colors border-b border-brand-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* CTA */}
            <div className="p-4 border-t bg-brand-gray-50">
              <Link
                href="/b2b"
                className="btn-primary w-full text-sm"
                onClick={() => setMobileOpen(false)}
              >
                B2B / Bulk Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-0 top-full bg-white border-t-2 border-brand-orange shadow-xl w-[700px] grid grid-cols-3 gap-0 p-6 animate-slide-down z-50">
      {CATEGORIES.map((cat) => (
        <div key={cat.label} className="mb-4">
          <Link
            href={cat.href}
            className="block font-bold text-sm uppercase tracking-wide text-brand-black hover:text-brand-orange transition-colors mb-2"
          >
            {cat.label}
          </Link>
          <ul className="space-y-1">
            {cat.sub.map((item) => (
              <li key={item}>
                <Link
                  href={`/products?category=${cat.label.toLowerCase()}&sub=${item.toLowerCase()}`}
                  className="text-sm text-brand-gray-600 hover:text-brand-orange transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-3 border-t pt-4 mt-2 flex items-center justify-between">
        <Link
          href="/products"
          className="text-sm font-bold text-brand-orange uppercase tracking-wide hover:underline"
        >
          View all 19,000+ products →
        </Link>
        <Link href="/b2b" className="btn-secondary text-xs py-2 px-4">
          B2B Bulk Pricing
        </Link>
      </div>
    </div>
  );
}
