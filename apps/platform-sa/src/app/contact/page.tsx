"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit to backend/email service
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-14">
        <div className="container-page">
          <h1 className="font-condensed font-black text-5xl text-white uppercase">Contact Us</h1>
          <p className="text-brand-gray-400 mt-2">South African team. Real people. Fast responses.</p>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Contact info */}
          <div>
            <h2 className="section-title mb-8">
              Get in <span className="section-title-accent">Touch.</span>
            </h2>

            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: "Phone", value: "+27 11 000 0000", sub: "Mon–Fri, 7am–6pm SAST", href: "tel:+27110000000" },
                { icon: Mail, label: "Email", value: "info@baboom.co.za", sub: "We reply within 24 hours", href: "mailto:info@baboom.co.za" },
                { icon: MapPin, label: "Location", value: "Johannesburg, South Africa", sub: "Nationwide delivery" },
                { icon: Clock, label: "Support Hours", value: "Mon–Fri: 7am–6pm", sub: "Sat: 8am–1pm" },
              ].map(({ icon: Icon, label, value, sub, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-bold text-brand-black hover:text-brand-orange transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-bold text-brand-black">{value}</p>
                    )}
                    <p className="text-xs text-brand-gray-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-brand-gray-50 border border-brand-gray-200 p-5 text-sm">
              <p className="font-bold text-brand-black mb-2">For B2B enquiries:</p>
              <p className="text-brand-gray-600">
                If you&apos;re an existing B2B account holder or want to discuss bulk purchasing, please email{" "}
                <a href="mailto:b2b@baboom.co.za" className="text-brand-orange font-bold hover:underline">
                  b2b@baboom.co.za
                </a>{" "}
                or call your dedicated account manager directly.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="section-title mb-8">
              Send a <span className="section-title-accent">Message.</span>
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-brand-edge">
                <CheckCircle size={48} className="text-brand-green mb-4" />
                <h3 className="font-black text-xl text-brand-black mb-2">Message Sent!</h3>
                <p className="text-brand-gray-600 text-sm mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="btn-outline text-sm px-6 py-2"
                >
                  Send Another Message
                </button>
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
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="input-field" required>
                    <option value="">Select a topic...</option>
                    <option>Order enquiry</option>
                    <option>Product question</option>
                    <option>B2B / Bulk purchasing</option>
                    <option>Returns & refunds</option>
                    <option>Student financing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="input-field h-32 resize-none" required placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn-primary w-full py-4">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
