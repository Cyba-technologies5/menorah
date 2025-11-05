
import React from "react";
import { Link } from "react-router-dom";
import {
  Handshake, Heart, Sparkles, ShieldCheck, Leaf, Link as LinkIcon,
  Phone, ArrowRight, MapPin, CheckCircle2, ClipboardList
} from "lucide-react";

// assets (make sure these files exist in /src/assets)
// import logo1 from "../assets/menorah-logo2.png";
import mainHero from "../assets/caregiver.png";
import ctaBg from "../assets/cta-bg-lux.jpg";
import skilled from "../assets/skillednursing.jpg.jpg";     
import hpc from "../assets/participant-hpc.jpg";
import respite from "../assets/respite-care.jpg";
import cprImg from "../assets/cpr-training.jpg";

// ----- DATA -----
const coreValues = [
  { title: "Reliable Partner", Icon: Handshake, blurb: "Timely responses, dependable caregivers, open communication." },
  { title: "Comforting Presence", Icon: Heart, blurb: "Warm, reassuring support that enhances wellbeing." },
  { title: "Empathy", Icon: Heart, blurb: "Compassionate, personalised care that makes people feel valued." },
  { title: "Innovation & Continuous Improvement", Icon: Sparkles, blurb: "Training, new techniques and better practices." },
  { title: "Compliance", Icon: ShieldCheck, blurb: "We adhere to regulatory standards and best practice." },
  { title: "Healing", Icon: Leaf, blurb: "Whole-person care: physical, emotional, mental." },
  { title: "Lasting Connections", Icon: LinkIcon, blurb: "Meaningful, long-term relationships with clients and families." },
];

const services = [
  {
    title: "Skilled Nursing",
    img: skilled,
    text: "Medication management, monitoring, wound care, IV therapy, mobility, education; coordination with physicians.",
  },
  {
    title: "Participant-Directed HPC",
    img: hpc,
    text: "You choose your caregiver; we provide training, support and oversight.",
  },
  {
    title: "Aided Living & Personal Care",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    text: "Bathing & grooming, dressing, meal prep/feeding, mobility help, housekeeping, companionship.",
  },
  {
    title: "Respite Care",
    img: respite,
    text: "Short-term relief, scheduled or emergency, giving families time to recharge.",
  },
];

const cpr = {
  title: "CPR & Emergency Training",
  fee: "$70",
  img: cprImg,
  text: "Adult/child/infant CPR, AED usage, choking response, scene management. Employer-accepted certification.",
};

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Employee Portal", href: "#employee" },
  { label: "Patient Portal", href: "#patient" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  const year = new Date().getFullYear();
  const [activeCounty, setActiveCounty] = React.useState("Franklin");
  const counties = [
    { label: "Franklin", href: "#franklin" },
    { label: "Delaware", href: "#delaware" },
    { label: "Other Counties", href: "#other-counties" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ========= NAVBAR ========= */}
     

      {/* ========= HERO ========= */}
      <section className="relative">
        <div className="relative h-[420px] sm:h-[520px]">
          <img src={mainHero} alt="Caregiver with an older adult at home" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent" />
        </div>

        <div className="relative z-10 -mt-16 sm:-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white/95 px-6 py-8 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:px-12 sm:py-12">
              <h1 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                Home health &amp; DODD support across
                <br className="hidden sm:block" />
                Franklin &amp; Delaware Counties
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-center text-lg text-neutral-700">
                We provide Medicaid waiver services for adults with developmental disabilities.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/referral"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow hover:bg-amber-700"
                >
                  Start Referral
                </Link>
                <a
                  href="tel:+16147720563"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400"
                >
                  Call (614) 772-0563
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {coreValues.slice(0, 6).map(({ title, Icon }) => (
              <div key={title} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Icon className="h-5 w-5 text-amber-700" />
                </span>
                <span className="text-sm font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= SERVICES + CPR ========= */}
      <section id="services" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Our Services</h2>
            <Link to="/referral" className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:border-neutral-400 sm:inline-block">
              Start Referral
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.title} className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative">
                  <img src={s.img} alt={s.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-0 top-0 h-0.5 w-0 bg-amber-600 transition-all duration-300 group-hover:w-full" />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-base font-semibold text-neutral-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">{s.text}</p>
                  <div className="pt-1">
                    <Link to="/referral" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline">
                      Request this service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* CPR highlight */}
            <article className="relative overflow-hidden rounded-3xl ring-1 ring-amber-200 shadow-md sm:col-span-2 lg:col-span-2">
              <img src={cpr.img} alt={cpr.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 via-amber-800/40 to-amber-600/30" />
              <div className="relative grid gap-4 p-6 sm:grid-cols-2 sm:p-10 text-white">
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">Certification</span>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{cpr.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/90">{cpr.text}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-800 shadow">Fee {cpr.fee}</span>
                    <Link to="/cpr" className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline">
                      Register <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:block" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========= COUNTIES ========= */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-extrabold tracking-tight">Counties We Serve</h3>
            <div role="group" aria-label="Select a county" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {counties.map((c) => {
                const active = activeCounty === c.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setActiveCounty(c.label)}
                    aria-pressed={active}
                    className={[
                      "group flex items-center justify-center gap-2 rounded-2xl px-6 py-5",
                      "text-base font-semibold shadow-sm ring-1 transition-all focus:outline-none focus-visible:ring-2",
                      "border",
                      active
                        ? "bg-amber-600 text-white border-amber-600 ring-amber-600"
                        : "bg-amber-50/70 text-neutral-900 border-amber-100 ring-amber-100 hover:bg-amber-50 hover:shadow-md",
                    ].join(" ")}
                  >
                    <MapPin className={`h-4 w-4 ${active ? "text-white" : "text-amber-700"}`} />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========= WHAT TO EXPECT ========= */}
      <section id="what-to-expect" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">What to Expect</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <ClipboardList className="h-5 w-5 text-amber-700" />
                </span>
                <h3 className="text-lg font-semibold">When starting your care with Menorah</h3>
              </div>
              <ul className="mt-4 space-y-3 text-neutral-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-amber-700" /> Guidance through client intake</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-amber-700" /> Services based on your needs</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-amber-700" /> Coordination with providers</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-amber-700" /> Ongoing support & communication</li>
              </ul>
              <Link to="/referral" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2 font-semibold text-white shadow hover:bg-amber-700">
                Start Referral <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <ClipboardList className="h-5 w-5 text-amber-700" />
                </span>
                <h3 className="text-lg font-semibold">What happens next</h3>
              </div>
              <ol className="mt-4 list-inside list-decimal space-y-3 text-neutral-700">
                <li>We review your information promptly</li>
                <li>We contact you to discuss needs and eligibility</li>
                <li>We schedule an in-home assessment if appropriate</li>
                <li>We craft a personalised care plan and begin services</li>
              </ol>
              <div className="mt-5 text-sm text-neutral-600">
                Prefer to talk? <a href="tel:+16147720563" className="font-semibold text-amber-700 hover:underline">(614) 772-0563</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section id="cta" className="relative py-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ctaBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <p className="text-sm font-semibold tracking-wide text-amber-700">📬 General Inquiries</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  We’re here to help—because care begins with connection.
                </h2>
                <p className="mt-3 max-w-2xl text-neutral-700">
                  Whether you’re seeking info about services, have eligibility questions, or simply want to connect,
                  our team responds promptly and respectfully.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/referral" className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow hover:bg-amber-700">
                    Start Referral <ArrowRight className="h-4 w-4" />
                  </Link>
                 <Link to="/inquiries" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 hover:border-neutral-400">
                    Send an Inquiry <ArrowRight className="h-4 w-4" />
                </Link>
                </div>
                <div className="mt-4 text-sm text-neutral-700">
                  Prefer to talk? <a href="tel:+16147720563" className="font-semibold text-amber-700 hover:underline">(614) 772-0563</a> ·
                  Email: <a href="mailto:menorahhealth@gmail.com" className="font-semibold text-amber-700 hover:underline">menorahhealth@gmail.com</a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">Referral & Intake</h3>
                  <p className="mt-1 text-sm text-neutral-600">Quick form; coordinators follow up to begin intake.</p>
                  <ul className="mt-3 list-inside list-disc text-sm text-neutral-700">
                    <li>Client & Referrer details</li>
                    <li>Service needs & schedule</li>
                    <li>Insurance info & consent</li>
                  </ul>
                  <Link to="/referral" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline">
                    Go to Referral & Intake <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <h3 className="font-semibold">General Inquiry</h3>
                  <p className="mt-1 text-sm text-neutral-600">We typically respond within 1–2 business days.</p>
                  <ul className="mt-3 list-inside list-disc text-sm text-neutral-700">
                    <li>Contact & topic</li>
                    <li>Message & attachments</li>
                    <li>Consent acknowledgment</li>
                  </ul>
                  <a href="#inquiries" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:underline">
                    Go to General Inquiries <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              Submitting a form does not guarantee service. A care coordinator will follow up to discuss eligibility, needs, and next steps.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
