import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiClock,
  FiMessageSquare,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiArrowRight,
  FiExternalLink,
  FiShield,
} from "react-icons/fi";

import { supabase } from "../lib/supabaseClient";

// --------------------------------------------------
// FORM CONFIGURATION
// --------------------------------------------------

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  category: "general",
  consent: false,
  website: "",
};

const contactCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "complaint", label: "Consumer Complaint" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "media", label: "Media Inquiry" },
  { value: "suggestion", label: "Suggestion / Feedback" },
  { value: "other", label: "Other" },
];

const faqs = [
  {
    question: "How can I report a consumer problem?",
    answer:
      "Choose Consumer Complaint in the form and explain what happened. Include relevant details about the product or service. Avoid sending passwords or sensitive financial information.",
  },
  {
    question: "Can I contact Ghana Consumer about a partnership?",
    answer:
      "Yes. Select Partnership Opportunity and tell us about your organisation, proposal, or collaboration idea.",
  },
  {
    question: "How long will a response take?",
    answer:
      "We aim to respond as soon as possible. Response times may vary depending on the nature and volume of enquiries.",
  },
];

// --------------------------------------------------
// EMAILJS CONFIGURATION
// --------------------------------------------------

const getEmailConfig = () => ({
  notification: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
  autoReply: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID_2,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_2,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY_2,
  },
});

// --------------------------------------------------
// SMALL PRESENTATIONAL COMPONENTS
// --------------------------------------------------

const ContactMethodCard = ({ icon, iconBg, title, primary, secondary, href }) => {
  const Wrapper = href ? motion.a : motion.div;
  return (
    <Wrapper
      {...(href ? { href } : {})}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className={`mb-4 inline-flex rounded-xl p-3 ${iconBg}`}>{icon}</div>
      <h3 className="font-bold text-gray-900">{title}</h3>
      {primary && (
        <p className="mt-2 break-all font-medium text-gray-800">{primary}</p>
      )}
      {secondary && <p className="mt-2 text-sm text-gray-500">{secondary}</p>}
    </Wrapper>
  );
};

const StatusMessage = ({ type, message, reducedMotion }) => {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const Icon =
    type === "success"
      ? FiCheckCircle
      : type === "info"
      ? FiInfo
      : FiAlertCircle;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${styles[type]}`}
    >
      <Icon className="mt-0.5 shrink-0 text-xl" />
      <p className="text-sm leading-6">{message}</p>
    </motion.div>
  );
};

const FaqItem = ({ faq, isOpen, onToggle, reducedMotion }) => (
  <div className="py-4">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 text-left font-semibold text-gray-800 transition hover:text-amber-600"
    >
      <span>{faq.question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className="text-xl leading-none"
        aria-hidden="true"
      >
        {isOpen ? "−" : "+"}
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={reducedMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="mt-3 text-sm leading-7 text-gray-600">{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --------------------------------------------------
// CONTACT COMPONENT
// --------------------------------------------------

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const submittingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  // ------------------------------------------------
  // INPUT HANDLING
  // ------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the specific field error as the user corrects it.
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitStatus) setSubmitStatus(null);
  };

  // ------------------------------------------------
  // VALIDATION
  // ------------------------------------------------

  const validateForm = () => {
    const errors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) errors.name = "Please enter your full name.";
    else if (name.length > 100)
      errors.name = "Your name must not exceed 100 characters.";

    if (!email) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";

    if (!subject) errors.subject = "Please enter a subject.";
    else if (subject.length > 150)
      errors.subject = "Your subject must not exceed 150 characters.";

    if (!message) errors.message = "Please write your message.";

    if (!formData.consent)
      errors.consent = "Please agree to the privacy notice before submitting.";

    return errors;
  };

  // ------------------------------------------------
  // SUPABASE
  // ------------------------------------------------

  const saveToSupabase = async (data) => {
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        category: data.category,
        consent: true,
      },
    ]);
    if (error) throw error;
    return true;
  };

  // ------------------------------------------------
  // EMAILJS — TEAM NOTIFICATION
  // ------------------------------------------------

  const sendNotificationEmail = async (data) => {
    const config = getEmailConfig().notification;
    if (!config.serviceId || !config.templateId || !config.publicKey) {
      throw new Error(
        "EmailJS Service 1 is missing its service ID, template ID, or public key."
      );
    }

    const categoryLabel =
      contactCategories.find((c) => c.value === data.category)?.label ||
      data.category;

    return emailjs.send(
      config.serviceId,
      config.templateId,
      {
        from_name: data.name,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
        category: categoryLabel,
        submitted_at: new Date().toLocaleString("en-GB", {
          timeZone: "Africa/Accra",
        }),
      },
      config.publicKey
    );
  };

  // ------------------------------------------------
  // EMAILJS — VISITOR AUTO-REPLY
  // ------------------------------------------------

  const sendAutomaticReply = async (data) => {
    const config = getEmailConfig().autoReply;
    const hasAny =
      config.serviceId || config.templateId || config.publicKey;

    // Entirely unconfigured → optional, skip silently.
    if (!hasAny) return { skipped: true };

    // Partially configured → surface it as an error so devs notice.
    if (!config.serviceId || !config.templateId || !config.publicKey) {
      throw new Error(
        "EmailJS Service 2 is only partially configured. Check its three environment variables."
      );
    }

    const categoryLabel =
      contactCategories.find((c) => c.value === data.category)?.label ||
      data.category;

    return emailjs.send(
      config.serviceId,
      config.templateId,
      {
        to_name: data.name,
        to_email: data.email,
        from_name: "Ghana Consumer",
        reply_to: "support@ghanaconsumer.com",
        subject: "We have received your message",
        message: data.message,
        enquiry_subject: data.subject,
        category: categoryLabel,
        submitted_at: new Date().toLocaleString("en-GB", {
          timeZone: "Africa/Accra",
        }),
      },
      config.publicKey
    );
  };

  // ------------------------------------------------
  // MAIN SUBMIT HANDLER
  // ------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Honeypot
    if (formData.website.trim() !== "") {
      setSubmitStatus({ type: "error", message: "Unable to submit this message." });
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      // Focus the first invalid field
      const firstKey = Object.keys(errors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setFieldErrors({});

    const data = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      category: formData.category,
    };

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus({ type: "info", message: "Sending your message. Please wait..." });

    try {
      const results = await Promise.allSettled([
        saveToSupabase(data),
        sendNotificationEmail(data),
        sendAutomaticReply(data),
      ]);

      const [dbResult, notifResult, autoReplyResult] = results;
      const databaseSaved = dbResult.status === "fulfilled";
      const notificationSent = notifResult.status === "fulfilled";
      const autoReplySkipped =
        autoReplyResult.status === "fulfilled" &&
        autoReplyResult.value?.skipped === true;
      const autoReplySent =
        autoReplyResult.status === "fulfilled" && !autoReplySkipped;

      if (!databaseSaved) console.error("SUPABASE ERROR:", dbResult.reason);
      if (!notificationSent)
        console.error("EMAILJS SERVICE 1 ERROR:", notifResult.reason);
      if (autoReplyResult.status === "rejected")
        console.error("EMAILJS SERVICE 2 ERROR:", autoReplyResult.reason);

      if (!databaseSaved && !notificationSent) {
        setSubmitStatus({
          type: "error",
          message:
            "We could not save or send your enquiry. Your form details have been kept. Please try again.",
        });
        return;
      }

      setFormData(initialFormData);

      if (databaseSaved && notificationSent && autoReplySent) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your enquiry has been saved, our team has been notified, and a confirmation email has been sent to you.",
        });
      } else {
        const details = [];
        if (!databaseSaved)
          details.push(
            "Your enquiry notification was sent, but the database could not save your message."
          );
        if (!notificationSent && databaseSaved)
          details.push(
            "Your enquiry has been safely saved, but our team email notification could not be sent."
          );
        if (autoReplySkipped)
          details.push(
            "The automatic visitor confirmation email is not configured yet."
          );
        else if (!autoReplySent)
          details.push("The automatic confirmation email could not be sent.");

        setSubmitStatus({ type: "warning", message: details.join(" ") });
      }
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------------
  // RENDER HELPERS
  // ------------------------------------------------

  const inputClass = (hasError) =>
    `w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition disabled:bg-gray-100 ${
      hasError
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
    }`;

  const plainInputClass = (hasError) =>
    `w-full rounded-xl border px-4 py-3 outline-none transition disabled:bg-gray-100 ${
      hasError
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-amber-100 p-4">
            <FiMessageSquare className="text-3xl text-amber-600" />
          </div>
          <h1 className="bg-gradient-to-r from-amber-600 via-green-600 to-red-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Contact Ghana Consumer
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Have a question, consumer complaint, suggestion, or partnership
            idea? Get in touch with our team. We would be glad to hear from you.
          </p>
        </motion.header>

        {/* CONTACT INFO CARDS */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactMethodCard
            href="mailto:support@ghanaconsumer.com"
            icon={<FiMail className="text-2xl text-amber-600" />}
            iconBg="bg-amber-100"
            title="Email Us"
            primary="support@ghanaconsumer.com"
            secondary="Send us your questions and enquiries."
          />
          <ContactMethodCard
            icon={<FiMapPin className="text-2xl text-green-600" />}
            iconBg="bg-green-100"
            title="Visit Our Location"
            primary="Forico Mall, Osu"
            secondary="Mission Street, Accra, Ghana."
          />
          <ContactMethodCard
            icon={<FiClock className="text-2xl text-blue-600" />}
            iconBg="bg-blue-100"
            title="Response Time"
            primary="We aim to respond promptly"
            secondary="Response times depend on the nature of your enquiry."
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* FORM */}
          <motion.section
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
          >
            <div className="mb-7">
              <span className="text-sm font-bold uppercase tracking-wider text-amber-600">
                Get in touch
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Complete the form below and our team will receive your enquiry.
              </p>
            </div>

            {submitStatus && (
              <StatusMessage
                type={submitStatus.type}
                message={submitStatus.message}
                reducedMotion={reducedMotion}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* HONEYPOT */}
              <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      maxLength={100}
                      required
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      className={inputClass(!!fieldErrors.name)}
                    />
                  </div>
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 text-xs font-medium text-red-600">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      maxLength={254}
                      required
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={inputClass(!!fieldErrors.email)}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 text-xs font-medium text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                  What is your enquiry about? *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className={`${plainInputClass(false)} bg-white`}
                >
                  {contactCategories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBJECT */}
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is your message about?"
                  maxLength={150}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!!fieldErrors.subject}
                  aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
                  className={plainInputClass(!!fieldErrors.subject)}
                />
                {fieldErrors.subject && (
                  <p id="subject-error" className="mt-1 text-xs font-medium text-red-600">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please tell us how we can help..."
                  rows={6}
                  maxLength={5000}
                  required
                  disabled={isSubmitting}
                  spellCheck="true"
                  aria-required="true"
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className={`${plainInputClass(!!fieldErrors.message)} resize-y`}
                />
                <div className="mt-1 flex items-center justify-between">
                  {fieldErrors.message ? (
                    <p id="message-error" className="text-xs font-medium text-red-600">
                      {fieldErrors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-right text-xs text-gray-400">
                    {formData.message.length}/5000 characters
                  </p>
                </div>
              </div>

              {/* CONSENT */}
              <div>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-gray-50 p-4">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={!!fieldErrors.consent}
                    className="mt-1 h-4 w-4 accent-amber-600"
                  />
                  <span className="text-sm leading-6 text-gray-600">
                    I agree that Ghana Consumer may use the information I provide
                    to respond to my enquiry. I understand that my contact details
                    will not be displayed publicly.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {fieldErrors.consent}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                whileHover={!isSubmitting && !reducedMotion ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !reducedMotion ? { scale: 0.97 } : {}}
                className="relative flex min-h-[58px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 font-bold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? (
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <motion.span
                      animate={reducedMotion ? undefined : { rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white/30 border-t-white"
                    />
                    <span>Sending Your Message...</span>
                  </motion.div>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <FiSend className="text-lg" />
                    Send Message
                  </span>
                )}
              </motion.button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                <FiShield className="shrink-0" />
                Your contact details are not displayed publicly.
              </p>
            </form>
          </motion.section>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="space-y-8"
          >
            {/* LOCATION */}
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg sm:p-6">
              <div className="mb-5">
                <span className="text-sm font-bold uppercase tracking-wider text-green-600">
                  Find us
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  Our Location
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Find us at Forico Mall, along Mission Street in Osu, Accra.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <iframe
                  title="Ghana Consumer location at Forico Mall, Osu, Accra"
                  src="https://www.google.com/maps?q=5.55945,-0.17820&z=17&output=embed"
                  width="100%"
                  height="340"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="flex flex-col gap-3 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Forico Mall, Osu</p>
                    <p className="text-sm text-gray-600">
                      Mission Street, Osu, Accra, Ghana
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=5.55945%2C-0.17820"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Get Directions <FiExternalLink />
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="mb-5 text-xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={faq.question}
                    faq={faq}
                    isOpen={openFaq === index}
                    onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </section>

            {/* DIRECT EMAIL */}
            <section className="rounded-3xl bg-gray-900 p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <FiMail className="text-2xl text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Prefer Email?</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    You can also contact us directly by email.
                  </p>
                  <a
                    href="mailto:support@ghanaconsumer.com"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300"
                  >
                    support@ghanaconsumer.com
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            </section>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="mt-14 text-center">
          <p className="text-sm text-gray-500">
            Ghana Consumer — Promoting informed choices and stronger consumer
            awareness in Ghana.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;