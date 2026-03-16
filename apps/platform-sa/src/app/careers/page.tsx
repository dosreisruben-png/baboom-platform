import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Baboom SA team. View open positions and grow with us.",
};

const OPEN_ROLES = [
  {
    title: "Sales Representative",
    department: "Sales",
    location: "Johannesburg, GP",
    type: "Full-time",
  },
  {
    title: "Warehouse Picker & Packer",
    department: "Operations",
    location: "Cape Town, WC",
    type: "Full-time",
  },
  {
    title: "Technical Product Specialist",
    department: "Product",
    location: "Remote (SA)",
    type: "Full-time",
  },
  {
    title: "Customer Support Agent",
    department: "Support",
    location: "Durban, KZN",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-black py-12">
        <div className="container-page">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">Careers</h1>
          <p className="text-brand-gray-400 mt-2">Build the future of industrial supply in South Africa.</p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-brand-black mb-2">Open Positions</h2>
          <p className="text-brand-gray-600 mb-8">
            We&apos;re a fast-growing team on a mission to make quality tools and safety equipment accessible to every South African tradesperson. If that excites you, we&apos;d love to hear from you.
          </p>

          <div className="space-y-4 mb-12">
            {OPEN_ROLES.map((role) => (
              <div
                key={role.title}
                className="border border-brand-edge bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-brand-black">{role.title}</h3>
                  <p className="text-sm text-brand-gray-600 mt-0.5">
                    {role.department} &middot; {role.location} &middot; {role.type}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="btn-primary text-sm shrink-0"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-brand-gray-50 border border-brand-edge p-6">
            <h3 className="font-bold text-brand-black mb-1">Don&apos;t see your role?</h3>
            <p className="text-sm text-brand-gray-600 mb-4">
              We&apos;re always looking for talented people. Send your CV and a short note about what you can bring to the team.
            </p>
            <Link href="/contact" className="btn-outline text-sm">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
