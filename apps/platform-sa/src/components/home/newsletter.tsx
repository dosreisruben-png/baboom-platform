"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-8 md:py-14 bg-brand-black border-b border-brand-edge">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-orange flex items-center justify-center flex-shrink-0">
              <Mail size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Subscribe to our newsletter</h2>
              <p className="text-brand-gray-400 text-sm mt-0.5">
                Get exclusive deals, new arrivals and B2B offers.
              </p>
            </div>
          </div>

          {submitted ? (
            <p className="text-brand-green font-semibold text-sm">
              ✓ You&apos;re subscribed! Check your inbox soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-0">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:w-72 border border-brand-gray-600 bg-brand-black-soft text-white placeholder-brand-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button type="submit" className="bg-brand-orange text-white font-bold px-6 py-3 text-sm hover:bg-brand-orange-dark transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
