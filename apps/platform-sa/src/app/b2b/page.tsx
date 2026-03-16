"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, FileText, Percent, Headphones, CheckCircle } from "lucide-react";

const BENEFITS = [
  "Volume discounts from 5 units",
  "Dedicated account manager",
  "30-day credit terms (subject to approval)",
  "Custom quotes within 24 hours",
  "Priority stock reservation",
  "Consolidated invoicing",
  "Access to trade-only pricing",
  "Nationwide delivery with tracking",
];

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    regNumber: "",
    email: "",
    phone: "",
    spend: "",
    products: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit to backend
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-brand-black py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">
              Business Accounts
            </p>
            <h1 className="text-center md:text-left font-condensed font-black text-5xl md:text-6xl text-white uppercase leading-none mb-6">
              B2B Portal
            </h1>
            <p className="text-brand-gray-400 text-lg leading-relaxed">
              Whether you&apos;re a sole trader or a large enterprise, Baboom SA has a dedicated B2B program designed for serious buyers. Bulk pricing, trade accounts, and a dedicated account manager.
            </p>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Benefits */}
          <div>
            <h2 className="section-title mb-8">
              Why Open a <span className="section-title-accent">B2B Account?</span>
            </h2>
            <ul className="space-y-3 mb-10">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-brand-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Percent, label: "Bulk Pricing", desc: "From 5 units" },
                { icon: FileText, label: "Quote Requests", desc: "24hr turnaround" },
                { icon: Building2, label: "Credit Terms", desc: "30 days net" },
                { icon: Headphones, label: "Account Rep", desc: "Dedicated support" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="border border-brand-gray-200 p-4">
                  <Icon size={20} className="text-brand-orange mb-2" />
                  <p className="font-bold text-sm text-brand-black">{label}</p>
                  <p className="text-xs text-brand-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div>
            <h2 className="section-title mb-8">
              Apply <span className="section-title-accent">Now.</span>
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-brand-edge">
                <CheckCircle size={48} className="text-brand-green mb-4" />
                <h3 className="font-black text-xl text-brand-black mb-2">Application Submitted!</h3>
                <p className="text-brand-gray-600 text-sm mb-2">
                  Thank you for applying. Our team will review your application and get back to you within 1 business day.
                </p>
                <p className="text-brand-gray-400 text-xs">
                  Check your inbox at <strong>{form.email}</strong> for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">First Name *</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Last Name *</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="input-field" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Company Name *</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Company Registration / Tax Number</label>
                  <input type="text" name="regNumber" value={form.regNumber} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Business Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Monthly Spend Estimate</label>
                  <select name="spend" value={form.spend} onChange={handleChange} className="input-field">
                    <option value="">Select range...</option>
                    <option>Under R10,000/month</option>
                    <option>R10,000 – R50,000/month</option>
                    <option>R50,000 – R200,000/month</option>
                    <option>R200,000+/month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">What do you primarily buy?</label>
                  <textarea name="products" value={form.products} onChange={handleChange} className="input-field h-24 resize-none" placeholder="e.g. Power tools, safety equipment, electrical supplies..." />
                </div>
                <button type="submit" className="btn-primary w-full py-4">
                  Submit B2B Application
                </button>
                <p className="text-xs text-brand-gray-400 text-center">
                  We&apos;ll review your application and get back to you within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Quote request CTA */}
      <div className="bg-brand-gray-50 border-t border-brand-gray-200 py-10">
        <div className="container-page text-center">
          <p className="text-brand-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/contact" className="text-brand-orange font-bold hover:underline">
              Submit a quote request →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
