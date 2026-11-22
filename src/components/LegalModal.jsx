import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import useFocusTrap from "../hooks/useFocusTrap";

export default function LegalModal({ open, title, updated, sections, onClose }) {
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, open);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 sm:p-6">
              <div>
                <h2
                  id="legal-modal-title"
                  className="text-xl font-bold text-gray-900 sm:text-2xl"
                >
                  {title}
                </h2>
                {updated && (
                  <p className="mt-1 text-sm text-gray-500">
                    Last updated {updated}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
              <div className="space-y-6 text-sm leading-7 text-gray-700">
                {sections.map((s) => (
                  <section key={s.heading}>
                    <h3 className="mb-2 text-base font-bold text-gray-900">
                      {s.heading}
                    </h3>
                    {Array.isArray(s.body) ? (
                      s.body.map((paragraph, i) => (
                        <p key={i} className="mb-3">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="mb-3">{s.body}</p>
                    )}
                    {s.list && (
                      <ul className="ml-5 list-disc space-y-1.5">
                        {s.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>

            <footer className="flex justify-end border-t border-gray-200 bg-gray-50 p-4 sm:p-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}