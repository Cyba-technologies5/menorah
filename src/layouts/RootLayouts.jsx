// src/layouts/RootLayout.jsx
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, Mail, ChevronDown } from "lucide-react";
// import logo from "../assets/menorah-logo2.png";

// Top-nav (Home first)
const navPrimary = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" }, 
  { label: "Employee Portal", href: "/employment-portal" },
  { label: "Patient Portal", href: "/patient-portal" },
  { label: "Contact", href: "/contact" },
];

// Services -> Services page anchors
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
  const [open, setOpen] = React.useState(false);

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
    pathname === "/services" ||
    // pathname === "/cpr" ||
    servicesMenu.some(({ href }) => isActive(href));

  React.useEffect(() => setOpen(false), [pathname, hash]);
  React.useEffect(() => {
  if (hash) {
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [pathname, hash]);


  const home = navPrimary.find((x) => x.label === "Home");
  const rest = navPrimary.filter((x) => x.label !== "Home");

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo (header size unchanged) */}
          <Link to="/" className="flex items-center" aria-label="Menorah Health LLP">
            <img src="menorah-logo2.png" alt="Menorah Health LLP" className="h-48 w-48 object-contain flex-none" />
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

              {/* About Us (second) */}
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

              {/* Services (third): label navigates to /services, hover opens dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                >
                  Services
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                </Link>

                {/* Dropdown */}
                <div
                  role="menu"
                  className={cn(
                    "absolute left-0 mt-3 w-[380px] rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ring-1 ring-black/5",
                    "transition-all duration-150",
                    open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
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
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex-1">{label}</span>
                        <span className="ml-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-300 group-hover:w-8" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* The rest (Employee Portal, Patient Portal, Contact) */}
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


          {/* CTA */}
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

          {/* Mobile placeholder */}
          <button className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm md:hidden">
            Menu <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="border-b border-neutral-200" />
      </header>

      {/* CONTENT */}
      <Outlet />

      {/* FOOTER */}
      <footer className="mt-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* items-start aligns tops; large logo nudged up to remove apparent top gap */}
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-start">
              <img
                src="menorah-logo2.png"
                alt="Menorah Health LLP"
                className="h-48 w-48 object-contain flex-none -mt-2 sm:-mt-3"
                loading="lazy"
              />
            </div>
            {/* <p className="text-sm leading-relaxed text-neutral-600">
              Providing compassionate, in-home support across Franklin & Delaware Counties.
            </p> */}
            
          </div>

          {/* Link columns with premium hover */}
          <nav className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
            {/* Company */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Company</h4>
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

            {/* Services -> Services page */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Services</h4>
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

            {/* Legal */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Legal</h4>
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

          {/* Footer CTA */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm flex flex-col items-start">
            <p className="text-sm font-semibold text-neutral-900">Ready to begin?</p>
            <p className="mt-1 text-sm text-neutral-600">Start a referral and our team will follow up promptly.</p>
            <Link
              to="/referral"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Start Referral <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="space-y-1 text-sm text-neutral-700 mt-6">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-700" /> (614) 772-0563</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-700" /> menorahhealth@gmail.com</p>
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
