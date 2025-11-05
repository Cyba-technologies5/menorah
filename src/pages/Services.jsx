// src/pages/Services.jsx
import React from "react";
import {
  Handshake,
  Heart,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Users,
  Clock,
  BookOpenCheck,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Seo from "../components/Seo.jsx";

// ---- Local assets (swap paths if yours differ) ----
import skilledImg from "../assets/services/skilled-nursing.jpg";     // optional; provide local image or leave undefined
import hpcImg from "../assets/services/hpc.jpg";
import personalImg from "../assets/services/personal-care.jpg";
import respiteImg from "../assets/services/respite.jpg";
import cprImg from "../assets/services/cpr.jpg";
import heroImage from "../assets/services/servicesHeroImage.jpg";

// ---- Helpers ----
const abs = (p) =>
  typeof window !== "undefined"
    ? `${window.location.origin}${p?.startsWith("/") ? "" : "/"}${p ?? ""}`
    : `https://example.com${p?.startsWith("/") ? "" : "/"}${p ?? ""}`;

// ---- Content from your brief (tightened for UI) ----
const INTRO = `Here at Menorah Health LLP, we believe quality care starts with trust, comfort, and a helping hand. We provide in-home, hands-on support tailored to each person and family—whether you’re recovering from illness, managing a chronic condition, or need extra help with daily tasks. We serve all cities in Franklin and Delaware counties, and other counties based on need.`;

const SERVICES = [
  {
    id: "skilled",
    title: "Skilled Nursing Services",
    Icon: Stethoscope,
    img: skilledImg,
    excerpt:
      "Licensed nurses deliver expert, compassionate care at home—supporting medication management, monitoring, post-surgical recovery, and chronic condition support.",
    bullets: [
      "Wound care, IV therapy, mobility assistance",
      "Education for patients & families",
      "Coordination with physicians & specialists",
      "Support for diabetes, hypertension, Parkinson’s, Alzheimer’s",
    ],
  },
  {
    id: "hpc",
    title: "Participant-Directed HPC (Homemaker/Personal Care)",
    Icon: Handshake,
    img: hpcImg,
    excerpt:
      "Choose your caregiver—often a trusted friend or relative—while we provide training, support, and oversight. We put you in control.",
    bullets: ["Caregiver selection", "Training & oversight", "Flexible, person-centred support"],
  },
  {
    id: "personal",
    title: "Aided Living & Personal Care",
    Icon: Users,
    img: personalImg,
    excerpt:
      "Dignity-first assistance with daily living to support independence and wellbeing.",
    bullets: [
      "Bathing & grooming; dressing assistance",
      "Meal prep & feeding support",
      "Mobility help (walking, transfers)",
      "Light housekeeping & companionship",
    ],
  },
  {
    id: "respite",
    title: "Respite Care",
    Icon: Clock,
    img: respiteImg,
    excerpt:
      "Short-term relief so family caregivers can rest and recharge, with peace of mind.",
    bullets: ["Scheduled or emergency support", "Short-term relief care", "Safe, capable hands"],
  },
];

const CPR = {
  id: "cpr",
  title: "CPR & Emergency Training",
  Icon: BookOpenCheck,
  img: cprImg,
  price: 70,
  currency: "USD",
  excerpt:
    "Employer-accepted certification and practical emergency response training for families, caregivers, and community members.",
  bullets: [
    "Adult, child, and infant CPR techniques",
    "How to use an AED",
    "Choking response & basic first aid",
    "Emergency scene management & communication",
  ],
  schedule: "Classes held on Fridays or Saturday mornings",
  ctaHref: "/cpr",
};

const NON_DISCRIM = `Menorah Health LLP does not discriminate based on race, color, religion, national origin, sex, disability, or age. We welcome all people and provide services according to our capability to deliver excellent, reliable care.`;

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

const cprCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: CPR.title,
  description: CPR.excerpt,
  provider: { "@type": "Organization", name: "Menorah Health LLP" },
  offers: {
    "@type": "Offer",
    priceCurrency: CPR.currency,
    price: `${CPR.price}`,
    availability: "https://schema.org/InStock",
    url: abs(CPR.ctaHref),
  },
};

export default function Services() {
  const title = "Services • Menorah Health LLP";
  const description =
    "Premium in-home care: Skilled Nursing, Participant-Directed HPC, Personal Care, Respite, and CPR & Emergency Training across Franklin and Delaware counties.";
  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/services`
      : "https://example.com/services";
  const ogImage = abs(heroImage);

  return (
      <main id="services" className="bg-white text-neutral-900">
        {/* SEO */}
        <Seo
          title={title}
          description={description}
          canonical={canonical}
          ogImage={ogImage}
          keywords={[
            "DoDD home care in Columbus",
            "Medicaid waiver services in Franklin County",
            "HPC services Ohio",
            "Level One waiver providers near me",
            "Respite care for adults with disabilities",
            "CPR Training near me",
          ]}
          jsonLd={[servicesItemListJsonLd, cprCourseJsonLd]}
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
                  Aided Living & Personal Care
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
                Serving all cities in{" "}
                <span className="font-semibold">Franklin</span> and{" "}
                <span className="font-semibold">Delaware</span> counties, plus other counties based on need.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICE GRID */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map(({ id, title, Icon, img, excerpt, bullets }) => (
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
                      <h3 className="text-base font-semibold text-neutral-900 leading-tight">{title}</h3>
                    </div>
                    <p className="text-sm text-neutral-700">{excerpt}</p>
                    <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
                      {bullets.slice(0, 3).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <a
                      href={`#${id}-details`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline"
                    >
                      View details <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE DETAILS (beautiful accordions) */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {SERVICES.map(({ id, title, Icon, bullets, excerpt }) => (
                <details
                  id={`${id}-details`}
                  key={id}
                  className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                        <Icon className="h-5 w-5 text-amber-700" />
                      </span>
                      <h4 className="font-semibold">{title}</h4>
                    </div>
                    <span className="ml-3 h-0.5 w-8 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-open:w-0" />
                  </summary>
                  <p className="mt-3 text-sm text-neutral-700">{excerpt}</p>
                  <ul className="mt-3 grid list-inside list-disc gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CPR TRAINING HIGHLIGHT */}
        <section id={CPR.id} className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <article className="relative overflow-hidden rounded-3xl ring-1 ring-amber-200 shadow-md">
              {CPR.img ? (
                <img
                  src={CPR.img}
                  alt={CPR.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 via-amber-800/40 to-amber-600/30" />
              <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:p-10 text-white">
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                    Certification
                  </span>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight">{CPR.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/90">{CPR.excerpt}</p>
                  <ul className="mt-3 grid list-inside list-disc gap-1 text-sm">
                    {CPR.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-800 shadow">
                      Fee ${CPR.price}
                    </span>
                    <span className="text-sm text-white/90">{CPR.schedule}</span>
                    <a
                      href={CPR.ctaHref}
                      className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-700"
                    >
                      Register <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="hidden sm:block" />
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
                <p className="text-sm font-semibold tracking-wide text-amber-700">Ready to begin?</p>
                <h4 className="mt-1 text-2xl font-extrabold tracking-tight">We’re here to help.</h4>
                <p className="mt-2 max-w-2xl text-neutral-700">
                  Start a referral or register for CPR training—our team will follow up promptly.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/referral"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700"
                  >
                    Start Referral <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/cpr"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400"
                  >
                    CPR Registration
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">Quick links</p>
                <ul className="mt-2 list-inside list-disc text-sm text-neutral-700">
                  <li><a className="hover:underline" href="#skilled">Skilled Nursing</a></li>
                  <li><a className="hover:underline" href="#hpc">Participant-Directed HPC</a></li>
                  <li><a className="hover:underline" href="#personal">Personal Care</a></li>
                  <li><a className="hover:underline" href="#respite">Respite</a></li>
                  <li><a className="hover:underline" href="#cpr">CPR & Emergency Training</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
