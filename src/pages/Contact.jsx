// src/pages/Contact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  FileUp,
  User,
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Reuse your brand hero; swap anytime
import heroImage from "../assets/about/heroImage.png";

const HOURS = [
  { day: "Monday–Friday", time: "08:30 – 18:00" },
  { day: "Saturday", time: "09:00 – 13:00" },
  { day: "Sunday", time: "Closed" },
];

const COUNTIES = ["Franklin County", "Delaware County", "Other (by need)"];
const TOPICS = [
  "General Inquiry",
  "Referral / Intake",
  "Records Request",
  "Employment",
  "Billing / Admin",
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
      name: "Contact",
      item:
        typeof window !== "undefined"
          ? `${window.location.origin}/contact`
          : "https://example.com/contact",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact • Menorah Health LLP",
  description:
    "Contact Menorah Health LLP: phone, email, and secure inquiry form for referrals, records, and support.",
  isPartOf: { "@type": "WebSite", name: "Menorah Health LLP" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Menorah Health LLP",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Franklin County, OH" },
    { "@type": "AdministrativeArea", name: "Delaware County, OH" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+1-614-772-0563",
      email: "menorahhealth@gmail.com",
      availableLanguage: ["en"],
    },
  ],
};

export default function Contact() {
  const title = "Contact • Menorah Health LLP";
  const description =
    "Reach Menorah Health LLP for referrals, care questions, records requests, and general inquiries. Call, email, or send a secure message.";
  const canonical =
    typeof window !== "undefined"
      ? `${window.location.origin}/contact`
      : "https://example.com/contact";
  const ogImage =
    typeof window !== "undefined"
      ? `${window.location.origin}${heroImage.startsWith("/") ? "" : "/"}${heroImage}`
      : `https://example.com${heroImage.startsWith("/") ? "" : "/"}${heroImage}`;

  // ---- Simple form state + validation (no external deps) ----
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    county: "",
    topic: "",
    message: "",
    consent: false,
    attachments: [],
    honey: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Please enter a brief message.";
    if (!form.consent) e.consent = "Please confirm you agree to be contacted.";
    return e;
    // Optional: add stricter phone checks if you like
  };

  const onChange = (ev) => {
    const { name, value, type, checked, files } = ev.target;
    if (type === "checkbox") setForm((f) => ({ ...f, [name]: checked }));
    else if (type === "file")
      setForm((f) => ({ ...f, [name]: files ? Array.from(files) : [] }));
    else setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (form.honey) return; // bot
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    setStatus(null);

    try {
      // ======= HOW TO WIRE BACKEND =======
      // 1) Formspree: set VITE_CONTACT_ENDPOINT to your Formspree endpoint (e.g., https://formspree.io/f/xxxx)
      // 2) Serverless: create /api/contact and handle multipart/form-data
      const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";
      if (!ENDPOINT) {
        // Fallback: open mail client with prefilled subject/body
        const subject = encodeURIComponent(`[${form.topic || "General"}] ${form.fullName}`);
        const body = encodeURIComponent(
          `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nCounty: ${form.county}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:menorahhealth@gmail.com?subject=${subject}&body=${body}`;
        setSubmitting(false);
        setStatus("success");
        return;
      }

      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "attachments") v.forEach((file) => data.append("attachments", file));
        else if (typeof v === "boolean") data.append(k, v ? "true" : "false");
        else data.append(k, v ?? "");
      });

      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        county: "",
        topic: "",
        message: "",
        consent: false,
        attachments: [],
        honey: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main id="contact" className="bg-white text-neutral-900">
      {/* SEO */}
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        keywords={[
          "contact home care Ohio",
          "DODD home care Columbus",
          "Medicaid waiver services Franklin County",
          "HPC services Ohio",
          "respite care for adults with disabilities",
          "CPR training near me",
        ]}
        jsonLd={[breadcrumbJsonLd, webPageJsonLd, orgJsonLd]}
      />

      {/* HERO */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Care coordinator speaking with a family at home"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-[320px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="mx-auto flex min-h-[320px] max-w-7xl items-end px-4 pb-10 sm:min-h-[420px] sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-wider text-amber-700">CONTACT</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              We’re here to help
            </h1>
            <p className="mt-3 max-w-3xl text-neutral-700">
              Referrals, records, questions, or next steps—reach us by phone, email, or send a secure message below.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-5 sm:px-6 lg:px-8">
          {/* Left: cards */}
          <div className="space-y-6 md:col-span-2">
            {/* Phone/Email */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-extrabold tracking-tight">Talk to us</h2>
              <div className="mt-4 space-y-3 text-sm text-neutral-800">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-700" /> (614) 772-0563
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-700" />{" "}
                  <a
                    href="mailto:menorahhealth@gmail.com"
                    className="font-semibold text-amber-700 hover:underline"
                  >
                    menorahhealth@gmail.com
                  </a>
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/referral"
                  className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  Start Referral
                </Link>
                <Link
                  to="/inquiries"
                  className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
                >
                  General Inquiry
                </Link>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-extrabold tracking-tight">Office hours</h2>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {HOURS.map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-700" /> {day}
                    </span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service area */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-extrabold tracking-tight">Service area</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {COUNTIES.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm"
                  >
                    <Building2 className="h-4 w-4 text-amber-700" />
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/5">
                {/* Replace with your exact address embed when ready */}
                <iframe
                  title="Service area map"
                  src="https://www.google.com/maps?q=Franklin%20County%20OH&output=embed"
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                We serve all cities in Franklin & Delaware Counties, and other counties by need.
              </p>
            </div>

            {/* Non-discrimination */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Statement on the Provision of Service
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Menorah Health LLP does not discriminate based on race, color, religion, national origin,
                sex, disability, or age. We welcome all people and provide services based on capability and need.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-extrabold tracking-tight">Send a secure message</h2>
              <p className="mt-2 text-sm text-neutral-600">
                We typically respond within 1–2 business days.
              </p>

              {/* honeypot */}
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full name *
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-neutral-300 bg-white px-3">
                    <User className="h-4 w-4 text-neutral-500" />
                    <input
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      className="h-10 w-full rounded-xl px-3 outline-none"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-amber-700">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-neutral-300 bg-white px-3">
                    <Mail className="h-4 w-4 text-neutral-500" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="h-10 w-full rounded-xl px-3 outline-none"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-amber-700">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-neutral-300 bg-white px-3">
                    <Phone className="h-4 w-4 text-neutral-500" />
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="h-10 w-full rounded-xl px-3 outline-none"
                      placeholder="(614) 555-1234"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="county" className="text-sm font-medium">
                    County
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-neutral-300 bg-white px-3">
                    <MapPin className="h-4 w-4 text-neutral-500" />
                    <select
                      id="county"
                      name="county"
                      value={form.county}
                      onChange={onChange}
                      className="h-10 w-full rounded-xl px-3 outline-none"
                    >
                      <option value="">Select county (optional)</option>
                      {COUNTIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="text-sm font-medium">
                    Topic
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-neutral-300 bg-white px-3">
                    <MessageSquare className="h-4 w-4 text-neutral-500" />
                    <select
                      id="topic"
                      name="topic"
                      value={form.topic}
                      onChange={onChange}
                      className="h-10 w-full rounded-xl px-3 outline-none"
                    >
                      <option value="">Choose a topic</option>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    className="mt-1 h-32 w-full rounded-2xl border border-neutral-300 p-3 outline-none"
                    placeholder="Tell us a bit about how we can help..."
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-amber-700">{errors.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Attachments (optional)</label>
                  <div className="mt-1 flex items-center gap-3 rounded-xl border border-neutral-300 bg-white px-3 py-2">
                    <FileUp className="h-4 w-4 text-neutral-500" />
                    <input
                      type="file"
                      name="attachments"
                      onChange={onChange}
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Accepted: PDF, JPG, PNG (max size depends on your backend).
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="inline-flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={onChange}
                      className="mt-0.5"
                      required
                    />
                    <span>
                      I consent to be contacted about my inquiry and confirm I’m not sharing sensitive
                      medical details here. (For PHI, we’ll use a secure channel.)
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-amber-700">{errors.consent}</p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending…" : "Send Message"}
                </button>
                <Link
                  to="/about"
                  className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
                >
                  Learn About Us
                </Link>
              </div>

              {/* Status */}
              {status === "success" && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm text-green-800 ring-1 ring-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  Thanks—your message has been sent.
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm text-red-800 ring-1 ring-red-200">
                  <AlertCircle className="h-4 w-4" />
                  Sorry, something went wrong. Please call or email us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              to="/referral"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">Referral & Intake</h4>
              <p className="mt-1 text-sm text-neutral-700">
                Begin services—our care team will follow up.
              </p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
            <Link
              to="/services"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">Services</h4>
              <p className="mt-1 text-sm text-neutral-700">
                Skilled nursing, HPC, personal care, respite, CPR.
              </p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
            <Link
              to="/patient-portal"
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h4 className="font-semibold">Patient Portal</h4>
              <p className="mt-1 text-sm text-neutral-700">Coming soon—secure access to your care.</p>
              <span className="mt-3 inline-block h-0.5 w-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-16" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
