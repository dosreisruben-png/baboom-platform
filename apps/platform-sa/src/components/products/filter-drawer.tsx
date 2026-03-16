"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  "All", "Power Tools", "Hand Tools", "Safety & PPE", "Electrical",
  "Plumbing", "Fasteners", "Abrasives", "Welding", "Lifting & Rigging",
  "Storage & Workshop", "Cleaning",
];

const PRICE_RANGES = [
  { label: "Under R500", value: "under-500" },
  { label: "R500 – R2,000", value: "500-2000" },
  { label: "R2,000 – R10,000", value: "2000-10000" },
  { label: "R10,000+", value: "10000-plus" },
];

interface FilterDrawerProps {
  activeCategory: string | undefined;
  activePrice?: string;
}

export function FilterDrawer({ activeCategory, activePrice }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 border border-brand-edge px-4 py-2 text-sm font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors mb-4"
      >
        <SlidersHorizontal size={15} />
        Filters
      </button>

      {/* Drawer backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          {/* Slide-up panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-edge sticky top-0 bg-white">
              <h3 className="font-black text-brand-black">Filters</h3>
              <button onClick={() => setOpen(false)} className="hover:text-brand-orange transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Category */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">Category</p>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <a
                        href={`/products?category=${cat}`}
                        onClick={() => setOpen(false)}
                        className={`block text-sm py-2 px-2 transition-colors ${
                          (activeCategory ?? "All") === cat
                            ? "bg-brand-orange text-white font-bold"
                            : "text-brand-gray-600 hover:text-brand-orange"
                        }`}
                      >
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Price */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">Price (ZAR)</p>
                <ul className="space-y-1">
                  {PRICE_RANGES.map(({ label, value }) => {
                    const params = new URLSearchParams();
                    if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);
                    if (activePrice !== value) params.set("price", value);
                    const href = `/products${params.toString() ? `?${params.toString()}` : ""}`;
                    const isActive = activePrice === value;
                    return (
                      <li key={value}>
                        <a
                          href={href}
                          onClick={() => setOpen(false)}
                          className={`block text-sm py-2 px-2 transition-colors ${
                            isActive
                              ? "bg-brand-orange text-white font-bold"
                              : "text-brand-gray-600 hover:text-brand-orange"
                          }`}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
