// src/pages/CPRRegistration.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const FEE = 70; // USD — keep in sync with site copy

// ✅ Formspree endpoint for CPR Registration (request → email conversation continues)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkoglvaq";

export default function CPRRegistration() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  function validate(fd) {
    const e = {};
    if (!fd.get("firstName")) e.firstName = "Required";
    if (!fd.get("lastName")) e.lastName = "Required";
    if (!(fd.get("email") || fd.get("phone"))) e.contactAny = "Provide an email or phone number.";
    if (!fd.get("date")) e.date = "Required";
    if (!fd.get("timeSlot")) e.timeSlot = "Required";
    if (!fd.get("agreeTerms") || !fd.get("agreeCancel"))
      e.consent = "You must accept the terms and the cancellation policy.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const fd = new FormData(e.currentTarget);
    const newErrors = validate(fd);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Add helpful metadata for Formspree inbox
    fd.append("_subject", "MenorahHealth.org — CPR Registration Request");
    fd.append(
      "paymentNote",
      `Payment is completed via email. Fee: $${FEE}. Please send preferred payment option (PayPal/Card/Zelle/etc.)`
    );

    try {
      setSubmitting(true);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed. Please try again.");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Success page
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
            <div className="text-sm font-semibold text-neutral-600">CPR Registration</div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <CheckCircle2 className="h-5 w-5 text-amber-700" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Registration request received — check your email
              </h1>
            </div>

            <p className="mt-3 text-neutral-700">
              Thank you! We’ve received your request and will email you shortly to confirm your session and send a
              secure payment option. Your spot is confirmed once payment is received.
            </p>

            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 text-neutral-600" />
                <div>
                  <p className="font-semibold">Next steps</p>
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    <li>We will reply by email with available session confirmation.</li>
                    <li>We’ll include a payment link/options (Fee: ${FEE}).</li>
                    <li>After payment, you’ll receive your final booking confirmation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-4 text-neutral-700">
              If you don’t see the message, check spam or contact{" "}
              <a
                href="mailto:menorahhealth@gmail.com"
                className="font-semibold text-amber-700 hover:underline"
              >
                menorahhealth@gmail.com
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
          <div className="text-sm font-semibold text-neutral-600">CPR Registration</div>
        </div>
      </header>

      {/* Hero / intro */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  CPR & Emergency Training
                </h1>
                <p className="mt-3 text-neutral-700">
                  Learn adult/child/infant CPR, AED usage, choking response, basic first aid, and emergency scene
                  management. Classes are held Friday or Saturday mornings. Certification provided upon completion.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-700">
                  <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1">
                    <Calendar className="h-4 w-4 text-amber-700" /> Fridays / Saturdays (AM)
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1">
                    <Clock className="h-4 w-4 text-amber-700" /> 10:00–12:00 or 1:00–3:00
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1">
                    <ShieldCheck className="h-4 w-4 text-amber-700" /> Employer-accepted certification
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                  <p className="font-semibold">Payment process</p>
                  <p className="mt-1">
                    To keep things simple, payment is completed by email after you submit this form. We’ll reply with a
                    secure payment option and confirm your session once payment is received.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6">
                <p className="text-sm text-neutral-700">Training Fee</p>
                <p className="text-3xl font-extrabold tracking-tight text-amber-700">${FEE}</p>
                <p className="mt-1 text-xs text-neutral-500">per participant</p>
                <div className="mt-4 text-sm text-neutral-600">
                  Hands-on practice included. Certification issued after successful completion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="grid gap-8">
          {/* Participant Info */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">👤 Participant Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.firstName ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.lastName ? "border-red-500" : "border-neutral-300"
                  }`}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="name@email.com"
                  />
                  <Mail className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative mt-1">
                  <input
                    name="phone"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="(###) ###-####"
                  />
                  <Phone className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Organization (optional)</label>
                <div className="relative mt-1">
                  <input
                    name="organization"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="Organization name"
                  />
                  <Building2 className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>

              {/* Optional: note/invoice request */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Notes (optional)</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Any details we should know? (e.g., invoice needed, employer name, preferred payment method, accessibility needs)"
                />
              </div>
            </div>

            {errors.contactAny && <p className="mt-2 text-xs text-red-600">{errors.contactAny}</p>}
          </section>

          {/* Session */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">📅 Select Training Session</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.date ? "border-red-500" : "border-neutral-300"
                  }`}
                />
                <p className="mt-1 text-xs text-neutral-500">Fridays or Saturdays (morning)</p>
              </div>
              <div>
                <label className="text-sm font-medium">Time Slot</label>
                <select
                  name="timeSlot"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                    errors.timeSlot ? "border-red-500" : "border-neutral-300"
                  }`}
                >
                  <option value="">Select a time…</option>
                  <option value="10-12">10:00 AM – 12:00 PM</option>
                  <option value="1-3">1:00 PM – 3:00 PM</option>
                </select>
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">✅ Final Steps</h2>
            <div className="mt-3 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="agreeTerms" />
                <span>I agree to the terms and conditions.</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" name="agreeCancel" />
                <span>I understand that cancellations must be made at least 48 hours in advance.</span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
            </div>

            {submitError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2 font-semibold hover:border-neutral-400"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Registration Request"}{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-neutral-500">
              After submission, we’ll email you to confirm the session and send a secure payment option. Fee: ${FEE}.
            </p>
          </section>
        </form>
      </main>
    </div>
  );
}
