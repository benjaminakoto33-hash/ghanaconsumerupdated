
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";

import { FaMoon, FaSun } from "react-icons/fa";

import {
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiPenTool,
} from "react-icons/fi";

import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import logo from "../images/logo.png";

/* =========================================================
   CONFIGURATION
========================================================= */

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/affiliates", label: "Affiliates" },
  { to: "/diy", label: "DIY" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const PETITION = {
  to: "/sitemap",
  label: "Sign the Petition",
};

/* =========================================================
   BRAND
========================================================= */

function BrandLockup() {
  return (
    <Link
      to="/"
      aria-label="GhanaConsumer Home"
      className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <img
        src={logo}
        alt=""
        className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
        loading="eager"
        decoding="async"
      />

      <span className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-xl">
          GhanaConsumer
        </span>

        <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400 sm:text-xs">
          Informed · Protected
        </span>
      </span>
    </Link>
  );
}

/* =========================================================
   SEARCH
========================================================= */

function SearchForm({
  value,
  onChange,
  onSubmit,
  mobile = false,
  inputRef,
}) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex w-full items-center gap-2"
    >
      <div className="relative flex-1">
        <AiOutlineSearch
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-gray-400"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search articles, reviews, guides..."
          aria-label="Search GhanaConsumer"
          autoComplete="off"
          spellCheck="false"
          className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 pl-11 pr-4 text-base text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800 dark:placeholder:text-gray-500"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 px-5 text-base font-bold text-gray-950 transition-all hover:bg-amber-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        {mobile ? "Go" : "Search"}
      </button>
    </form>
  );
}

/* =========================================================
   THEME TOGGLE
========================================================= */

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition-all hover:border-amber-400 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? (
        <FaSun className="text-lg text-amber-400" />
      ) : (
        <FaMoon className="text-lg" />
      )}
    </button>
  );
}

/* =========================================================
   PETITION BUTTON
========================================================= */

function PetitionButton({ onClick, full = false }) {
  return (
    <Link
      to={PETITION.to}
      onClick={onClick}
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl",
        "bg-amber-500 px-5 py-3 text-base font-bold text-gray-950",
        "shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2",
        "dark:bg-amber-400 dark:hover:bg-amber-300 dark:focus-visible:ring-offset-gray-900",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <FiPenTool className="text-lg" aria-hidden="true" />
      <span>{PETITION.label}</span>
    </Link>
  );
}

/* =========================================================
   USER MENU
========================================================= */

function UserMenu({ user, onSignout }) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const username = user?.username || "User";
  const initials = username.slice(0, 1).toUpperCase();

  const handleLogout = async () => {
    setSigningOut(true);

    try {
      await onSignout();
      setOpen(false);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-base font-bold text-white">
            {initials}
          </span>
        )}

        <FiChevronDown
          className={`text-base text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-700">
            <p className="truncate text-base font-bold text-gray-900 dark:text-white">
              @{username}
            </p>

            <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
              {user?.email || ""}
            </p>
          </div>

          <Link
            to="/dashboard?tab=profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <FiUser className="text-lg" />
            My Profile
          </Link>

          <button
            type="button"
            role="menuitem"
            disabled={signingOut}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <FiLogOut className="text-lg" />
            {signingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN HEADER
========================================================= */

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [signoutError, setSignoutError] = useState("");

  const mobileSearchRef = useRef(null);

  const pathname = location.pathname;
  const search = location.search;

  /* Sync search input with URL */
  useEffect(() => {
    const params = new URLSearchParams(search);
    setSearchTerm(params.get("searchTerm") || "");
  }, [search]);

  /* Close drawers when navigating */
  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setSignoutError("");
  }, [pathname]);

  /* Focus mobile search */
  useEffect(() => {
    if (mobileSearchOpen) {
      mobileSearchRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  /* Close mobile drawers with Escape */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* Search submission */
  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const query = searchTerm.trim();

      if (!query) return;

      navigate(`/search?searchTerm=${encodeURIComponent(query)}`);

      setMobileOpen(false);
      setMobileSearchOpen(false);
    },
    [navigate, searchTerm]
  );

  /* Sign out */
  const handleSignout = useCallback(async () => {
    setSignoutError("");

    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "Unable to sign out.");
      }

      dispatch(signoutSuccess());
    } catch (error) {
      console.error("Sign-out error:", error);
      setSignoutError(error.message || "Something went wrong.");
      throw error;
    }
  }, [dispatch]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-500 focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-gray-950"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/95">
        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Brand and mobile menu */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">

            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {mobileOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </button>

            <BrandLockup />
          </div>

          {/* Desktop search */}
          <div className="hidden max-w-lg flex-1 px-6 md:block">
            <SearchForm
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2">

            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((previous) => !previous);
                setMobileOpen(false);
              }}
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-search"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <AiOutlineSearch className="text-2xl" />
            </button>

            <ThemeToggle
              theme={theme}
              onToggle={() => dispatch(toggleTheme())}
            />

            {/* Account menu */}
            {currentUser && (
              <UserMenu
                user={currentUser}
                onSignout={handleSignout}
              />
            )}

            {/* Petition button */}
            <div className="hidden lg:block">
              <PetitionButton />
            </div>
          </div>
        </div>

        {/* Sign-out error */}
        {signoutError && (
          <div
            role="alert"
            className="border-t border-red-200 bg-red-50 px-4 py-2 text-center text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            {signoutError}
          </div>
        )}

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav
          aria-label="Primary navigation"
          className="hidden border-t border-gray-100 md:block dark:border-gray-800"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">

            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "relative rounded-lg px-4 py-4 text-base font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                    isActive
                      ? "text-green-800 dark:text-green-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400",
                  ].join(" ")
                }
              >
                {label}

                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-amber-500 opacity-0 [&.active]:opacity-100"
                  aria-hidden="true"
                />
              </NavLink>
            ))}

            <div className="flex-1" />

            <span className="hidden text-sm font-medium text-gray-500 xl:block dark:text-gray-400">
              Your consumer voice matters.
            </span>
          </div>
        </nav>

        {/* =====================================================
            MOBILE SEARCH
        ===================================================== */}

        {mobileSearchOpen && (
          <div
            id="mobile-search"
            className="border-t border-gray-200 bg-white p-4 md:hidden dark:border-gray-800 dark:bg-gray-900"
          >
            <SearchForm
              mobile
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
              inputRef={mobileSearchRef}
            />
          </div>
        )}

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        {mobileOpen && (
          <div
            id="mobile-nav"
            className="border-t border-gray-200 bg-white px-4 pb-5 pt-3 md:hidden dark:border-gray-800 dark:bg-gray-900"
          >
            <nav
              aria-label="Mobile primary navigation"
              className="flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3.5 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              <PetitionButton full onClick={closeMobileMenu} />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
