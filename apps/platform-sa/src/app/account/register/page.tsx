"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!form.terms) errs.terms = "You must agree to the terms";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: integrate with Shopify customer create
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-gray-50">
        <div className="bg-brand-black py-12">
          <div className="container-page">
            <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Create Account</h1>
          </div>
        </div>
        <div className="container-page py-12">
          <div className="max-w-md mx-auto bg-white border border-brand-edge p-8 text-center">
            <CheckCircle size={48} className="text-brand-green mx-auto mb-4" />
            <h2 className="font-black text-xl text-brand-black mb-2">Account Created!</h2>
            <p className="text-brand-gray-600 text-sm mb-6">
              Welcome to Baboom SA, {form.firstName}! Your account has been created. Check your inbox for a verification email.
            </p>
            <Link href="/account" className="btn-primary w-full">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray-50">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-center md:text-left text-4xl md:text-5xl font-black text-white uppercase">Create Account</h1>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-md mx-auto bg-white border border-brand-edge p-8">
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} className="input-field" required />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} className="input-field" required />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} className="input-field" required />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} className="input-field" />
            <div>
              <input type="password" name="password" placeholder="Password (min. 8 characters)" value={form.password} onChange={handleChange} className="input-field" required />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} className="input-field" required />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label className="flex items-start gap-2 text-sm text-brand-gray-600 cursor-pointer">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-0.5 accent-brand-orange" required />
                I agree to the{" "}
                <Link href="/delivery" className="text-brand-orange hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/returns" className="text-brand-orange hover:underline">
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Create Account</button>
          </form>
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
