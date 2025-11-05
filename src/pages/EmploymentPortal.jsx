// src/pages/EmploymentPortal.jsx
import React from "react";
import {
  Lock,
  FileText,
  CalendarDays,
  Megaphone,
  Users,
  ShieldCheck,
  BookOpenCheck,
  ArrowRight,
} from "lucide-react";
import Seo from "../components/Seo.jsx";

// Re-use your hero; swap to a dedicated portal image anytime
import heroImage from "../assets/about/heroImage.png";

const INTRO =
  "Your gateway to connection, resources, and opportunity. We’re building a dedicated space for our team—past, present, and future—to access tools, updates, and support that empower excellence in care and ministry.";

const NON_DISCRIM =
  "Menorah Health LLP does not discriminate based on race, color, religion, national origin, sex, disability, or age. We welcome all people and provide services according to our capability to deliver excellent, reliable care.";

const currentEmployeeFeatures = [
  { icon: FileText, text: "Policy updates and training materials" },
  { icon: CalendarDays, text: "Scheduling tools and HR forms" },
  { icon: Megaphone, text: "Internal announcements and staff resources" },
];

const futureEmployeeBullets = [
  "Healthcare, social care, and administrative roles",
  "Values-driven culture with mentorship and growth",
  "Apply today via the General Inquiry page",
];

// Optional structured data
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item:
        typeof window !== "undefined"
          ? `${window.location.origin}/`
          : "https://example.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Employment Portal",
      item:
        typeof window !== "undefined"
          ? `${window.location.origin}/employment-portal`
          : "https://example.com/employment-portal",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Employment Portal • Menorah Health LLP",
  description:
    "Employee resources, HR tools, and application gateway for future team members.",
  isPartOf: {
    "@type": "WebSite",
    name: "Menorah Health LLP",
  },
};

export default function EmploymentPortal() {
  const title = "Employment Portal • Menorah Health LLP";
  const description =
    "Employee resources, HR tools, and an application gateway for future team members. Secure portal coming soon—apply today via our inquiry page.";
  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/employment-portal`
      : "https://example.com/employment-portal";
  const ogImage =
    typeof window !== "undefined"
      ? `${window.location.origin}${heroImage.startsWith("/") ? "" : "/"}${heroImage}`
      : `https://example.com${heroImage.startsWith("/") ? "" : "/"}${heroImage}`;

  return (
    <main id="employment-portal" className="bg-white text-neutral-900">
      {/* SEO */}
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        keywords={[
          "caregiver jobs Columbus",
          "home care jobs Franklin County",
          "DODD jobs Ohio",
          "Medicaid waiver provider careers",
          "healthcare admin jobs Columbus",
        ]}
        jsonLd={[breadcrumbJsonLd, webPageJsonLd]}
      />

      {/* HERO */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Smiling care professional supporting a client at home"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-[360px] w-full object-cover sm:h-[480px]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl items-end px-4 pb-10 sm:min-h-[480px] sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-amber-700">
              EMPLOYEE PORTAL
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Employment & Employee Portal
            </h1>
            <p className="mt-3 max-w-3xl text-neutral-700">{INTRO}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#current"
                className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Current Employees
              </a>
              <a
                href="#future"
                className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Future Employees
              </a>
              <a
                href="/inquiries"
                className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Apply / General Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT EMPLOYEES */}
      <section id="current" className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                  <Lock className="h-5 w-5 text-amber-700" />
                </span>
                <h2 className="text-xl font-extrabold tracking-tight">
                  For Current Employees
                </h2>
              </div>
              <p className="text-neutral-700">
                A secure login area will provide access to key resources:
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {currentEmployeeFeatures.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                      <Icon className="h-4 w-4 text-amber-700" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  type="button"
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-600"
                  title="Portal coming soon"
                >
                  Portal Coming Soon
                </button>
              </div>
            </article>

            {/* WHY WORK WITH US (mini highlights) */}
            <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                  <Users className="h-5 w-5 text-amber-700" />
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Why work with Menorah
                </h3>
              </div>
              <ul className="grid gap-2 text-sm text-neutral-700">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-700" />
                  Compliance-first, values-driven culture
                </li>
                <li className="flex items-start gap-3">
                  <BookOpenCheck className="mt-0.5 h-4 w-4 text-amber-700" />
                  Ongoing training and mentorship
                </li>
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 text-amber-700" />
                  Flexible scheduling where possible
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-amber-700" />
                  Supportive team, meaningful impact
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* FUTURE EMPLOYEES */}
      <section id="future" className="pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Users className="h-5 w-5 text-amber-700" />
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">For Future Employees</h2>
            </div>

            <p className="text-neutral-700">
              We’re always looking for passionate, service-minded individuals to join our
              growing team—across healthcare, social care, and administrative support.
              While the portal is under construction, you can still apply today!
            </p>

            <ul className="mt-4 grid list-inside list-disc gap-1 text-sm text-neutral-700 sm:grid-cols-2">
              {futureEmployeeBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/inquiries"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Apply / General Inquiry <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Explore Our Services
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* NON-DISCRIMINATION */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <ShieldCheck className="h-5 w-5 text-amber-700" />
              </span>
              <h3 className="text-lg font-semibold">Statement on the Provision of Service</h3>
            </div>
            <p className="text-sm text-neutral-700">{NON_DISCRIM}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14">
        <div className="absolute inset-0 -z-10 bg-amber-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-10">
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-amber-700">
                Ready to take the next step?
              </p>
              <h4 className="mt-1 text-2xl font-extrabold tracking-tight">
                Join a values-driven team.
              </h4>
              <p className="mt-2 max-w-2xl text-neutral-700">
                Apply via our General Inquiry page. We’ll follow up promptly.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/inquiries"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  Apply / Inquiry <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400"
                >
                  Learn About Menorah
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-neutral-900">Quick links</p>
              <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
                <li><a className="hover:underline" href="#current">Current Employees</a></li>
                <li><a className="hover:underline" href="#future">Future Employees</a></li>
                <li><a className="hover:underline" href="/services">Services</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
