// src/pages/ReferralIntake.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const FORMSPREE_REFERRAL_ENDPOINT = "https://formspree.io/f/mvzgjbnv ";

export default function ReferralIntake() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const fd = new FormData(e.currentTarget);
    const newErrors = {};

    // ✅ Required fields (Client)
    const requiredClient = [
      "clientFirstName",
      "clientLastName",
      "dob",
      "address",
      "preferredContact",
    ];
    requiredClient.forEach((name) => {
      const value = (fd.get(name) || "").toString().trim();
      if (!value) newErrors[name] = "Required";
    });

    // ✅ at least one client contact method (email or phone)
    const email = (fd.get("email") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    if (!email && !phone) newErrors.contactAny = "Provide an email or phone number.";

    // validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // ✅ Referring party REQUIRED
    const referrerName = (fd.get("referrerName") || "").toString().trim();
    const relationship = (fd.get("relationship") || "").toString().trim();
    const referrerPhone = (fd.get("referrerPhone") || "").toString().trim();
    const referrerEmail = (fd.get("referrerEmail") || "").toString().trim();

    if (!referrerName) newErrors.referrerName = "Required";
    if (!relationship) newErrors.relationship = "Required";

    // require at least one referrer contact method
    if (!referrerPhone && !referrerEmail) {
      newErrors.referrerContactAny = "Provide the referrer’s phone or email.";
    }

    // validate referrer email if provided
    if (referrerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referrerEmail)) {
      newErrors.referrerEmail = "Enter a valid email address.";
    }

    // ✅ Service Needs REQUIRED (at least one checkbox OR Other)
    const services = fd
      .getAll("services")
      .map((v) => v.toString().trim())
      .filter(Boolean);
    const serviceOther = (fd.get("serviceOther") || "").toString().trim();
    if (services.length === 0 && !serviceOther) {
      newErrors.services = "Select at least one service (or fill in Other).";
    }

    // ✅ Availability REQUIRED
    const startDate = (fd.get("startDate") || "").toString().trim();
    const visitTimes = fd
      .getAll("visitTimes")
      .map((v) => v.toString().trim())
      .filter(Boolean);
    if (!startDate) newErrors.startDate = "Required";
    if (visitTimes.length === 0) newErrors.visitTimes = "Select at least one visit time.";

    // ✅ Consent REQUIRED
    if (!fd.get("consentShare") || !fd.get("consentUnderstand")) {
      newErrors.consent = "You must accept the consent statements.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      // Helpful subject + reply-to in Formspree inbox
      const first = (fd.get("clientFirstName") || "").toString().trim();
      const last = (fd.get("clientLastName") || "").toString().trim();

      fd.append("_subject", `MenorahHealth.org — Referral & Intake (${first} ${last})`);
      if (email) fd.append("_replyto", email);

      const res = await fetch(FORMSPREE_REFERRAL_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || "Network error");
      }

      // ✅ success: show "Referral submitted" page only
      setSubmitted(true);
      setErrors({});
      e.currentTarget.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
          <div className="text-sm font-semibold text-neutral-600">Referral & Intake</div>
        </div>
      </header>

      {submitted ? (
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <ClipboardList className="h-5 w-5 text-amber-700" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">Referral submitted</h1>
            </div>

            <p className="mt-3 text-neutral-700">
              Thank you. A care coordinator will review the information and follow up to begin the
              intake process. If you need to reach us urgently, call{" "}
              <a href="tel:+16148311177" className="font-semibold text-amber-700 hover:underline">
                +1 (614) 831-1177
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
      ) : (
        <>
          {/* Hero banner */}
          <section className="relative">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <ClipboardList className="h-5 w-5 text-amber-700" />
                  </span>
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Referral & Intake Form
                  </h1>
                </div>

                <p className="mt-3 max-w-3xl text-neutral-700">
                  Please complete the form to refer a client for home health services. Our team will
                  review and follow up promptly to begin the intake process.
                </p>

                {formError && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm text-red-800 ring-1 ring-red-200">
                    <AlertCircle className="h-4 w-4" />
                    {formError}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Form */}
          <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="grid gap-8">
              {/* Client Information */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold">👤 Client Information</h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">First Name *</label>
                    <input
                      name="clientFirstName"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.clientFirstName ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.clientFirstName && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Last Name *</label>
                    <input
                      name="clientLastName"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.clientLastName ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.clientLastName && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Date of Birth *</label>
                    <div className="relative mt-1">
                      <input
                        type="date"
                        name="dob"
                        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                          errors.dob ? "border-red-500" : "border-neutral-300"
                        }`}
                      />
                      <Calendar className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                    </div>
                    {errors.dob && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <input
                      name="gender"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Primary Language</label>
                    <input
                      name="language"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">Address *</label>
                    <input
                      name="address"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.address ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative mt-1">
                      <input
                        name="phone"
                        className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                        placeholder="(###) ###-####"
                      />
                      <Phone className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative mt-1">
                      <input
                        type="email"
                        name="email"
                        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                          errors.email ? "border-red-500" : "border-neutral-300"
                        }`}
                        placeholder="name@email.com"
                      />
                      <Mail className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-sm font-medium">Preferred Contact Method *</span>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      {["Phone", "Email", "Text"].map((m) => (
                        <label
                          key={m}
                          className={`inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 ${
                            errors.preferredContact ? "border-red-500" : "border-neutral-300"
                          }`}
                        >
                          <input type="radio" name="preferredContact" value={m.toLowerCase()} />
                          {m}
                        </label>
                      ))}
                    </div>

                    {errors.preferredContact && (
                      <p className="mt-1 text-xs text-red-600">Please choose a contact method.</p>
                    )}
                    {errors.contactAny && (
                      <p className="mt-1 text-xs text-red-600">{errors.contactAny}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Referring Party Information (REQUIRED) */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold">🧑‍⚕️ Referring Party Information </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Name of Referrer *</label>
                    <input
                      name="referrerName"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.referrerName ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.referrerName && (
                      <p className="mt-1 text-xs text-red-600">Required</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Relationship to Client *</label>
                    <select
                      name="relationship"
                      defaultValue=""
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.relationship ? "border-red-500" : "border-neutral-300"
                      }`}
                    >
                      <option value="" disabled>
                        Select relationship
                      </option>
                      {["Family Member", "Physician", "Self - Client", "Case Manager", "Other"].map(
                        (r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        )
                      )}
                    </select>
                    {errors.relationship && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Organization (if applicable)</label>
                    <input
                      name="organization"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Referrer Phone</label>
                    <input
                      name="referrerPhone"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Referrer Email</label>
                    <input
                      type="email"
                      name="referrerEmail"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.referrerEmail ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.referrerEmail && (
                      <p className="mt-1 text-xs text-red-600">{errors.referrerEmail}</p>
                    )}
                  </div>

                  {errors.referrerContactAny && (
                    <div className="sm:col-span-2">
                      <p className="mt-1 text-xs text-red-600">{errors.referrerContactAny}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Service Needs (REQUIRED) */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold">📋 Service Needs *</h2>
                <p className="mt-1 text-sm text-neutral-600">Select at least one:</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Skilled Nursing",
                    "Participant-Directed HPC (Homemaker/Personal Care)",
                    "Aided Living & Personal Care Services",
                    "Respite Care",
                    "Home Health Aide",
                  ].map((label) => (
                    <label
                      key={label}
                      className={`inline-flex items-center gap-3 rounded-xl border bg-white px-3 py-2 text-sm ${
                        errors.services ? "border-red-500" : "border-neutral-300"
                      }`}
                    >
                      <input type="checkbox" name="services" value={label} />
                      {label}
                    </label>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">Other</label>
                    <input
                      name="serviceOther"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.services ? "border-red-500" : "border-neutral-300"
                      }`}
                      placeholder="Specify other services"
                    />
                  </div>

                  {errors.services && (
                    <div className="sm:col-span-2">
                      <p className="mt-1 text-xs text-red-600">{errors.services}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Primary Diagnosis / Reason for Referral
                    </label>
                    <textarea
                      name="diagnosis"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Special Instructions or Notes</label>
                    <textarea
                      name="notes"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </section>

              {/* Availability & Scheduling (REQUIRED) */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold">🕒 Availability & Scheduling </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Preferred Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.startDate ? "border-red-500" : "border-neutral-300"
                      }`}
                    />
                    {errors.startDate && <p className="mt-1 text-xs text-red-600">Required</p>}
                  </div>

                  <div>
                    <span className="text-sm font-medium">Best Days/Times for Visits *</span>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      {["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"].map((opt) => (
                        <label
                          key={opt}
                          className={`inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 ${
                            errors.visitTimes ? "border-red-500" : "border-neutral-300"
                          }`}
                        >
                          <input type="checkbox" name="visitTimes" value={opt} />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.visitTimes && (
                      <p className="mt-1 text-xs text-red-600">{errors.visitTimes}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Consent & Submission */}
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-semibold">✅ Consent & Submission</h2>

                <div className="mt-3 space-y-3 text-sm">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" name="consentShare" />
                    <span>
                      I confirm that I have permission to share this information for the purpose of
                      initiating care.
                    </span>
                  </label>

                  <label className="flex items-start gap-2">
                    <input type="checkbox" name="consentUnderstand" />
                    <span>
                      I understand that this form does not guarantee service and that a care
                      coordinator will follow up.
                    </span>
                  </label>

                  {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2 font-semibold hover:border-neutral-400"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit Referral"}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Submitting this form authorizes Menorah Health LLP to review your information for
                  intake and eligibility.
                </p>
              </section>
            </form>
          </main>
        </>
      )}
    </div>
  );
}
