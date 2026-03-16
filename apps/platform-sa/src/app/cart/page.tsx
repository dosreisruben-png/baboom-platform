import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  // Cart state is managed client-side via cookies/context (implementation TBD)
  const isEmpty = true;

  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-10">
        <div className="container-page">
          <h1 className="font-condensed font-black text-4xl text-white uppercase">
            Your Cart
          </h1>
        </div>
      </div>

      <div className="container-page py-12">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart size={64} className="text-brand-gray-200 mb-6" />
            <h2 className="font-condensed font-black text-2xl text-brand-black uppercase mb-3">
              Your cart is empty
            </h2>
            <p className="text-brand-gray-400 mb-8">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link href="/products" className="btn-primary">
              <ArrowLeft size={16} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2">
              {/* Cart lines rendered here */}
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-brand-gray-50 p-6 border border-brand-gray-200">
                <h2 className="font-condensed font-bold text-xl uppercase mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Subtotal</span>
                    <span className="font-bold">R 0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Shipping</span>
                    <span className="font-bold text-brand-orange">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t pt-4 mb-6 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg">R 0.00</span>
                </div>
                <button className="btn-primary w-full py-4">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
                <p className="text-xs text-brand-gray-400 text-center mt-3">
                  Secure checkout. POPIA compliant.
                </p>
              </div>

              {/* Upsell suggestion */}
              <div className="mt-6 border border-brand-orange p-4 text-sm">
                <p className="font-bold text-brand-black mb-1">💡 Buying for your business?</p>
                <p className="text-brand-gray-600 mb-3">
                  Get bulk pricing and a dedicated account manager.
                </p>
                <Link href="/b2b" className="text-brand-orange font-bold hover:underline text-sm">
                  Apply for B2B →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
