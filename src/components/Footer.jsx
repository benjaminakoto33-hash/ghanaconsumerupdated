import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsTiktok,
} from "react-icons/bs";
import { FiArrowUp } from "react-icons/fi";

import LegalModal from "./LegalModal";
import { TERMS_SECTIONS, PRIVACY_SECTIONS } from "../data/legal";

export default function FooterCom() {
  const year = new Date().getFullYear();
  const [legalOpen, setLegalOpen] = useState(null); // 'terms' | 'privacy' | null

  const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "Our Story", to: "/our-story" },
    { label: "Affiliates", to: "/affiliates" },
    { label: "DIY", to: "/diy" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: BsFacebook },
    { name: "Instagram", href: "https://instagram.com", icon: BsInstagram },
    { name: "TikTok", href: "https://tiktok.com", icon: BsTiktok },
    { name: "X", href: "https://x.com", icon: BsTwitterX },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", onClick: () => setLegalOpen("terms") },
    { label: "Privacy Policy", onClick: () => setLegalOpen("privacy") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const modalConfig =
    legalOpen === "terms"
      ? {
          title: "Terms & Conditions",
          updated: "November 2025",
          sections: TERMS_SECTIONS,
        }
      : legalOpen === "privacy"
      ? {
          title: "Privacy Policy",
          updated: "November 2025",
          sections: PRIVACY_SECTIONS,
        }
      : null;

  return (
    <>
      <footer className="border-t-4 border-green-600 bg-gray-950 text-gray-300">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ====================================================== */}
          {/* MAIN GRID                                              */}
          {/* ====================================================== */}
          <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
            {/* ---------- BRAND ---------- */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-950"
                aria-label="Ghana Consumer — Home"
              >
                <span className="rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-green-600 px-3 py-2 text-xl font-extrabold text-white">
                  GC
                </span>
                <span className="text-2xl font-extrabold text-white">
                  Ghana <span className="text-green-500">Consumer</span>
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                An independent platform informing and empowering Ghanaian
                consumers. We report on products, services, and policies that
                shape everyday life — and we give the public the tools to act.
              </p>

              <p className="mt-8 text-xs font-bold uppercase tracking-wider text-gray-400">
                Follow Ghana Consumer
              </p>

              <div className="mt-3 flex gap-3">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ghana Consumer on ${name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-green-500 hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* ---------- EXPLORE ---------- */}
            <nav aria-labelledby="footer-explore">
              <h3
                id="footer-explore"
                className="mb-5 text-sm font-bold uppercase tracking-wider text-white"
              >
                Explore
              </h3>
              <ul className="space-y-3">
                {exploreLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="rounded text-sm text-gray-400 transition hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------- LEGAL ---------- */}
            <nav aria-labelledby="footer-legal">
              <h3
                id="footer-legal"
                className="mb-5 text-sm font-bold uppercase tracking-wider text-white"
              >
                Legal
              </h3>
              <ul className="space-y-3">
                {legalLinks.map(({ label, onClick }) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={onClick}
                      className="rounded text-left text-sm text-gray-400 transition hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact"
                    className="rounded text-sm text-gray-400 transition hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  >
                    Report an Issue
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ====================================================== */}
          {/* PETITION CTA                                           */}
          {/* ====================================================== */}
          <div className="mb-10 flex flex-col gap-5 rounded-xl border border-green-800 bg-gradient-to-r from-gray-900 to-green-950/40 p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Be part of the change.
              </h3>
              <p className="mt-1.5 text-sm text-gray-400">
                Add your voice to the call for healthier food environments and
                fairer prices in Ghana.
              </p>
            </div>
            <Link
              to="/sitemap"
              className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 md:w-auto"
            >
              Sign the Petition
            </Link>
          </div>

          {/* ====================================================== */}
          {/* BOTTOM BAR                                             */}
          {/* ====================================================== */}
          <div className="flex flex-col-reverse gap-4 border-t border-gray-800 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              © {year}{" "}
              <Link
                to="/"
                className="rounded font-semibold text-white transition hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                Ghana Consumer
              </Link>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <p className="text-xs font-medium tracking-wide text-gray-500">
                HEALTHIER FOOD. HEALTHIER PEOPLE. HEALTHIER FUTURE.
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-green-500 hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                <FiArrowUp aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* LEGAL MODAL                                              */}
      {/* ======================================================== */}
      <LegalModal
        open={legalOpen !== null}
        title={modalConfig?.title ?? ""}
        updated={modalConfig?.updated}
        sections={modalConfig?.sections ?? []}
        onClose={() => setLegalOpen(null)}
      />
    </>
  );
}