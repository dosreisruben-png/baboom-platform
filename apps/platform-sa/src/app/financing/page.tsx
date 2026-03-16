"use client";

import { useState } from "react";
import { GraduationCap, CheckCircle, Clock, AlertCircle } from "lucide-react";

const HOW_IT_WORKS = [
  { step: "01", title: "Browse Products", desc: "Select the tools and equipment you need for your trade qualification." },
  { step: "02", title: "Apply Online", desc: "Complete a short application. Provider will assess your eligibility." },
  { step: "03", title: "Get Approved", desc: "Receive a decision within 48 hours. No large deposit required." },
  { step: "04", title: "Start Working", desc: "Receive your tools and pay affordable monthly repayments." },
];

export default function FinancingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    institution: "",
    trade: "",
    budget: "",
    consent: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
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
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-brand-orange flex-shrink-0 flex items-center justify-center mt-1">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div className="max-w-2xl">
              <p className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">
                Student & Graduate Program
              </p>
              <h1 className="font-condensed font-black text-5xl md:text-6xl text-white uppercase leading-none mb-4">
                Student Financing
              </h1>
              <p className="text-brand-gray-400 text-lg leading-relaxed">
                Starting out in a trade shouldn&apos;t mean you can&apos;t afford the right tools. We&apos;re building partnerships with financing providers to help students and young tradespeople access professional-grade equipment with manageable repayments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        {/* Coming soon banner */}
        <div className="flex items-start gap-3 bg-brand-orange/10 border-2 border-brand-orange p-5 mb-14">
          <AlertCircle size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-brand-black">Financing Provider — Coming Soon</p>
            <p className="text-sm text-brand-gray-600 mt-1">
              We are currently finalising our student financing partnership. Register your interest below and we&apos;ll notify you the moment it launches.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left */}
          <div>
            <h2 className="section-title mb-8">
              How It Will <span className="section-title-accent">Work.</span>
            </h2>
            <div className="space-y-6">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="flex-shrink-0 font-condensed font-black text-3xl text-brand-orange w-10">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-bold text-brand-black mb-1">{step.title}</p>
                    <p className="text-sm text-brand-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-brand-gray-200 p-6">
              <h3 className="font-condensed font-bold text-lg uppercase mb-4">Who qualifies?</h3>
              <ul className="space-y-2">
                {[
                  "TVET college students enrolled in a trade programme",
                  "Apprentices in a formal apprenticeship",
                  "Recent trade graduates (within 2 years)",
                  "South African citizen or permanent resident",
                  "18 years or older",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Register interest form */}
          <div>
            <h2 className="section-title mb-8">
              Register <span className="section-title-accent">Interest.</span>
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-brand-edge">
                <CheckCircle size={48} className="text-brand-green mb-4" />
                <h3 className="font-black text-xl text-brand-black mb-2">Interest Registered!</h3>
                <p className="text-brand-gray-600 text-sm">
                  We&apos;ll notify you as soon as our student financing programme launches.
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
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Institution / Employer</label>
                  <input type="text" name="institution" value={form.institution} onChange={handleChange} className="input-field" placeholder="e.g. Ekurhuleni TVET College" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Trade / Programme</label>
                  <input type="text" name="trade" value={form.trade} onChange={handleChange} className="input-field" placeholder="e.g. Electrician, Plumber, Welder" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Estimated tool budget needed</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                    <option value="">Select range...</option>
                    <option>Under R5,000</option>
                    <option>R5,000 – R15,000</option>
                    <option>R15,000 – R30,000</option>
                    <option>R30,000+</option>
                  </select>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleChange} className="accent-brand-orange mt-1" required />
                  <label htmlFor="consent" className="text-xs text-brand-gray-600 cursor-pointer">
                    I agree to be contacted by Baboom SA and its financing partners regarding the student financing programme. I understand this is an expression of interest, not a credit application.
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full py-4">
                  <Clock size={16} />
                  Register My Interest
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
