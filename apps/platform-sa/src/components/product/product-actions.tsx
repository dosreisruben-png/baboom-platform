"use client";

import { useState } from "react";
import { ShoppingCart, Zap, Copy } from "lucide-react";
import type { Product } from "@/lib/shopify/types";

interface ProductActionsProps {
  product: Product;
  sku: string;
}

export function ProductActions({ product, sku }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.nodes[0]?.id ?? ""
  );
  const [skuCopied, setSkuCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  function copySku() {
    void navigator.clipboard.writeText(sku);
    setSkuCopied(true);
    setTimeout(() => setSkuCopied(false), 1500);
  }

  function handleAddToCart() {
    // TODO: integrate with Shopify cart API
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleBuyNow() {
    // TODO: integrate with Shopify checkout
    handleAddToCart();
  }

  return (
    <>
      {/* SKU copy */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-brand-gray-400">
          SKU: <strong className="text-brand-black">{sku}</strong>
        </span>
        <button
          onClick={copySku}
          className="text-brand-gray-400 hover:text-brand-orange transition-colors"
          aria-label="Copy SKU"
        >
          <Copy size={12} />
        </button>
        {skuCopied && (
          <span className="text-xs text-brand-green font-medium">Copied!</span>
        )}
      </div>

      {/* Variants */}
      {product.variants.nodes.length > 1 && (
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">
            Options
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.nodes.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`border-2 px-3 py-1.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  selectedVariantId === variant.id
                    ? "border-brand-orange text-brand-orange"
                    : "border-brand-edge hover:border-brand-orange"
                }`}
                disabled={!variant.availableForSale}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + add to cart */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center border-2 border-brand-edge">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors text-lg leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-5 py-3 font-bold min-w-[48px] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors text-lg leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 btn-primary text-sm py-3.5 gap-2 disabled:opacity-50 transition-all ${addedToCart ? "bg-brand-green hover:bg-brand-green" : ""}`}
          disabled={!product.availableForSale}
        >
          <ShoppingCart size={17} />
          {addedToCart
            ? "Added!"
            : product.availableForSale
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>

      {/* Buy now */}
      <button
        onClick={handleBuyNow}
        className="w-full btn-outline text-sm py-3 mb-5"
        disabled={!product.availableForSale}
      >
        <Zap size={16} />
        Buy Now
      </button>
    </>
  );
}
