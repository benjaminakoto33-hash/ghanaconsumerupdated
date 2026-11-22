import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiPause, FiPlay } from "react-icons/fi";
import businessAd from "../images/businessAd.jpg";
import Azar from "../images/Azar.jpeg";
import star1 from "../images/star1.jpeg";

/* ------------------------------------------------------------------ */
/*  DATA — hoisted out of the component so it is referentially stable  */
/* ------------------------------------------------------------------ */

const ADS = [
  {
    id: "business",
    title: "Boost Your Business With Us",
    description:
      "Advertise here and reach thousands of potential clients daily.",
    img: businessAd,
    link: "https://your-business-link.com",
    buttonText: "Advertise Now",
    gradient: "from-purple-600 via-pink-500 to-red-500",
    accent: "bg-pink-500 hover:bg-pink-400",
  },
  {
    id: "azar",
    title: "Brighten Your World With Azar Paints",
    description:
      "For decades, Azar Paints has been a trusted name in Ghana, delivering high-quality paints that bring life, beauty, and durability to every surface. Whether for homes, offices, or large projects, Azar Paints offers vibrant colours, long-lasting protection, and eco-friendly solutions to make your spaces truly stand out.",
    img: Azar,
    link: "https://www.azargroupltd.com/",
    buttonText: "Shop Now",
    gradient: "from-blue-600 via-cyan-500 to-emerald-500",
    accent: "bg-cyan-500 hover:bg-cyan-400",
  },
  {
    id: "star-oil",
    title: "Star Oil — Fuel Now, Pay Later",
    description:
      "Star Oil has introduced a groundbreaking solution for commercial drivers: Fuel Now, Pay Later. Drivers can purchase fuel on credit using their Ghana Card and a personalised credit score. Register on the myCredit Score app, verify your identity, receive an individual credit limit, and buy fuel at selected Star Oil stations — then pay later via mobile money. Real financial relief, and a step forward for Ghana's digital transformation.",
    img: star1,
    link: "https://www.staroil.com.gh/",
    buttonText: "Learn more",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    accent: "bg-orange-500 hover:bg-orange-400",
  },
];

const AUTOPLAY_MS = 7000;

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

/** Pause autoplay when the tab is hidden. */
function usePageVisible() {
  const [visible, setVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden
  );
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

/* ------------------------------------------------------------------ */
/*  SLIDE VARIANTS                                                     */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "8%" : "-8%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({
    x: dir < 0 ? "8%" : "-8%",
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CallToAction() {
  const [[index, direction], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const pageVisible = usePageVisible();

  const total = ADS.length;
  const ad = ADS[index];

  /* -------- navigation -------------------------------------------- */

  const goTo = useCallback(
    (nextIndex) => {
      setState(([curr]) => {
        const dir = nextIndex > curr ? 1 : -1;
        return [((nextIndex % total) + total) % total, dir];
      });
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  /* -------- autoplay ---------------------------------------------- */

  const shouldPlay = !paused && pageVisible && !prefersReduced;

  useEffect(() => {
    if (!shouldPlay) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [shouldPlay, next, index]);

  /* -------- keyboard ---------------------------------------------- */

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " && e.target === regionRef.current) {
        e.preventDefault();
        setPaused((p) => !p);
      }
    },
    [next, prev]
  );

  /* -------- swipe ------------------------------------------------ */

  const onDragEnd = (_, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  /* -------- render ------------------------------------------------ */

  return (
    <section
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured partner promotions"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget)) setPaused(false);
      }}
      className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl bg-gray-900 shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
    >
      {/* ============================================================ */}
      {/* SLIDE TRACK                                                  */}
      {/* ============================================================ */}
      <div className="relative min-h-[480px] sm:min-h-[420px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={ad.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: prefersReduced
                ? { duration: 0 }
                : { type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: prefersReduced ? 0 : 0.35 },
            }}
            drag={prefersReduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            className={`absolute inset-0 grid grid-cols-1 bg-gradient-to-br ${ad.gradient} sm:grid-cols-2`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}: ${ad.title}`}
          >
            {/* ---------- TEXT COLUMN ---------- */}
            <div className="relative z-10 flex flex-col justify-center gap-5 p-6 sm:p-10">
              {/* subtle scrim so long copy stays readable on any gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent"
              />

              <div className="relative">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Sponsored
                </p>

                <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {ad.title}
                </h2>

                <p className="mt-3 max-w-prose text-sm leading-7 text-white/90 sm:text-base">
                  {ad.description}
                </p>
              </div>

              <div className="relative flex flex-wrap items-center gap-3">
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full ${ad.accent} px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900`}
                >
                  {ad.buttonText}
                  <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* ---------- IMAGE COLUMN ---------- */}
            <div className="relative min-h-[220px] sm:min-h-0">
              <img
                src={ad.img}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* blend the image into the gradient on desktop */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-r ${ad.gradient} opacity-30 mix-blend-multiply`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/10"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* CONTROLS                                                     */}
      {/* ============================================================ */}

      {/* Arrows — only on sm+, hidden for touch users who can swipe */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous promotion"
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
      >
        <FiArrowLeft className="text-xl" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next promotion"
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
      >
        <FiArrowRight className="text-xl" />
      </button>

      {/* Bottom control bar: play/pause · dots · counter */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 sm:px-6">
        {/* Left: play/pause (hidden if reduced motion — autoplay is off anyway) */}
        {!prefersReduced ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={paused}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {paused ? <FiPlay className="text-sm" /> : <FiPause className="text-sm" />}
          </button>
        ) : (
          <span className="h-9 w-9" aria-hidden="true" />
        )}

        {/* Center: dots */}
        <div role="tablist" aria-label="Choose a promotion" className="flex items-center gap-2">
          {ADS.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                onClick={() => goTo(i)}
                aria-selected={active}
                aria-label={`${i + 1}. ${item.title}`}
                aria-current={active ? "true" : undefined}
                className="group relative h-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-full"
              >
                <span
                  className={[
                    "block h-3 rounded-full transition-all",
                    active
                      ? "w-8 bg-white"
                      : "w-3 bg-white/50 group-hover:bg-white/80",
                  ].join(" ")}
                />
                {/* progress bar on the active dot */}
                {active && shouldPlay && (
                  <motion.span
                    key={`${item.id}-${index}`}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 origin-left rounded-full bg-amber-300"
                    style={{ width: "100%" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: counter */}
        <p
          className="min-w-[3.5rem] text-right text-xs font-semibold tabular-nums text-white/90"
          aria-live="polite"
          aria-atomic="true"
        >
          {index + 1} / {total}
        </p>
      </div>
    </section>
  );
}