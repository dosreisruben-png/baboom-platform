"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductImagesProps {
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  title: string;
  discount: number | null;
}

export function ProductImages({ featuredImage, images, title, discount }: ProductImagesProps) {
  const allImages = images.length > 0 ? images : (featuredImage ? [featuredImage] : []);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = allImages[activeIdx] ?? featuredImage;

  return (
    <div>
      <div className="relative aspect-square bg-brand-gray-50 border border-brand-edge overflow-hidden mb-3">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.altText ?? title}
            fill
            className="object-contain p-8"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#F0F0F0] flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
        )}
        {discount && (
          <span className="absolute top-4 left-4 badge-discount text-sm px-3 py-1">
            -{discount}% OFF
          </span>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allImages.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative w-16 h-16 flex-shrink-0 border-2 transition-colors bg-brand-gray-50 ${
                activeIdx === i
                  ? "border-brand-orange"
                  : "border-brand-edge hover:border-brand-orange"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
