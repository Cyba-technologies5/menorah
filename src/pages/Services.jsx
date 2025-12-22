// src/pages/Services.jsx
import React from "react";
import {
  Handshake,
  ShieldCheck,
  Stethoscope,
  Users,
  Clock,
  BookOpenCheck,
  ArrowRight,
  MapPin,
  Wallet,
} from "lucide-react";
import Seo from "../components/Seo.jsx";

// ---- Local assets ----
import skilledImg from "../assets/services/skilled-nursing.jpg";
import hpcImg from "../assets/services/hpc.jpg";
import personalImg from "../assets/services/personal-care.jpg";
import respiteImg from "../assets/services/respite.jpg";
import cprImg from "../assets/services/cpr.jpg";
import heroImage from "../assets/services/servicesHeroImage.jpg";
import moneyManagementImg from "../assets/services/moneymanagement.jpg";
import ctaBg from "../assets/services/ctaBgImg.jpg";

// ---- Helpers ----
const abs = (p) =>
  typeof window !== "undefined"
    ? `${window.location.origin}${p?.startsWith("/") ? "" : "/"}${p ?? ""}`
    : `https://example.com${p?.startsWith("/") ? "" : "/"}${p ?? ""}`;

// ---- Copy ----
const INTRO = `Here at Menorah Health LLP, we believe quality care starts with trust, comfort, and a helping hand. We provide in-home, hands-on support tailored to each person and family—whether you’re recovering from illness, managing a chronic condition, or need extra help with daily tasks. We serve all cities in Franklin and Delaware counties, and other counties based on need.`;

const SERVICES = [
  {
    id: "skilled",
    title: "Skilled Nursing / DD Waiver Nursing",
    Icon: Stethoscope,
    img: skilledImg,
    excerpt:
      "Our nurses can also assess yourcondition and determine the kind of aid you need with your doctor’s advice.",
    bullets: [
      "Insulin administration & blood sugar monitoring",
      "Tube feeding support",
      "Wound care, mobility assistance, and vital checks",
      "Coordination with physicians and specialists",
    ],
    ctaHref: "/referral",
    ctaLabel: "Request this service",
  },
  {
    id: "hpc",
    title: "Participant-Directed HPC (Homemaker/Personal Care)",
    Icon: Handshake,
    img: hpcImg,
    excerpt:
      "Choose your caregiver—often a trusted friend or relative—while we provide training, support, and oversight. We put you in control.",
    bullets: ["Caregiver selection", "Training & oversight", "Flexible, person-centred support"],
    ctaHref: "/referral",
    ctaLabel: "Request this service",
  },
  {
    id: "personal",
    title: "Supported Living & Homemaker Services",
    Icon: Users,
    img: personalImg,
    excerpt: "Dignity-first assistance with daily living to support independence and wellbeing.",
    bullets: [
      "Bathing, grooming, and dressing support",
      "Meal prep & feeding support",
      "Mobility help (walking, transfers)",
      "Light housekeeping & companionship",
    ],
    ctaHref: "/referral",
    ctaLabel: "Request this service",
  },
  {
    id: "respite",
    title: "Respite Care",
    Icon: Clock,
    img: respiteImg,
    excerpt:
      "Short-term relief so family caregivers can rest and recharge, with peace of mind.",
    bullets: ["Scheduled or emergency support", "Short-term relief care", "Safe, capable hands"],
    ctaHref: "/referral",
    ctaLabel: "Request this service",
  },
  {
    id: "cpr",
    title: "CPR & Emergency Training",
    Icon: BookOpenCheck,
    img: cprImg,
    excerpt:
      "Employer-accepted certification and practical emergency response training for families, caregivers, and community members.",
    bullets: [
      "Adult, child, and infant CPR techniques",
      "How to use an AED",
      "Choking response & basic first aid",
      "Emergency scene management & communication",
    ],
    ctaHref: "/cpr",
    ctaLabel: "Register",
  },
  {
    id: "money-management",
    title: "Money Management",
    Icon: Wallet,
    img: moneyManagementImg,
    excerpt:
      "Practical financial coaching to help you reach your goals, with simple plans and clear progress tracking.",
    bullets: [
      "Goal-based planning (step-by-step)",
      "Budgeting and cash flow support",
      "Savings, debt, and progress tracking",
    ],
    ctaHref: "/referral",
    ctaLabel: "Request this service",
  },
];

const NON_DISCRIM = `Menorah Health LLP does not discriminate based on race, colour, religion, national origin, sex, disability, or age. We welcome all people and provide services according to our capability to deliver excellent, reliable care.`;

// ---- JSON-LD (rich results) ----
const servicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      areaServed: ["US-OH Franklin County", "US-OH Delaware County"],
      provider: { "@type": "Organization", name: "Menorah Health LLP" },
      description: s.excerpt,
    },
  })),
};

export default function Services() {
  const title = "Services • Menorah Health LLP";
  const description =
    "Premium in-home care: Skilled Nursing / DD Waiver Nursing, Participant-Directed HPC, Supported Living & Homemaker Services, Respite, CPR & Emergency Training, and Money Management support across Franklin and Delaware counties.";
  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/services`
      : "https://example.com/services";
  const ogImage = abs(heroImage);

  return (
    <main id="services" className="bg-white text-neutral-900">
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        keywords={[
          "DoDD home care in Columbus",
          "Medicaid waiver services in Franklin County",
          "HPC services Ohio",
          "Respite care for adults with disabilities",
          "CPR Training near me",
          "Money management coaching",
        ]}
        jsonLd={[servicesItemListJsonLd]}
      />

      {/* HERO */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Compassionate caregiver offering in-home support"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        <div className="mx-auto flex min-h-[420px] max-w-7xl items-end px-4 pb-10 sm:min-h-[520px] sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-amber-700">
              SCOPE OF SERVICE / AREAS OF PRACTICE
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              In-home, hands-on support—modern care you can trust
            </h1>
            <p className="mt-3 max-w-3xl text-neutral-700">{INTRO}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#skilled"
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Skilled Nursing
              </a>
              <a
                href="#hpc"
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Participant-Directed HPC
              </a>
              <a
                href="#personal"
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Supported Living & Homemaker
              </a>
              <a
                href="#respite"
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Respite Care
              </a>
              <a
                href="#cpr"
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
              >
                CPR & Emergency Training
              </a>
              <a
                href="#money-management"
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Money Management
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTIES */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <MapPin className="h-5 w-5 text-amber-700" />
            </span>
            <p className="text-sm text-neutral-700">
              Serving all cities in <span className="font-semibold">Franklin</span> and{" "}
              <span className="font-semibold">Delaware</span> counties, plus other counties based on need.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 3 up, 3 down on large screens */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ id, title, Icon, img, excerpt, bullets, ctaHref, ctaLabel }) => (
              <article
                id={id}
                key={id}
                className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  {img ? (
                    <img
                      src={img}
                      alt={title}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-44 w-full bg-gradient-to-br from-amber-50 to-white" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent" />
                  <div className="absolute right-0 top-0 h-0.5 w-0 bg-amber-600 transition-all duration-300 group-hover:w-full" />
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                      <Icon className="h-5 w-5 text-amber-700" />
                    </span>
                    <h3 className="text-base font-semibold text-neutral-900 leading-tight">
                      {title}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-700">{excerpt}</p>

                  <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
                    {bullets.slice(0, 3).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <a
                    href={ctaHref}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline"
                  >
                    {ctaLabel} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
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
<section className="relative isolate overflow-hidden py-16 sm:py-24">
  {/* Background image */}
  <img
    src={ctaBg}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 z-0 h-full w-full object-cover"
    loading="lazy"
  />

  {/* Overlays (lighter + brand amber) */}
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
  <div className="absolute inset-0 z-10 bg-amber-900/20 mix-blend-multiply" />
  <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_60%)]" />

  {/* Content */}
  <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl ring-1 ring-black/10 backdrop-blur-xl sm:p-12">
        <p className="text-xs font-semibold tracking-[0.18em] text-amber-200">
          READY TO BEGIN
        </p>

        <h4 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          We’re here to help.
        </h4>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
           Whether you’re exploring services or have questions about eligibility, we’ll respond
                promptly.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/referral"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition hover:from-amber-600 hover:to-amber-700"
          >
            Start Referral
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="/inquiries"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            Send an Inquiry
          </a>
        </div>

        <div className="mx-auto mt-8 h-px w-24 bg-white/20" />
        <p className="mt-4 text-xs text-white/70">
          Menorah Health LLP • In-home support across Franklin & Delaware counties
        </p>
      </div>
    </div>
  </div>
</section>



    </main>
  );
}
