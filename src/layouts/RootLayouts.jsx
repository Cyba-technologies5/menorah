// src/layouts/RootLayout.jsx
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";


// ---- Contact constants (clickable tel/mail) ----
const PHONE_DISPLAY = "(614) 772-0563";
const PHONE_E164 = "+16147720563";
const EMAIL = "menorahhealth@gmail.com";

// ---- Top-nav (Home first) ----
const navPrimary = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Employee Portal", href: "/employment-portal" },
  { label: "Patient Portal", href: "/patient-portal" },
  { label: "Contact", href: "/contact" },
];

// ---- Services anchors (no child pages under Services) ----
const servicesMenu = [
  { label: "Skilled Nursing Services", href: "/services#skilled" },
  { label: "Participant-Directed HPC (Homemaker/Personal Care)", href: "/services#hpc" },
  { label: "Aided Living & Personal Care Services", href: "/services#personal" },
  { label: "Respite Care", href: "/services#respite" },
  { label: "CPR & Emergency Training", href: "/cpr" },
];

const cn = (...a) => a.filter(Boolean).join(" ");

export default function RootLayout() {
  const year = new Date().getFullYear();
  const { pathname, hash } = useLocation();

  // Desktop services hover dropdown
  const [servicesOpen, setServicesOpen] = React.useState(false);

  // Mobile drawer + mobile services accordion
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);

  // Active link helper
  const isActive = (href) => {
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      const targetPath = path || "/";
      return pathname === targetPath && hash === `#${h}`;
    }
    if (href === "/services") return pathname === "/services";
    return pathname === href;
  };

  const anyServiceActive =
    pathname === "/services" || servicesMenu.some(({ href }) => isActive(href));

  // Close menus on location change, also smooth scroll to anchors
  React.useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, hash]);

  // Prevent background scroll when mobile drawer open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2" aria-label="Menorah Health LLP">
            <img
             src="menorah-logo2.png"
              alt="Menorah Health LLP"
              className="h-10 w-auto object-contain"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {/* Home */}
            <Link
              to="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={cn(
                "relative font-semibold tracking-tight text-neutral-800 transition-all hover:text-neutral-950 hover:-translate-y-0.5",
                "after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full",
                "after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700 after:transition-transform after:duration-300 after:content-['']",
                isActive("/") ? "text-neutral-950 after:scale-x-100" : "hover:after:scale-x-100"
              )}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={cn(
                "relative font-semibold tracking-tight text-neutral-800 transition-all hover:text-neutral-950 hover:-translate-y-0.5",
                "after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full",
                "after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700 after:transition-transform after:duration-300 after:content-['']",
                isActive("/about") ? "text-neutral-950 after:scale-x-100" : "hover:after:scale-x-100"
              )}
            >
              About Us
            </Link>

            {/* Services link + hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                aria-current={anyServiceActive ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center gap-1 font-semibold tracking-tight",
                  "text-neutral-800 transition-all hover:text-neutral-950 hover:-translate-y-0.5",
                  "after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full",
                  "after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700 after:transition-transform after:duration-300 after:content-['']",
                  anyServiceActive ? "text-neutral-950 after:scale-x-100" : "hover:after:scale-x-100"
                )}
                onClick={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </Link>

              {/* Dropdown panel */}
              <div
                role="menu"
                aria-label="Services"
                className={cn(
                  "absolute left-0 mt-3 w-[380px] rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ring-1 ring-black/5",
                  "transition-all duration-150",
                  servicesOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
                )}
              >
                {servicesMenu.map(({ label, href }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={label}
                      to={href}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all",
                        active
                          ? "bg-amber-50 text-amber-900 shadow-[inset_0_-2px_0_rgba(245,158,11,0.35)]"
                          : "text-neutral-800 hover:bg-white hover:text-neutral-950 hover:shadow-[0_4px_16px_rgba(17,24,39,0.06),inset_0_-2px_0_rgba(245,158,11,0.35)] hover:-translate-y-0.5"
                      )}
                    >
                      <span className="flex-1">{label}</span>
                      <span className="ml-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-8" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Remaining links */}
            {navPrimary
              .filter(({ label }) => !["Home", "About Us", "Services"].includes(label))
              .map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={label}
                    to={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative font-semibold tracking-tight text-neutral-800 transition-all hover:text-neutral-950 hover:-translate-y-0.5",
                      "after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full",
                      "after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700 after:transition-transform after:duration-300 after:content-['']",
                      active ? "text-neutral-950 after:scale-x-100" : "hover:after:scale-x-100"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/referral"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-white shadow-sm",
                "bg-amber-600 hover:bg-amber-700"
              )}
            >
              Start Referral <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "fixed inset-0 z-[60] md:hidden",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
          aria-hidden={!mobileOpen}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-black/30 transition-opacity",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className={cn(
              "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl ring-1 ring-black/5 transition-transform",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Menorah Health LLP"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <button
                aria-label="Close menu"
                className="rounded-full p-2 hover:bg-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="px-2 py-3">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-xl px-3 py-2 font-semibold",
                  isActive("/") ? "bg-amber-50 text-amber-900" : "hover:bg-neutral-50"
                )}
              >
                Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "mt-1 block rounded-xl px-3 py-2 font-semibold",
                  isActive("/about") ? "bg-amber-50 text-amber-900" : "hover:bg-neutral-50"
                )}
              >
                About Us
              </Link>

              {/* Services (navigates to /services; accordion for anchors) */}
              <div className="mt-1">
                <div className="flex items-center">
                  <Link
                    to="/services"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex-1 rounded-xl px-3 py-2 font-semibold",
                      anyServiceActive ? "bg-amber-50 text-amber-900" : "hover:bg-neutral-50"
                    )}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="mx-2 inline-flex items-center rounded-lg px-2 py-2 hover:bg-neutral-50"
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        mobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Accordion content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all",
                    mobileServicesOpen ? "max-h-[480px]" : "max-h-0"
                  )}
                >
                  <ul className="mt-1 space-y-1 border-l pl-4">
                    {servicesMenu.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          to={href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The rest */}
              {navPrimary
                .filter(({ label }) => !["Home", "About Us", "Services"].includes(label))
                .map(({ label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "mt-1 block rounded-xl px-3 py-2 font-semibold",
                      isActive(href) ? "bg-amber-50 text-amber-900" : "hover:bg-neutral-50"
                    )}
                  >
                    {label}
                  </Link>
                ))}

              {/* CTA + contact */}
              <div className="mt-4 border-t pt-4">
                <Link
                  to="/referral"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
                >
                  Start Referral <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-6 space-y-2 text-sm">
                  <a
                    href={`tel:${PHONE_E164}`}
                    className="flex items-center gap-2 hover:text-neutral-950 hover:underline underline-offset-4"
                  >
                    <Phone className="h-4 w-4 text-amber-700" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 hover:text-neutral-950 hover:underline underline-offset-4 break-all"
                  >
                    <Mail className="h-4 w-4 text-amber-700" />
                    {EMAIL}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="border-b border-neutral-200" />
      </header>

      {/* ===== CONTENT ===== */}
      <Outlet />

      {/* ===== FOOTER ===== */}
      <footer className="mt-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-start">
              <img
                 src="menorah-logo2.png"
                alt="Menorah Health LLP"
                className="h-16 w-auto object-contain -mt-1 sm:-mt-2"
                loading="lazy"
              />
            </div>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
            {/* Company */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Company
              </h4>
              <ul className="space-y-1.5 text-sm">
                {navPrimary.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="
                        relative inline-flex items-center px-0 py-1
                        text-neutral-700 transition-all
                        hover:text-neutral-950 hover:-translate-y-0.5
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                        after:origin-left after:scale-x-0 after:rounded-full
                        after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100
                      "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Services
              </h4>
              <ul className="space-y-1.5 text-sm">
                {servicesMenu.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="
                        relative inline-flex items-center px-0 py-1
                        text-neutral-700 transition-all
                        hover:text-neutral-950 hover:-translate-y-0.5
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                        after:origin-left after:scale-x-0 after:rounded-full
                        after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100
                      "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal (placeholders) */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Legal
              </h4>
              <ul className="space-y-1.5 text-sm">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Non-discrimination", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="
                        relative inline-flex items-center px-0 py-1
                        text-neutral-700 transition-all
                        hover:text-neutral-950 hover:-translate-y-0.5
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                        after:origin-left after:scale-x-0 after:rounded-full
                        after:bg-gradient-to-r after:from-amber-500 after:via-amber-600 after:to-amber-700
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100
                      "
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Footer CTA + clickable contact */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm flex flex-col items-start">
            <p className="text-sm font-semibold text-neutral-900">Ready to begin?</p>
            <p className="mt-1 text-sm text-neutral-600">
              Start a referral and our team will follow up promptly.
            </p>
            <Link
              to="/referral"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Start Referral <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="space-y-1 text-sm text-neutral-700 mt-6">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center gap-2 hover:text-neutral-950 hover:underline underline-offset-4"
              >
                <Phone className="h-4 w-4 text-amber-700" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-neutral-950 hover:underline underline-offset-4 break-all"
              >
                <Mail className="h-4 w-4 text-amber-700" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
          © {year} Menorah Health LLP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
