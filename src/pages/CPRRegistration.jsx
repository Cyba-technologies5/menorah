// src/pages/CPRRegistration.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Phone, Mail, Building2, ShieldCheck, CheckCircle2
} from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const FEE = 70; // USD — keep in sync with site copy

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const FLOW_URL = import.meta.env.VITE_FLOW_URL;           // Power Automate “When an HTTP request is received”
const FLOW_SECRET = import.meta.env.VITE_FLOW_SECRET || ""; // optional shared secret

export default function CPRRegistration() {
  const [submitted, setSubmitted] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState(null);
  const [showPayPal, setShowPayPal] = React.useState(false);
  const paypalRef = React.useRef(null);

  function validate(fd) {
    const e = {};
    if (!fd.get("firstName")) e.firstName = "Required";
    if (!fd.get("lastName")) e.lastName = "Required";
    if (!(fd.get("email") || fd.get("phone"))) e.contactAny = "Provide an email or phone number.";
    if (!fd.get("date")) e.date = "Required";
    if (!fd.get("timeSlot")) e.timeSlot = "Required";
    if (!fd.get("agreeTerms") || !fd.get("agreeCancel")) e.consent = "You must accept the terms and the cancellation policy.";
    return e;
  }

  async function handleContinueToPay(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget.form || e.currentTarget);
    const newErrors = validate(fd);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Cache plain object for PayPal/Flow
    const data = Object.fromEntries(fd.entries());
    setFormData({
      firstName: data.firstName?.trim() || "",
      lastName: data.lastName?.trim() || "",
      email: data.email?.trim() || "",
      phone: data.phone?.trim() || "",
      organization: data.organization?.trim() || "",
      date: data.date,
      timeSlot: data.timeSlot,
    });

    setShowPayPal(true);
    // Smooth scroll to PayPal buttons
    setTimeout(() => paypalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  // Success page
  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950">
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
                Registration received — check your email
              </h1>
            </div>
            <p className="mt-3 text-neutral-700">
              Thank you! A confirmation email has been sent with your session details.
              {orderId && <> Your PayPal receipt / Order ID is <span className="font-semibold">{orderId}</span>.</>}
              If you don’t see the message, check spam or contact{" "}
              <a href="mailto:menorahhealth@gmail.com" className="font-semibold text-amber-700 hover:underline">
                menorahhealth@gmail.com
              </a>.
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
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950">
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
                  Learn adult/child/infant CPR, AED usage, choking response, basic first aid, and emergency scene management.
                  Classes are held Friday or Saturday mornings. Certification provided upon completion.
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
        <form className="grid gap-8">
          {/* Participant Info */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">👤 Participant Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input name="firstName" className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.firstName ? "border-red-500" : "border-neutral-300"}`} />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input name="lastName" className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.lastName ? "border-red-500" : "border-neutral-300"}`} />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative mt-1">
                  <input type="email" name="email" className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" placeholder="name@email.com" />
                  <Mail className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative mt-1">
                  <input name="phone" className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" placeholder="(###) ###-####" />
                  <Phone className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Organization (optional)</label>
                <div className="relative mt-1">
                  <input name="organization" className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm" placeholder="Organization name" />
                  <Building2 className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500" />
                </div>
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
                <input type="date" name="date" className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.date ? "border-red-500" : "border-neutral-300"}`} />
                <p className="mt-1 text-xs text-neutral-500">Fridays or Saturdays (morning)</p>
              </div>
              <div>
                <label className="text-sm font-medium">Time Slot</label>
                <select name="timeSlot" className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${errors.timeSlot ? "border-red-500" : "border-neutral-300"}`}>
                  <option value="">Select a time…</option>
                  <option value="10-12">10:00 AM – 12:00 PM</option>
                  <option value="1-3">1:00 PM – 3:00 PM</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment (PayPal only) */}
        
<section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ring-black/5" ref={paypalRef}>
  <h2 className="text-lg font-semibold">💳 Payment</h2>
  <p className="mt-1 text-sm text-neutral-600">
    Payments are processed securely by PayPal. No card information touches our website.
  </p>

  {/* Helpful warning if the client ID is missing */}
  {!PAYPAL_CLIENT_ID && (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      PayPal is not configured. Add <code>VITE_PAYPAL_CLIENT_ID</code> to your <code>.env</code> and restart
      the dev server.
    </div>
  )}

  {!showPayPal && (
    <div className="mt-6 flex items-center justify-end">
      <button
        onClick={handleContinueToPay}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-amber-700"
      >
        Continue to Pay with PayPal <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )}

  {showPayPal && PAYPAL_CLIENT_ID && (
    <div className="mt-6">
      <PayPalButtons
        style={{ layout: "vertical" }}
        // optional: validate again before showing the PayPal overlay
        onClick={(_, actions) => {
          if (!formData?.firstName || !formData?.lastName || !(formData?.email || formData?.phone) || !formData?.date || !formData?.timeSlot) {
            alert("Please complete all required fields first.");
            return actions.reject();
          }
          return actions.resolve();
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: String(FEE) },
                description: "CPR Training Registration",
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          const oid = details?.id || data?.orderID || "";
          setOrderId(oid);

          // Send to your Excel Power Automate Flow (if configured)
          if (FLOW_URL) {
            try {
              await fetch(FLOW_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(FLOW_SECRET ? { "x-api-key": FLOW_SECRET } : {}),
                },
                body: JSON.stringify({
                  firstName: formData?.firstName || "",
                  lastName: formData?.lastName || "",
                  email: formData?.email || "",
                  phone: formData?.phone || "",
                  organization: formData?.organization || "",
                  date: formData?.date || "",
                  timeSlot: formData?.timeSlot || "",
                  amount: FEE,
                  orderId: oid,
                }),
              });
            } catch (err) {
              console.error("Flow error", err);
              // You can still show success; consider notifying admin
            }
          }

          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onError={(err) => {
          console.error(err);
          alert("Payment failed. Please try again.");
        }}
        onCancel={() => {
          alert("Payment was cancelled.");
        }}
      />
      <p className="mt-3 text-xs text-neutral-500">
        If nothing appears, disable ad-blockers and allow third-party cookies for <strong>paypal.com</strong>.
      </p>
    </div>
  )}
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
          </section>
        </form>
      </main>
    </div>
  );
}
