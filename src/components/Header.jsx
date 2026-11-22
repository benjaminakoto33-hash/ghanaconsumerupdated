import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiChevronDown, FiLogOut, FiUser, FiPenTool } from "react-icons/fi";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import logo from "../images/logo.png";

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/affiliates", label: "Affiliates" },
  { to: "/diy", label: "DIY" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const PETITION = { to: "/sitemap", label: "Sign the Petition" };

/* ------------------------------------------------------------------ */
/*  HOOK — reduced motion                                              */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  BRAND LOCKUP                                                       */
/* ------------------------------------------------------------------ */

function BrandLockup({ compact = false }) {
  return (
    <Link
      to="/"
      aria-label="Ghana Consumer — Home"
      className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-md"
    >
      <img
        src={logo}
        alt=""
        className={`${compact ? "h-9 w-9" : "h-11 w-11"} object-contain shrink-0`}
        loading="eager"
        decoding="async"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white sm:text-base">
          Ghana Consumer
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
          Informed · Protected
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  SEARCH                                                             */
/* ------------------------------------------------------------------ */

function DesktopSearch({ value, onChange, onSubmit }) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="hidden md:flex w-full max-w-md items-center"
    >
      <div className="relative flex w-full">
        <AiOutlineSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search articles, guides, alerts…"
          aria-label="Search site"
          autoComplete="off"
          spellCheck="false"
          className="h-10 w-full rounded-l-md border border-r-0 border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-amber-400"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-r-md border border-amber-600 bg-amber-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 dark:focus-visible:ring-offset-gray-900"
        >
          Search
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  THEME TOGGLE                                                       */
/* ------------------------------------------------------------------ */

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
    >
      {isDark ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  PETITION CTA — the one thing that must stand out                   */
/* ------------------------------------------------------------------ */

function PetitionButton({ active, onClick, full = false }) {
  return (
    <Link
      to={PETITION.to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md",
        "bg-amber-500 px-4 py-2.5 text-sm font-bold text-gray-900",
        "shadow-sm ring-1 ring-amber-600/40",
        "transition-all duration-150",
        "hover:bg-amber-400 hover:shadow-md hover:-translate-y-px",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2",
        "dark:bg-amber-400 dark:text-gray-900 dark:ring-amber-300/50 dark:hover:bg-amber-300 dark:focus-visible:ring-offset-gray-900",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <FiPenTool className="text-base" aria-hidden="true" />
      <span>{PETITION.label}</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  USER MENU                                                          */
/* ------------------------------------------------------------------ */

function UserMenu({ user, onSignout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initials = (user.username || "?").slice(0, 1).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
            {initials}
          </span>
        )}
        <FiChevronDown
          className={`text-sm text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 origin-top-right rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800 dark:ring-white/10"
        >
          <div className="border-b border-gray-100 px-3 py-2.5 dark:border-gray-700">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              @{user.username}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <Link
            to="/dashboard?tab=profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700"
          >
            <FiUser aria-hidden="true" /> Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); onSignout(); }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 dark:focus-visible:bg-red-500/10"
          >
            <FiLogOut aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s) => s.user);
  const { theme } = useSelector((s) => s.theme);
  const reducedMotion = usePrefersReducedMotion();

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef(null);

  /* sync search from URL */
  useEffect(() => {
    const params = new URLSearchParams(search);
    setSearchTerm(params.get("searchTerm") || "");
  }, [search]);

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  /* focus mobile search when opened */
  useEffect(() => {
    if (mobileSearchOpen) mobileSearchRef.current?.focus();
  }, [mobileSearchOpen]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const params = new URLSearchParams(search);
      const q = searchTerm.trim();
      if (q) params.set("searchTerm", q);
      else params.delete("searchTerm");
      navigate(`/search?${params.toString()}`);
      setMobileSearchOpen(false);
      setMobileOpen(false);
    },
    [navigate, search, searchTerm]
  );

  const handleSignout = useCallback(async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Sign-out failed.");
      }
      dispatch(signoutSuccess());
    } catch (err) {
      console.error("Sign-out error:", err.message);
    }
  }, [dispatch]);

  const petitionActive = pathname === PETITION.to;

  /* shared animation classes, gated on reduced motion */
  const drawerAnim = useMemo(
    () =>
      reducedMotion
        ? ""
        : "transition-[max-height,opacity] duration-300 ease-out",
    [reducedMotion]
  );

  return (
    <>
      {/* Skip link — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-gray-700 dark:bg-gray-900/90 dark:supports-[backdrop-filter]:bg-gray-900/75">
        {/* ============================================================ */}
        {/* TIER 1 — brand, search, utilities                            */}
        {/* ============================================================ */}
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Left: brand + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {mobileOpen ? <AiOutlineClose className="text-xl" /> : <AiOutlineMenu className="text-xl" />}
            </button>
            <BrandLockup />
          </div>

          {/* Center: desktop search */}
          <div className="hidden flex-1 justify-center md:flex">
            <DesktopSearch
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Right: utilities */}
          <div className="flex items-center gap-2">
            {/* mobile search icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((v) => !v)}
              aria-label="Search"
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <AiOutlineSearch className="text-xl" />
            </button>

            <ThemeToggle
              theme={theme}
              onToggle={() => dispatch(toggleTheme())}
            />

            {/* desktop petition CTA */}
            <div className="hidden md:block">
              <PetitionButton active={petitionActive} />
            </div>

          
          </div>
        </div>

        {/* ============================================================ */}
        {/* TIER 2 — desktop nav row                                     */}
        {/* ============================================================ */}
        <nav
          aria-label="Primary"
          className="hidden border-t border-gray-100 md:block dark:border-gray-800"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
            {NAV_LINKS.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative px-3 py-3 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm",
                    active
                      ? "text-amber-700 dark:text-amber-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                  ].join(" ")}
                >
                  {label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-amber-500"
                    />
                  )}
                </Link>
              );
            })}

            {/* spacer pushes any future secondary items right */}
            <span className="flex-1" />
          </div>
        </nav>

        {/* ============================================================ */}
        {/* MOBILE SEARCH DRAWER                                         */}
        {/* ============================================================ */}
        <div
          id="mobile-search"
          className={[
            "overflow-hidden border-t border-gray-100 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900",
            drawerAnim,
            mobileSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 p-3"
          >
            <div className="relative flex-1">
              <AiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
              <input
                ref={mobileSearchRef}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search…"
                aria-label="Search site"
                autoComplete="off"
                spellCheck="false"
                className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="h-10 rounded-md bg-amber-600 px-4 text-sm font-semibold text-white hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Go
            </button>
          </form>
        </div>

        {/* ============================================================ */}
        {/* MOBILE NAV DRAWER                                            */}
        {/* ============================================================ */}
        <div
          id="mobile-nav"
          className={[
            "overflow-hidden border-t border-gray-100 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900",
            drawerAnim,
            mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <nav aria-label="Mobile primary" className="flex flex-col p-3">
            {NAV_LINKS.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
              <PetitionButton
                active={petitionActive}
                onClick={() => setMobileOpen(false)}
                full
              />
            </div>

          
          </nav>
        </div>
      </header>
    </>
  );
}