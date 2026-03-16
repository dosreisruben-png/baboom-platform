import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Baboom SA account.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">Create Account</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-md mx-auto bg-white border border-brand-edge p-8">
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="First name" className="input-field" />
              <input type="text" placeholder="Last name" className="input-field" />
            </div>
            <input type="email" placeholder="Email address" className="input-field" />
            <input type="tel" placeholder="Phone number" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <input type="password" placeholder="Confirm password" className="input-field" />
            <label className="flex items-start gap-2 text-sm text-brand-gray-600 cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-brand-orange" />
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <button className="btn-primary w-full">Create Account</button>
          <div className="mt-4 text-center">
            <Link href="/account" className="text-sm text-brand-orange hover:underline">
              Already have an account? Sign in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
