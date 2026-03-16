"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Price: Low to High", value: "PRICE_ASC" },
  { label: "Price: High to Low", value: "PRICE_DESC" },
  { label: "Newest", value: "CREATED_AT" },
  { label: "Relevance", value: "RELEVANCE" },
];

export function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("sort", e.target.value);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <select
      className="text-sm border border-brand-gray-200 px-3 py-2 focus:outline-none focus:border-brand-orange"
      defaultValue={currentSort}
      onChange={handleChange}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
