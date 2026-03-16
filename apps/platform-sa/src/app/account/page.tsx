import type { Metadata } from "next";
import Link from "next/link";
import { User, Package, Heart, LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to your Baboom SA account.",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">My Account</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-brand-edge p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-gray-50 border border-brand-edge rounded-full flex items-center justify-center">
                <User size={22} className="text-brand-gray-400" />
              </div>
              <div>
                <p className="font-bold text-brand-black">Sign in to your account</p>
                <p className="text-xs text-brand-gray-400">Access orders, wishlist and B2B tools</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <input type="email" placeholder="Email address" className="input-field" />
              <input type="password" placeholder="Password" className="input-field" />
            </div>
            <button className="btn-primary w-full gap-2">
              <LogIn size={16} /> Sign In
            </button>
            <div className="mt-4 text-center">
              <Link href="/account/register" className="text-sm text-brand-orange hover:underline">
                Create an account →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Package, label: "Orders", href: "/account/orders" },
              { icon: Heart, label: "Wishlist", href: "/wishlist" },
              { icon: User, label: "B2B Portal", href: "/b2b" },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="bg-white border border-brand-edge p-4 flex flex-col items-center gap-2 hover:border-brand-orange transition-colors text-center">
                <Icon size={20} className="text-brand-orange" />
                <span className="text-xs font-semibold text-brand-black">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
