import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/shopify/queries";
import { formatMoney, getDiscountPercentage } from "@/lib/utils";
import { ShoppingCart, Zap, Truck, ShieldCheck, RotateCcw, ChevronRight, Star, Copy } from "lucide-react";

interface ProductPageProps {
  params: { handle: string };
}

export async function generateStaticParams() {
  const { products } = await getProducts({ first: 100 });
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description.slice(0, 155),
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

function StarRow({ rating = 4.5, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />
        ))}
      </div>
      <span className="text-sm text-brand-gray-400">{rating}/5</span>
      <span className="text-sm text-brand-gray-400">({count} reviews)</span>
      <button className="text-sm text-brand-orange hover:underline ml-1">Write a review</button>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const firstVariant = product.variants.nodes[0];
  const discount = firstVariant
    ? getDiscountPercentage(firstVariant.price, firstVariant.compareAtPrice)
    : null;
  const sku = product.handle.toUpperCase().slice(0, 12);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-gray-50 border-b border-brand-edge">
        <div className="container-page py-3 flex items-center gap-2 text-xs text-brand-gray-400">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-brand-orange transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black font-medium line-clamp-1">{product.title}</span>
        </div>
      </div>

      <div className="container-page py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Images ────────────────────────────────────── */}
          <div>
            <div className="relative aspect-square bg-brand-gray-50 border border-brand-edge overflow-hidden mb-3">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-black text-6xl text-brand-gray-200">B</span>
                </div>
              )}
              {discount && (
                <span className="absolute top-4 left-4 badge-discount text-sm px-3 py-1">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.nodes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.nodes.slice(0, 6).map((img, i) => (
                  <div key={i} className="relative w-16 h-16 flex-shrink-0 border-2 border-brand-edge hover:border-brand-orange transition-colors cursor-pointer bg-brand-gray-50">
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${i + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ───────────────────────────────────── */}
          <div>
            {/* Vendor */}
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-1">
              {product.vendor}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-brand-black leading-tight mb-2">
              {product.title}
            </h1>

            {/* SKU */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-brand-gray-400">SKU: <strong className="text-brand-black">{sku}</strong></span>
              <button className="text-brand-gray-400 hover:text-brand-orange transition-colors" aria-label="Copy SKU">
                <Copy size={12} />
              </button>
            </div>

            {/* Rating */}
            <StarRow />

            {/* Price */}
            <div className="flex items-baseline gap-3 my-5 pb-5 border-b border-brand-edge">
              <span className="text-3xl font-black text-brand-black">
                {formatMoney(product.priceRange.minVariantPrice)}
              </span>
              {firstVariant?.compareAtPrice && (
                <>
                  <span className="text-xl text-brand-gray-400 line-through">
                    {formatMoney(firstVariant.compareAtPrice)}
                  </span>
                  {discount && (
                    <span className="badge-discount text-sm px-2 py-1">-{discount}%</span>
                  )}
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-4">
              {product.availableForSale ? (
                <span className="in-stock text-sm">● In stock — ready to ship</span>
              ) : (
                <span className="on-backorder text-sm">● On backorder</span>
              )}
            </div>

            {/* Promo countdown banner */}
            <div className="bg-brand-green/10 border border-brand-green/30 px-4 py-3 mb-5 flex items-center gap-3">
              <span className="text-brand-green font-bold text-xs uppercase tracking-wide">Limited offer</span>
              <span className="text-brand-black text-xs">Ends in 2 days — order now to lock in this price</span>
            </div>

            {/* Variants */}
            {product.variants.nodes.length > 1 && (
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.nodes.map((variant) => (
                    <button
                      key={variant.id}
                      className="border-2 border-brand-edge px-3 py-1.5 text-sm font-semibold hover:border-brand-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={!variant.availableForSale}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border-2 border-brand-edge">
                <button className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors text-lg leading-none">−</button>
                <span className="px-5 py-3 font-bold min-w-[48px] text-center">1</span>
                <button className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors text-lg leading-none">+</button>
              </div>
              <button
                className="flex-1 btn-primary text-sm py-3.5 gap-2 disabled:opacity-50"
                disabled={!product.availableForSale}
              >
                <ShoppingCart size={17} />
                {product.availableForSale ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {/* Buy now */}
            <button className="w-full btn-outline text-sm py-3 mb-5" disabled={!product.availableForSale}>
              <Zap size={16} />
              Buy Now
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-brand-gray-400 border-t border-brand-edge pt-5">
              {[
                { icon: Truck, label: "Fast SA Delivery" },
                { icon: ShieldCheck, label: "Genuine Product" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 bg-brand-gray-50 rounded-full flex items-center justify-center">
                    <Icon size={17} className="text-brand-orange" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* B2B upsell */}
            <div className="mt-5 bg-brand-gray-50 border border-brand-edge p-4 text-sm">
              <p className="font-bold text-brand-black mb-1">Buying in bulk?</p>
              <p className="text-brand-gray-600">
                B2B accounts get volume discounts from 5+ units.{" "}
                <Link href="/b2b" className="text-brand-orange font-bold hover:underline">
                  Apply for a B2B account →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.descriptionHtml && (
          <div className="mt-14 pt-10 border-t border-brand-edge">
            <h2 className="text-2xl font-black text-brand-black mb-6">Product Details</h2>
            <div
              className="prose prose-sm max-w-none text-brand-gray-600 [&_h3]:font-bold [&_h3]:text-brand-black"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Link
                key={tag}
                href={`/products?q=${encodeURIComponent(tag)}`}
                className="text-xs border border-brand-edge px-3 py-1.5 text-brand-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
