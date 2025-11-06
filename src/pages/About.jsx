// src/pages/About.jsx
import React from "react";
import {
  Handshake,
  Heart,
  Sparkles,
  ShieldCheck,
  Link as LinkIcon,
  Stethoscope,
  ArrowRight,
  Users,
  Award,
  FileCheck2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Seo from "../components/Seo.jsx";

// Local assets (kept under /src so Vite fingerprints it)
import heroImage from "../assets/about/aboutHero.jpg";

// Public logo (put the file at: /public/menorah-logo2.png)
const PUBLIC_LOGO = "/menorah-logo2.png";

// ------- Content -------
const VISION =
  "Our vision is to be a leading home healthcare provider recognized for our unwavering commitment to regulatory compliance and exceptional client care. We aspire to create a healthcare environment where client safety, sense of worth, satisfaction, and well-being are paramount.";

const MISSION =
  "Our mission is to be a trusted partner to each client in their health journey by being a comforting presence, always ready to support and uplift their well-being.";

const values = [
  {
    title: "Reliable Partner",
    Icon: Handshake,
    text:
      "We consistently meet the needs of clients and families through timely responses, dependable caregivers, and open communication—delivering peace of mind and reliable, high-quality care.",
  },
  {
    title: "Comforting Presence",
    Icon: Heart,
    text:
      "We create a warm, nurturing environment—offering reassurance and emotional support that enhances wellbeing and recovery.",
  },
  {
    title: "Empathy",
    Icon: Heart,
    text:
      "We understand and share clients’ feelings, providing compassionate, personalised care that makes people feel valued and respected.",
  },
  {
    title: "Innovation & Continuous Improvement",
    Icon: Sparkles,
    text:
      "We adopt new technologies and best practices; invest in ongoing training; and constantly look for better ways to elevate client outcomes.",
  },
  {
    title: "Compliance",
    Icon: ShieldCheck,
    text:
      "We rigorously adhere to regulatory standards, ethical guidelines, and healthcare best practice—protecting clients’ rights and building trust.",
  },
  {
    title: "Healing",
    Icon: Stethoscope,
    text:
      "We care for the whole person—physical, emotional, and mental—promoting holistic recovery and long-term health.",
  },
  {
    title: "Lasting Connections",
    Icon: LinkIcon,
    text:
      "We build strong, enduring relationships with clients, families, and the community—going beyond transactions to create meaningful bonds.",
  },
];

const stats = [
  { icon: Users, label: "Clients served", value: "250+" },
  { icon: CheckCircle2, label: "Client satisfaction", value: "98%" },
  { icon: Clock, label: "Avg. response time", value: "< 24 hrs" },
  { icon: Award, label: "Years combined experience", value: "30+" },
];

export default function About() {
  const siteName = "Menorah Health LLP";
  const pageTitle = `About Us • ${siteName}`;
  const description =
    "A trusted partner in home health & DODD support. We combine regulatory excellence with compassionate, person-centred care across the community.";

  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/about`
      : "https://example.com/about";

  const orgUrl =
    typeof window !== "undefined" ? window.location.origin : "https://example.com";

  // Absolute OG image URL for social previews
  const ogImage =
    typeof heroImage === "string" && heroImage
      ? heroImage.startsWith("http")
        ? heroImage
        : `${orgUrl}${heroImage.startsWith("/") ? "" : "/"}${heroImage}`
      : `${orgUrl}${PUBLIC_LOGO}`;

  // Organization JSON-LD
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: orgUrl,
    logo: `${orgUrl}${PUBLIC_LOGO}`,
    sameAs: [], // add socials when ready
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+1-614-772-0563",
        email: "menorahhealth@gmail.com",
        areaServed: "US-OH",
        availableLanguage: ["en"],
      },
    ],
  };

  // FAQPage JSON-LD (rich results)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you accept Medicaid waiver clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support adults with developmental disabilities under applicable Medicaid waiver programmes.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can services start?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We typically respond within 24 hours. Start of care depends on eligibility, assessment, and scheduling.",
        },
      },
      {
        "@type": "Question",
        name: "Can I choose my caregiver?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes—especially under Participant-Directed HPC. We work with you to match skills, availability, and preferences.",
        },
      },
    ],
  };

  return (
    <main id="about" className="bg-white text-neutral-900">
      {/* ======= SEO ======= */}
      <Seo
        title={pageTitle}
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
        jsonLd={[orgJsonLd, faqJsonLd]}
      />

      {/* ========= HERO ========= */}
      <section className="relative overflow-hidden">
        {/* background image */}
        <img
          src={heroImage}
          alt="Care professional providing warm, person-centred home support"
          className="absolute inset-0 z-0 h-[420px] w-full object-cover sm:h-[520px]"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />

        {/* content */}
        <div className="relative z-20 mx-auto flex min-h-[420px] max-w-7xl items-end px-4 pb-10 sm:min-h-[520px] sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/90 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-amber-700">ABOUT US</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              A trusted partner in home health &amp; DODD support
            </h1>
            <p className="mt-3 max-w-2xl text-neutral-700">
              We’re committed to regulatory excellence and exceptional client care—so people feel
              safe, respected, and supported at home.
            </p>
          </div>
        </div>
      </section>

      {/* ========= VISION & MISSION ========= */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-extrabold tracking-tight">Vision</h2>
            <p className="mt-3 text-neutral-700">{VISION}</p>
          </article>
          <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-extrabold tracking-tight">Mission</h2>
            <p className="mt-3 text-neutral-700">{MISSION}</p>
          </article>
        </div>
      </section>

      {/* ========= AT A GLANCE ========= */}
      <section className="pb-4">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                <Icon className="h-5 w-5 text-amber-700" />
              </span>
              <div>
                <div className="text-xl font-extrabold leading-tight">{value}</div>
                <div className="text-sm text-neutral-600">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========= WHO WE ARE ========= */}
      <section className="py-4">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-extrabold tracking-tight">Who we are</h3>
            <p className="mt-3 text-neutral-700">
              We provide Medicaid waiver services for adults with developmental disabilities. Our
              team blends clinical expertise with human warmth, empowering people to live safely and
              independently at home. We invest in training, quality, and continuous improvement—
              because better processes and better people create better outcomes.
            </p>
            <div className="mt-5">
              <a
                href="/referral"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Start Referral <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Decorative image slot */}
          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={heroImage}
                alt="Care at home"
                className="h-80 w-full rounded-3xl object-cover shadow-lg ring-1 ring-black/5"
                loading="lazy"
              />
              <div className="absolute -right-4 -bottom-6 hidden h-40 w-64 rounded-2xl bg-amber-50 ring-1 ring-black/5 sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ========= COMPLIANCE ========= */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-neutral-200 bg-white/90 px-6 py-6 shadow-sm ring-1 ring-black/5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <ShieldCheck className="h-5 w-5 text-amber-700" />
              </span>
              <div>
                <h4 className="font-semibold">Regulatory Compliance</h4>
                <p className="text-sm text-neutral-700">
                  We follow DODD, HIPAA, and state home-care standards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <FileCheck2 className="h-5 w-5 text-amber-700" />
              </span>
              <div>
                <h4 className="font-semibold">Background & Training</h4>
                <p className="text-sm text-neutral-700">
                  DBS/BCI checks, annual competencies, and CPR/First Aid.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <Award className="h-5 w-5 text-amber-700" />
              </span>
              <div>
                <h4 className="font-semibold">Quality Assurance</h4>
                <p className="text-sm text-neutral-700">
                  Routine audits, incident review, and continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= CORE VALUES ========= */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-3xl">
            <h3 className="text-2xl font-extrabold tracking-tight">Our Core Values</h3>
            <p className="mt-2 text-neutral-700">
              Like the seven branches of a menorah, our passion to serve is anchored in seven
              enduring values that shape who we are—and how we hope to be known.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, Icon, text }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Icon className="h-5 w-5 text-amber-700" />
                  </span>
                  <h4 className="font-semibold leading-tight">{title}</h4>
                </div>
                <p className="text-sm text-neutral-700">{text}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========= FAQ ========= */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold tracking-tight">Frequently Asked Questions</h3>
          <div className="mt-5 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
            {[
              {
                q: "Do you accept Medicaid waiver clients?",
                a:
                  "Yes. We support adults with developmental disabilities under applicable Medicaid waiver programmes.",
              },
              {
                q: "How quickly can services start?",
                a:
                  "We typically respond within 24 hours. Start of care depends on eligibility, assessment, and scheduling.",
              },
              {
                q: "Can I choose my caregiver?",
                a:
                  "Yes—especially under Participant-Directed HPC. We work with you to match skills, availability, and preferences.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  {q}
                  <span className="ml-3 h-0.5 w-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-open:w-0" />
                </summary>
                <p className="mt-2 text-sm text-neutral-700">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="relative py-14">
        <div className="absolute inset-0 -z-10 bg-amber-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-10">
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-amber-700">Ready to talk?</p>
              <h4 className="mt-1 text-2xl font-extrabold tracking-tight">We’re here to help.</h4>
              <p className="mt-2 max-w-2xl text-neutral-700">
                Whether you’re exploring services or have questions about eligibility, we’ll respond
                promptly and respectfully.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/referral"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  Start Referral <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/inquiries"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400"
                >
                  Send an Inquiry
                </a>
              </div>
            </div>
            <img
              src={heroImage}
              alt="Client support"
              className="hidden h-60 w-full rounded-2xl object-cover ring-1 ring-black/5 sm:block"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
