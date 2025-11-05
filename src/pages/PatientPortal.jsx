// src/pages/PatientPortal.jsx
import React from "react";
import {
  Lock,
  ShieldCheck,
  ClipboardList,
  MessageSquare,
  FileText,
  Pill,
  UploadCloud,
  UserCircle,
  ArrowRight,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

// Reuse your working hero; swap to a dedicated image anytime.
import heroImage from "../assets/about/heroImage.png";

const INTRO =
  "Your health. Your records. Your access. Our upcoming Patient Portal will let you view care plans, visit summaries, and message your care team—so you can stay informed and empowered.";

const features = [
  { icon: UserCircle, text: "View and update your personal profile" },
  { icon: ClipboardList, text: "Access visit summaries and care notes" },
  { icon: Pill, text: "Review medications and treatment plans" },
  { icon: UploadCloud, text: "Upload insurance documents or care updates" },
  { icon: MessageSquare, text: "Send secure messages to your care coordinator" },
  { icon: FileText, text: "Download forms, statements, and receipts" },
];

const comingSoon =
  "Our Patient Portal is currently under development. Once available, current patients will receive secure login credentials via email or text.";

const helpText =
  "Need records or have questions before the portal launches? Contact our office or submit a request via the General Inquiry page.";

const securityNotes = [
  "HIPAA-aligned handling of PHI (Protected Health Information)",
  "Encrypted in transit and at rest",
  "Role-based access controls and audit logging",
  "Identity verification for portal enrollment",
];

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
      name: "Patient Portal",
      item:
        typeof window !== "undefined"
          ? `${window.location.origin}/patient-portal`
          : "https://example.com/patient-portal",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Patient Portal • Menorah Health LLP",
  description:
    "A secure, patient-first portal for viewing records, care plans, and messaging your care team.",
  isPartOf: { "@type": "WebSite", name: "Menorah Health LLP" },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Menorah Patient Portal",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PatientPortal() {
  const title = "Patient Portal • Menorah Health LLP";
  const description =
    "A secure, patient-first portal for viewing records, care plans, and messaging your care team. Coming soon.";
  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/patient-portal`
      : "https://example.com/patient-portal";
  const ogImage =
    typeof window !== "undefined"
      ? `${window.location.origin}${heroImage.startsWith("/") ? "" : "/"}${heroImage}`
      : `https://example.com${heroImage.startsWith("/") ? "" : "/"}${heroImage}`;

  return (
    <main id="patient-portal" className="bg-white text-neutral-900">
      {/* SEO */}
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        keywords={[
          "patient portal Ohio",
          "home care patient portal",
          "DODD patient portal",
          "care plans online",
          "visit summaries online",
          "Medicaid waiver patient access",
          "Columbus patient portal",
          "Franklin County home care portal",
        ]}
        jsonLd={[breadcrumbJsonLd, webPageJsonLd, webAppJsonLd]}
      />

      {/* HERO */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Care professional assisting a patient at home"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-[360px] w-full object-cover sm:h-[480px]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl items-end px-4 pb-10 sm:min-h-[480px] sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-amber-700">
              PATIENT PORTAL
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Your health. Your records. Your access.
            </h1>
            <p className="mt-3 max-w-3xl text-neutral-700">{INTRO}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#features"
                className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                See Features
              </a>
              <Link
                to="/inquiries"
                className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Request Records
              </Link>
              <Link
                to="/referral"
                className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Start Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            What you’ll be able to do
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, text }) => (
              <article
                key={text}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Icon className="h-5 w-5 text-amber-700" />
                  </span>
                  <h3 className="font-semibold leading-tight">{text}</h3>
                </div>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON + HELP */}
      <section className="py-6">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Lock className="h-5 w-5 text-amber-700" />
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">Coming soon</h3>
            </div>
            <p className="text-neutral-700">{comingSoon}</p>
            <div className="mt-5">
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

          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-700" />
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">Need help now?</h3>
            </div>
            <p className="text-neutral-700">{helpText}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-800">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-700" /> (614) 772-0563
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-700" /> menorahhealth@gmail.com
              </span>
              <Link
                to="/inquiries"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700"
              >
                General Inquiry <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* SECURITY & PRIVACY */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-neutral-200 bg-white/90 px-6 py-6 shadow-sm ring-1 ring-black/5 sm:px-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
              <ShieldCheck className="h-5 w-5 text-amber-700" />
            </span>
            <h3 className="text-xl font-extrabold tracking-tight">Security & privacy</h3>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {securityNotes.map((s) => (
              <li key={s} className="text-sm text-neutral-700">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOT YET A PATIENT */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="text-xl font-extrabold tracking-tight">Not yet a patient?</h3>
            <p className="mt-2 max-w-3xl text-neutral-700">
              If you're interested in starting services, visit our Referral & Intake page to begin.
            </p>
            <div className="mt-4">
              <Link
                to="/referral"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Start Referral & Intake <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              to="/about"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">About Menorah</h4>
              <p className="mt-1 text-sm text-neutral-700">
                Learn about our vision, mission, and values.
              </p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
            <Link
              to="/services"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">Services</h4>
              <p className="mt-1 text-sm text-neutral-700">
                Explore skilled nursing, HPC, personal care, and more.
              </p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
            <Link
              to="/inquiries"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">General Inquiry</h4>
              <p className="mt-1 text-sm text-neutral-700">
                Ask a question or request records now.
              </p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
