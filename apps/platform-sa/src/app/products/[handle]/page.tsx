import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/shopify/queries";
import { formatMoney, getDiscountPercentage } from "@/lib/utils";
import { ShoppingCart, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";

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

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const firstVariant = product.variants.nodes[0];
  const discount = firstVariant
    ? getDiscountPercentage(firstVariant.price, firstVariant.compareAtPrice)
    : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-gray-50 border-b border-brand-gray-100">
        <div className="container-page py-3 flex items-center gap-2 text-xs text-brand-gray-400">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-brand-orange transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black font-medium line-clamp-1">{product.title}</span>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-brand-gray-50 mb-4 border border-brand-gray-100">
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
                  <span className="font-condensed font-black text-6xl text-brand-gray-200">BABOOM</span>
                </div>
              )}
              {discount && (
                <span className="badge-sale absolute top-4 left-4 text-sm px-3 py-1">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.nodes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.nodes.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 flex-shrink-0 border-2 border-brand-gray-200 hover:border-brand-orange transition-colors cursor-pointer"
                  >
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

          {/* Details */}
          <div>
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-2">
              {product.vendor}
            </p>
            <h1 className="font-condensed font-black text-3xl md:text-4xl text-brand-black uppercase leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-condensed font-black text-3xl text-brand-black">
                {formatMoney(product.priceRange.minVariantPrice)}
              </span>
              {firstVariant?.compareAtPrice && (
                <>
                  <span className="text-lg text-brand-gray-400 line-through">
                    {formatMoney(firstVariant.compareAtPrice)}
                  </span>
                  {discount && (
                    <span className="badge-sale text-sm px-2 py-0.5">Save {discount}%</span>
                  )}
                </>
              )}
            </div>

            {/* Variants */}
            {product.variants.nodes.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-3">
                  Options
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.nodes.map((variant) => (
                    <button
                      key={variant.id}
                      className="border-2 border-brand-gray-200 px-3 py-1.5 text-sm font-bold hover:border-brand-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={!variant.availableForSale}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border-2 border-brand-gray-200">
                <button className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors">−</button>
                <span className="px-4 py-3 font-bold min-w-[48px] text-center">1</span>
                <button className="px-3 py-3 font-bold hover:bg-brand-gray-50 transition-colors">+</button>
              </div>
              <button
                className="flex-1 btn-primary text-sm py-3"
                disabled={!product.availableForSale}
              >
                <ShoppingCart size={16} />
                {product.availableForSale ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {/* B2B note */}
            <div className="bg-brand-gray-50 border border-brand-gray-200 p-4 mb-6 text-sm">
              <p className="font-bold text-brand-black mb-1">Buying in bulk?</p>
              <p className="text-brand-gray-600">
                B2B accounts get volume discounts from 5+ units.{" "}
                <Link href="/b2b" className="text-brand-orange font-bold hover:underline">
                  Apply for a B2B account →
                </Link>
              </p>
            </div>

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-brand-gray-400 border-t pt-6">
              {[
                { icon: Truck, label: "Fast SA Delivery" },
                { icon: ShieldCheck, label: "Genuine Product" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon size={20} className="text-brand-orange" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        {product.descriptionHtml && (
          <div className="mt-14 pt-10 border-t border-brand-gray-100">
            <h2 className="font-condensed font-black text-2xl uppercase mb-6">Product Details</h2>
            <div
              className="prose prose-sm max-w-none text-brand-gray-600 [&_h3]:font-condensed [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-brand-black"
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
                className="text-xs border border-brand-gray-200 px-3 py-1 text-brand-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors"
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
