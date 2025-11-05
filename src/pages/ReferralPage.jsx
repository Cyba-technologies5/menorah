// src/pages/ReferralIntake.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, ClipboardList, CheckCircle2,
  Phone, Mail, Calendar, Upload
} from "lucide-react";

export default function ReferralIntake() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Required fields (basic client-side validation)
    const requiredFields = [
      "clientFirstName",
      "clientLastName",
      "dob",
      "address",
      "preferredContact", // radio
    ];
    const newErrors = {};
    requiredFields.forEach((name) => {
      const value = fd.get(name);
      if (!value) newErrors[name] = "Required";
    });

    // at least one contact method must be available: email or phone (for follow-up)
    const hasEmailOrPhone = fd.get("email") || fd.get("phone");
    if (!hasEmailOrPhone) {
      newErrors.contactAny = "Provide an email or phone number.";
    }

    // Consent checkboxes must be checked
    if (!fd.get("consentShare") || !fd.get("consentUnderstand")) {
      newErrors.consent = "You must accept the consent statements.";
    }

    // If errors, show & stop
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // You can POST to your backend here.
    // For demo, just simulate success:
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <ClipboardList className="h-5 w-5 text-amber-700" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">Referral submitted</h1>
            </div>
            <p className="mt-3 text-neutral-700">
              Thank you. A care coordinator will review the information and follow up to begin the intake process.
              If you need to reach us urgently, call <a href="tel:+16147720563" className="font-semibold text-amber-700 hover:underline">(614) 772-0563</a>.
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
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
          <div className="text-sm font-semibold text-neutral-600">Referral & Intake</div>
        </div>
      </header>

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
              Please complete the form to refer a client for home health services.
              Our team will review and follow up promptly to begin the intake process.
            </p>
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
                <label className="text-sm font-medium">First Name</label>
                <input
                  name="clientFirstName"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.clientFirstName ? "border-red-500" : "border-neutral-300"}`}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  name="clientLastName"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.clientLastName ? "border-red-500" : "border-neutral-300"}`}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    name="dob"
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${errors.dob ? "border-red-500" : "border-neutral-300"}`}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <input name="gender" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Primary Language</label>
                <input name="language" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  name="address"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.address ? "border-red-500" : "border-neutral-300"}`}
                />
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
              <div className="sm:col-span-2">
                <span className="text-sm font-medium">Preferred Contact Method</span>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  {["Phone", "Email", "Text"].map((m) => (
                    <label key={m} className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5">
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

          {/* Referring Party Information */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">🧑‍⚕️ Referring Party Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name of Referrer</label>
                <input name="referrerName" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Relationship to Client</label>
                <select name="relationship" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm">
                  {["Family Member","Physician","Self - Client","Case Manager","Other"].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Organization (if applicable)</label>
                <input name="organization" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input name="referrerPhone" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" name="referrerEmail" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
            </div>
          </section>

          {/* Service Needs */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">📋 Service Needs</h2>
            <p className="mt-1 text-sm text-neutral-600">Select all that apply:</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Skilled Nursing",
                "Participant-Directed HPC (Homemaker/Personal Care)",
                "Aided Living & Personal Care Services",
                "Respite Care",
                "Home Health Aide",
              ].map((label) => (
                <label key={label} className="inline-flex items-center gap-3 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm">
                  <input type="checkbox" name="services" value={label} />
                  {label}
                </label>
              ))}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Other</label>
                <input name="serviceOther" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" placeholder="Specify other services" />
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              <div>
                <label className="text-sm font-medium">Primary Diagnosis / Reason for Referral</label>
                <textarea name="diagnosis" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Special Instructions or Notes</label>
                <textarea name="notes" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" rows={3} />
              </div>
            </div>
          </section>

          {/* Availability & Scheduling */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">🕒 Availability & Scheduling</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Preferred Start Date</label>
                <input type="date" name="startDate" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <span className="text-sm font-medium">Best Days/Times for Visits</span>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {["Weekdays","Weekends","Mornings","Afternoons","Evenings"].map((opt) => (
                    <label key={opt} className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5">
                      <input type="checkbox" name="visitTimes" value={opt} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Insurance & Billing */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">💳 Insurance & Billing</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Insurance Provider</label>
                <input name="insuranceProvider" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Policy Number</label>
                <input name="policyNumber" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Medicare / Medicaid Number (if applicable)</label>
                <input name="medNumber" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <span className="text-sm font-medium">Private Pay Option</span>
                <div className="mt-2 flex gap-3 text-sm">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5">
                      <input type="radio" name="privatePay" value={v} />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Upload Supporting Documents */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">📎 Upload Supporting Documents</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Accepted formats: PDF, DOCX, JPG, PNG (Max size: 10MB)
            </p>
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
          </section>

          {/* Consent & Submission */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">✅ Consent & Submission</h2>
            <div className="mt-3 space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentShare" />
                <span>I confirm that I have permission to share this information for the purpose of initiating care.</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentUnderstand" />
                <span>I understand that this form does not guarantee service and that a care coordinator will follow up.</span>
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
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-amber-700"
              >
                Submit Referral <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* small print */}
            <p className="mt-4 text-xs text-neutral-500">
              Submitting this form authorizes Menorah Health LLP to review your information for intake and eligibility.
            </p>
          </section>
        </form>
      </main>
    </div>
  );
}
