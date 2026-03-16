"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  "All", "Power Tools", "Hand Tools", "Safety & PPE", "Electrical",
  "Plumbing", "Fasteners", "Abrasives", "Welding", "Lifting & Rigging",
  "Storage & Workshop", "Cleaning",
];

interface FilterDrawerProps {
  activeCategory: string | undefined;
}

export function FilterDrawer({ activeCategory }: FilterDrawerProps) {
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
                <div className="space-y-2">
                  {["Under R500", "R500 – R2,000", "R2,000 – R10,000", "R10,000+"].map((range) => (
                    <label key={range} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="accent-brand-orange" />
                      {range}
                    </label>
                  ))}
                </div>
              </div>
              {/* In stock */}
              <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
                <input type="checkbox" className="accent-brand-orange" />
                In stock only
              </label>
              {/* Apply button */}
              <button
                onClick={() => setOpen(false)}
                className="w-full btn-primary py-3"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
