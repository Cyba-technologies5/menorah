// src/pages/Inquiries.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, Mail, Phone, MessageSquare } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrebwavj";

export default function Inquiries() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isSending, setIsSending] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const newErrors = {};

    // Required fields
    if (!fd.get("name")) newErrors.name = "Required";
    if (!fd.get("preferredContact")) newErrors.preferredContact = "Required";
    if (!fd.get("subject")) newErrors.subject = "Required";
    if (!fd.get("message")) newErrors.message = "Required";

    // Need *either* email or phone to contact back
    const hasEmailOrPhone = fd.get("email") || fd.get("phone");
    if (!hasEmailOrPhone) newErrors.contactAny = "Provide an email or phone number.";

    // Consent checks
    if (!fd.get("consentShare") || !fd.get("consentUnderstand")) {
      newErrors.consent = "You must accept the consent statements.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSending(true);

      // Optional: clearer email subject inside Formspree inbox/emails
      fd.append("_subject", "MenorahHealth.org — General Inquiry");

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Submission failed. Please try again.");

      setSubmitted(true);
      formEl.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err.message }));
    } finally {
      setIsSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="text-sm font-semibold text-neutral-600">General Inquiry</div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <MessageSquare className="h-5 w-5 text-amber-700" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Thank you — we’ve received your inquiry
              </h1>
            </div>
            <p className="mt-3 text-neutral-700">
              Our team aims to respond within 1–2 business days. If it’s urgent, call{" "}
              <a href="tel:+1 (614) 8311177" className="font-semibold text-amber-700 hover:underline">
                (614) 831-1177
              </a>
              .
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2 font-semibold hover:border-neutral-400"
              >
                Return Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="text-sm font-semibold text-neutral-600">General Inquiry</div>
        </div>
      </header>

      {/* Hero card */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <MessageSquare className="h-5 w-5 text-amber-700" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">General Inquiries</h1>
            </div>
            <p className="mt-3 max-w-3xl text-neutral-700">
              We’re here to help—because care begins with connection. Whether you’re a family member seeking services,
              a healthcare provider with questions, or a community partner exploring collaboration, please submit your
              inquiry below. We aim to respond within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="grid gap-8">
          {/* Formspree honeypot (spam trap) */}
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Contact */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">📝 Inquiry Form</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.name ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="name@email.com"
                  />
                  <Mail className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative mt-1">
                  <input
                    id="phone"
                    name="phone"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="(###) ###-####"
                  />
                  <Phone className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="text-sm font-medium">Preferred Contact Method</span>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  {["Phone", "Email", "Text"].map((m) => (
                    <label
                      key={m}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5"
                    >
                      <input type="radio" name="preferredContact" value={m.toLowerCase()} />
                      {m}
                    </label>
                  ))}
                </div>
                {errors.preferredContact && (
                  <p className="mt-1 text-xs text-red-600">Please choose a contact method.</p>
                )}
                {errors.contactAny && <p className="mt-1 text-xs text-red-600">{errors.contactAny}</p>}
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="subject">
                  Subject of Inquiry
                </label>
                <select
                  id="subject"
                  name="subject"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.subject ? "border-red-500" : "border-neutral-300"
                  }`}
                >
                  <option value="">Select a subject…</option>
                  {["General Question", "Service Request", "Employment", "Staff CPR Training", "Other"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.message ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Uploads */}
          {/* <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">📎 Upload Supporting Documents</h2>
            <p className="mt-1 text-sm text-neutral-600">Accepted: PDF, DOCX, JPG, PNG (Max 10MB)</p>
            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold hover:border-neutral-400">
              <Upload className="h-4 w-4" />
              Upload Files
              <input
                type="file"
                name="attachments"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
              />
            </label>
            <p className="mt-2 text-xs text-neutral-500">
              
            </p>
          </section> */}

          {/* Consent + Submit */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">✅ Consent</h2>
            <div className="mt-3 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentShare" />
                <span>I confirm that I have permission to share this information and documents.</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentUnderstand" />
                <span>I understand that this form does not guarantee service and that a care coordinator will follow up.</span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2 font-semibold hover:border-neutral-400"
              >
                Cancel
              </Link>

              <div className="flex flex-col items-end">
                <button
                  type="submit"
                  disabled={isSending}
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 font-semibold text-white shadow ${
                    isSending ? "bg-amber-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {isSending ? "Sending..." : "Submit Inquiry"} <ArrowRight className="h-4 w-4" />
                </button>

                {errors.server && <p className="mt-2 text-sm text-red-600">{errors.server}</p>}
              </div>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
