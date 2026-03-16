import type { Metadata } from "next";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Order History",
  description: "View your Baboom SA order history.",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Order History</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-gray-50 border border-brand-edge rounded-sm flex flex-col items-center justify-center py-20 text-center px-6">
            <Package size={48} className="text-brand-gray-200 mb-4" />
            <h2 className="font-black text-xl text-brand-black mb-2">No orders yet</h2>
            <p className="text-brand-gray-600 text-sm mb-6">
              Sign in to view your order history, or start shopping to place your first order.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link href="/account" className="btn-primary text-sm gap-2">
                Sign In
              </Link>
              <Link href="/products" className="btn-outline text-sm gap-2">
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
