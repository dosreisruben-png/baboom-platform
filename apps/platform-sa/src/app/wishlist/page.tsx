import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your Baboom SA saved items.",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">Wishlist</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-gray-50 border border-brand-edge flex flex-col items-center justify-center py-20 text-center px-6">
            <Heart size={48} className="text-brand-gray-200 mb-4" />
            <h2 className="font-black text-xl text-brand-black mb-2">Your wishlist is empty</h2>
            <p className="text-brand-gray-600 text-sm mb-6">
              Save items you love while browsing. Sign in to sync your wishlist across devices.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link href="/account" className="btn-primary text-sm">Sign In</Link>
              <Link href="/products" className="btn-outline text-sm gap-2">
                Browse Products <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
