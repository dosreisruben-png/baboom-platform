"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Heart,
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
  Grid,
  ChevronRight,
  ChevronDown,
  Wrench,
  Zap,
  Scissors,
  HardHat,
  Ruler,
  Flame,
  Shield,
  Droplets,
  Settings,
  Shirt,
  Home,
  FileText,
} from "lucide-react";

const CATEGORIES = [
  { name: "Hand Tools", description: "Spanners, pliers, hammers & more", icon: Wrench, href: "/products?category=hand-tools" },
  { name: "Power Tools", description: "Drills, grinders, saws & more", icon: Zap, href: "/products?category=power-tools" },
  { name: "Cutting Tools", description: "Blades, drill bits, taps & dies", icon: Scissors, href: "/products?category=cutting-tools" },
  { name: "Abrasives", description: "Grinding wheels, sandpaper & more", icon: Settings, href: "/products?category=abrasives" },
  { name: "PPE & Safety", description: "Helmets, gloves, glasses & more", icon: HardHat, href: "/products?category=safety" },
  { name: "Measuring Equipment", description: "Calipers, levels, tape measures", icon: Ruler, href: "/products?category=measuring" },
  { name: "Welding", description: "Electrodes, wire, helmets & torches", icon: Flame, href: "/products?category=welding" },
  { name: "Lubricants & Chemicals", description: "Oils, greases, cleaning agents", icon: Droplets, href: "/products?category=lubricants" },
  { name: "Bearings", description: "Ball, roller, thrust & more", icon: Settings, href: "/products?category=bearings" },
  { name: "Workwear", description: "Overalls, boots, hi-vis clothing", icon: Shirt, href: "/products?category=workwear" },
  { name: "Site Maintenance", description: "Cleaning, storage & facility products", icon: Home, href: "/products?category=site-maintenance" },
  { name: "Office & Workshop", description: "Stationery, storage & organisation", icon: FileText, href: "/products?category=office-workshop" },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Layer 1: Utility bar ─────────────────────────── */}
      <div className="bg-gray-100 border-b border-brand-edge text-xs text-brand-gray-600 hidden md:block">
        <div className="container-page flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-brand-orange" />
              Johannesburg, ZA
            </span>
            {[
              { label: "Delivery & Payment", href: "/delivery" },
              { label: "Returns", href: "/returns" },
              { label: "Store Locator", href: "/stores" },
              { label: "Contacts", href: "/contact" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-brand-orange transition-colors">
                {l.label}
              </Link>
            ))}
            <button className="flex items-center gap-1 hover:text-brand-orange transition-colors">
              Information <ChevronDown size={10} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-brand-black">ZAR</span>
            <span className="text-brand-edge">|</span>
            <span className="font-semibold text-brand-black">EN</span>
          </div>
        </div>
      </div>

      {/* ── Layer 2: Main header ─────────────────────────── */}
      <header className={`sticky top-0 z-40 bg-white border-b border-brand-edge transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className="container-page flex items-center gap-3 h-16 md:h-20">
          {/* Hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex-shrink-0 p-2 hover:text-brand-orange transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Wordmark */}
          <Link href="/" className="flex-shrink-0 font-black text-2xl md:text-3xl text-brand-orange tracking-tight uppercase">
            BABOOM
          </Link>

          {/* Categories pill */}
          <button className="hidden lg:flex items-center gap-2 bg-brand-orange text-white font-bold text-sm px-4 py-2 rounded-full whitespace-nowrap hover:bg-brand-orange-dark transition-colors ml-1">
            <Grid size={15} />
            Categories
          </button>

          {/* Search */}
          <div className="flex-1 relative mx-2">
            <input
              type="text"
              placeholder="Search 19,000+ products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-brand-edge px-4 py-2.5 pr-12 text-sm focus:outline-none focus:border-brand-orange transition-colors rounded-sm"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-brand-orange text-white hover:bg-brand-orange-dark transition-colors rounded-sm">
              <Search size={17} />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <a href="tel:+27110000000" className="hidden xl:flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-orange transition-colors whitespace-nowrap">
              <Phone size={16} className="text-brand-orange" />
              +27 11 000 0000
            </a>
            <Link href="/wishlist" className="p-2 hover:text-brand-orange transition-colors" aria-label="Wishlist">
              <Heart size={20} />
            </Link>
            <Link href="/account" className="p-2 hover:text-brand-orange transition-colors" aria-label="Account">
              <User size={20} />
            </Link>
            <Link href="/cart" className="p-2 hover:text-brand-orange transition-colors relative" aria-label="Cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hamburger Drawer ─────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-80 max-w-[90vw] bg-white h-full flex flex-col overflow-y-auto shadow-2xl animate-slide-in-left">
            {/* Drawer header */}
            <div className="bg-brand-black px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gray-600 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Sign in / Register</p>
                  <p className="text-brand-gray-400 text-xs">Sign in to get more opportunities</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Category list */}
            <div className="flex-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-brand-gray-50 transition-colors group border-b border-brand-edge last:border-0"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-brand-gray-50 rounded-sm flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                      <Icon size={17} className="text-brand-orange group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-brand-black leading-tight">{cat.name}</p>
                      <p className="text-xs text-brand-gray-400 truncate">{cat.description}</p>
                    </div>
                    <ChevronRight size={14} className="text-brand-gray-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* Drawer footer */}
            <div className="border-t border-brand-edge bg-brand-gray-50 px-5 py-4 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-gray-600">
                {[
                  { icon: MapPin, label: "Johannesburg" },
                  { icon: Shield, label: "Returns Policy" },
                  { icon: Zap, label: "Delivery Info" },
                  { icon: Settings, label: "Languages" },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex items-center gap-1.5 hover:text-brand-orange transition-colors py-1">
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
