
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

import {
  FiArrowRight,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiGlobe,
  FiShield,
  FiClock,
  FiAward,
  FiCheckCircle,
  FiStar,
  FiBarChart2,
  FiLink,
  FiX,
  FiSend,
  FiLoader,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";

const Affiliates = () => {
  // Modal and form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // Affiliate application form
  const initialFormData = {
    full_name: "",
    email: "",
    website_or_social: "",
    promotion_method: "",
    audience_size: "",
    message: "",
    agreed_to_terms: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Open application modal
  const openModal = () => {
    setIsModalOpen(true);
    setSubmissionStatus("idle");
    setMessage("");
  };

  // Close application modal
  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setSubmissionStatus("idle");
    setMessage("");
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit affiliate application to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmissionStatus("idle");
    setMessage("");

    const fullName = formData.full_name.trim();
    const email = formData.email.trim().toLowerCase();
    const platform = formData.website_or_social.trim();

    // Validate required fields
    if (!fullName || !email || !platform) {
      setSubmissionStatus("error");
      setMessage("Please complete all required fields.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubmissionStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Validate agreement
    if (!formData.agreed_to_terms) {
      setSubmissionStatus("error");
      setMessage("Please agree to the affiliate application terms.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("loading");
    setMessage("Submitting your application. Please wait...");

    try {
      // Prepare application data
      const application = {
        full_name: fullName,
        email: email,
        website_or_social: platform,
        promotion_method: formData.promotion_method || null,
        audience_size: formData.audience_size || null,
        message: formData.message.trim() || null,
        agreed_to_terms: true,
      };

      console.log("Submitting affiliate application...");

      // Save application to Supabase
      // Do not use .select() here because public visitors
      // are not permitted to read application records.
      const { error } = await supabase
        .from("affiliate_applications")
        .insert([application]);

      if (error) {
        console.error("Supabase application error:", error);
        throw error;
      }

      console.log("Affiliate application successfully submitted.");

      // Reset form after successful submission
      setFormData(initialFormData);

      setSubmissionStatus("success");
      setMessage(
        "Thank you for applying to join GhanaConsumer! Your application has been received and is awaiting review. Our team will contact you using the email address you provided."
      );

    } catch (error) {
      console.error("Affiliate application submission failed:", error);

      let errorMessage =
        "We couldn't submit your application. Please try again.";

      if (error?.code === "42P01") {
        errorMessage =
          "The affiliate applications table was not found. Please check your Supabase database setup.";
      } else if (error?.code === "42501") {
        errorMessage =
          "Permission denied. Please check the Supabase Row Level Security policies.";
      } else if (
        error?.message?.toLowerCase().includes("fetch")
      ) {
        errorMessage =
          "Unable to connect to Supabase. Please check your internet connection and Supabase configuration.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setSubmissionStatus("error");
      setMessage(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  // Program benefits
  const benefits = [
    {
      icon: <FiDollarSign />,
      title: "Commission Opportunities",
      description:
        "Explore earning opportunities through approved referrals and promotional activities.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Performance Tracking",
      description:
        "Build your affiliate journey with tools and resources for monitoring your performance.",
    },
    {
      icon: <FiClock />,
      title: "Flexible Promotion",
      description:
        "Promote through your website, blog, social media accounts or other approved channels.",
    },
    {
      icon: <FiShield />,
      title: "Dedicated Support",
      description:
        "Get guidance and assistance from the GhanaConsumer team.",
    },
    {
      icon: <FiPieChart />,
      title: "Marketing Resources",
      description:
        "Access approved promotional materials and campaign information.",
    },
    {
      icon: <FiAward />,
      title: "Growth Opportunities",
      description:
        "Develop your platform and build a meaningful partnership with GhanaConsumer.",
    },
  ];

  // How the program works
  const steps = [
    {
      icon: <FiUsers />,
      title: "Apply to Join",
      description:
        "Complete the application form with your contact details and promotional platform.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Application Review",
      description:
        "Our team reviews your application and contacts you about the next steps.",
    },
    {
      icon: <FiLink />,
      title: "Start Promoting",
      description:
        "Once approved, receive information about your affiliate arrangements and promotional resources.",
    },
  ];

  // Frequently asked questions
  const faqs = [
    {
      question: "Is it free to apply?",
      answer:
        "Yes. Submitting an application to join the GhanaConsumer affiliate program is free.",
    },
    {
      question: "Who can apply?",
      answer:
        "Bloggers, content creators, social media influencers, website owners, businesses and other interested individuals can apply.",
    },
    {
      question: "How long does application review take?",
      answer:
        "Applications are reviewed by our team. We will contact you using the email address provided in your application.",
    },
    {
      question: "When do I start earning commissions?",
      answer:
        "Commission arrangements, eligibility requirements, tracking and payment terms will be communicated after your application is approved.",
    },
    {
      question: "Can I apply without a website?",
      answer:
        "Yes. You can provide your social media profile or another platform where you intend to promote GhanaConsumer.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-emerald-950 py-24 text-white">

        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >

            <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">
              GHANACONSUMER PARTNER PROGRAM
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Grow With Us.
              <span className="block text-green-200">
                Make an Impact.
              </span>
            </h1>

            <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-green-50">
              Partner with GhanaConsumer to connect people with valuable
              consumer information, products and opportunities while
              building your own platform.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openModal}
              className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold text-green-800 shadow-xl transition hover:bg-green-50"
            >
              Become an Affiliate
              <FiArrowRight className="ml-3" />
            </motion.button>

            <p className="mt-5 text-sm text-green-100">
              Free to apply. Applications are subject to review.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-6xl px-5 text-center">

          <span className="font-bold uppercase tracking-widest text-green-700">
            Why Partner With Us?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            An Opportunity to Grow Together
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-600">
            We welcome individuals, content creators and businesses
            who want to build meaningful partnerships with GhanaConsumer.
            Bring your audience, creativity and ideas. Together, we can
            create more value for consumers in Ghana.
          </p>

        </div>

      </section>

      {/* ================= BENEFITS ================= */}

      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-5">

          <div className="mb-14 text-center">

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Affiliate Program Benefits
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Discover the opportunities available when you partner
              with GhanaConsumer.
            </p>

          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {benefits.map((benefit, index) => (

              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl text-green-700">
                  {benefit.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {benefit.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {benefit.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-6xl px-5">

          <div className="mb-14 text-center">

            <h2 className="text-3xl font-extrabold md:text-4xl">
              How It Works
            </h2>

            <p className="mt-4 text-gray-600">
              Three steps to becoming a GhanaConsumer affiliate.
            </p>

          </div>

          <div className="grid gap-10 md:grid-cols-3">

            {steps.map((step, index) => (

              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gray-50 p-8 text-center"
              >

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                  {step.icon}
                </div>

                <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-green-700">
                  Step {index + 1}
                </span>

                <h3 className="mb-3 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {step.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= WHO CAN APPLY ================= */}

      <section className="bg-green-50 py-20">

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">

          <div>

            <span className="font-bold uppercase tracking-widest text-green-700">
              Who Can Join?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Your Platform. Your Audience. Our Partnership.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Whether you have a growing social media community or
              an established digital platform, we welcome applications
              from people interested in working with us.
            </p>

            <ul className="mt-7 space-y-4">

              {[
                "Bloggers and website owners",
                "Social media influencers",
                "YouTubers and content creators",
                "Digital marketing professionals",
                "Businesses and online communities",
              ].map((item) => (

                <li key={item} className="flex items-center gap-3">

                  <FiCheckCircle className="shrink-0 text-xl text-green-600" />

                  <span className="font-medium text-gray-700">
                    {item}
                  </span>

                </li>

              ))}

            </ul>

            <button
              onClick={openModal}
              className="mt-9 inline-flex items-center rounded-lg bg-green-700 px-7 py-3 font-bold text-white transition hover:bg-green-800"
            >
              Apply Today
              <FiArrowRight className="ml-2" />
            </button>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-emerald-950 p-10 text-white shadow-xl">

            <FiGlobe className="mb-7 text-5xl text-green-200" />

            <h3 className="text-3xl font-extrabold">
              Let's Build Something Meaningful.
            </h3>

            <p className="mt-5 leading-8 text-green-50">
              Become part of a growing network of partners committed
              to creating value and connecting with consumers across Ghana.
            </p>

            <div className="mt-8 border-t border-white/20 pt-6">

              <p className="text-sm font-bold uppercase tracking-widest text-green-200">
                GhanaConsumer
              </p>

              <p className="mt-2 text-xl font-bold">
                Partnerships That Create Value.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-4xl px-5">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-extrabold md:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-gray-600">
              Everything you need to know before applying.
            </p>

          </div>

          <div className="space-y-5">

            {faqs.map((faq) => (

              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 p-6"
              >

                <h3 className="flex items-start gap-3 font-bold text-gray-900">

                  <FiCheckCircle className="mt-1 shrink-0 text-green-600" />

                  {faq.question}

                </h3>

                <p className="mt-3 pl-7 leading-7 text-gray-600">
                  {faq.answer}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="bg-green-800 py-20 text-center text-white">

        <div className="mx-auto max-w-3xl px-5">

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Partner With GhanaConsumer?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-green-100">
            Take the first step towards building a meaningful partnership.
            Submit your application today.
          </p>

          <button
            onClick={openModal}
            className="mt-9 inline-flex items-center rounded-full bg-white px-9 py-4 font-bold text-green-800 shadow-lg transition hover:-translate-y-1 hover:bg-green-50"
          >
            Join Our Affiliate Program
            <FiArrowRight className="ml-3" />
          </button>

        </div>

      </section>

      {/* ================= APPLICATION MODAL ================= */}

      <AnimatePresence>

        {isModalOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          >

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-9"
            >

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                aria-label="Close application form"
                className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
              >
                <FiX size={22} />
              </button>

              {/* FORM HEADER */}

              <div className="mb-7 pr-8">

                <span className="text-sm font-bold uppercase tracking-widest text-green-700">
                  GhanaConsumer Partners
                </span>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Affiliate Application
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Tell us about yourself and the platform you intend
                  to use to promote GhanaConsumer.
                </p>

              </div>

              {/* STATUS MESSAGE */}

              {message && (

                <div
                  role="status"
                  aria-live="polite"
                  className={`mb-6 flex items-start gap-3 rounded-lg border p-4 text-sm leading-6 ${
                    submissionStatus === "success"
                      ? "border-green-200 bg-green-50 text-green-800"
                      : submissionStatus === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-blue-200 bg-blue-50 text-blue-800"
                  }`}
                >

                  {submissionStatus === "success" && (
                    <FiCheck className="mt-1 shrink-0 text-lg" />
                  )}

                  {submissionStatus === "error" && (
                    <FiAlertCircle className="mt-1 shrink-0 text-lg" />
                  )}

                  {submissionStatus === "loading" && (
                    <FiLoader className="mt-1 shrink-0 animate-spin text-lg" />
                  )}

                  <span>{message}</span>

                </div>

              )}

              {/* SUCCESS SCREEN */}

              {submissionStatus === "success" ? (

                <div className="py-8 text-center">

                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={45} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Application Received!
                  </h3>

                  <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
                    Thank you for your interest in partnering with
                    GhanaConsumer. Your application has been saved
                    and is awaiting review.
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-8 rounded-lg bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800"
                  >
                    Close
                  </button>

                </div>

              ) : (

                /* APPLICATION FORM */

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* FULL NAME */}

                  <div>

                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="full_name"
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                  {/* WEBSITE OR SOCIAL MEDIA */}

                  <div>

                    <label
                      htmlFor="website_or_social"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Website or Social Media Profile *
                    </label>

                    <input
                      id="website_or_social"
                      type="text"
                      name="website_or_social"
                      value={formData.website_or_social}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      placeholder="https://instagram.com/yourprofile"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Provide your website, social media profile or channel.
                    </p>

                  </div>

                  {/* PROMOTION METHOD */}

                  <div>

                    <label
                      htmlFor="promotion_method"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      How will you promote GhanaConsumer?
                    </label>

                    <select
                      id="promotion_method"
                      name="promotion_method"
                      value={formData.promotion_method}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >

                      <option value="">
                        Select a promotional method
                      </option>

                      <option value="Blog or Website">
                        Blog or Website
                      </option>

                      <option value="Instagram">
                        Instagram
                      </option>

                      <option value="Facebook">
                        Facebook
                      </option>

                      <option value="TikTok">
                        TikTok
                      </option>

                      <option value="YouTube">
                        YouTube
                      </option>

                      <option value="X">
                        X (Twitter)
                      </option>

                      <option value="Email Marketing">
                        Email Marketing
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                  {/* AUDIENCE SIZE */}

                  <div>

                    <label
                      htmlFor="audience_size"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Approximate Audience Size
                    </label>

                    <select
                      id="audience_size"
                      name="audience_size"
                      value={formData.audience_size}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >

                      <option value="">
                        Select audience size
                      </option>

                      <option value="Below 1,000">
                        Below 1,000
                      </option>

                      <option value="1,000 - 5,000">
                        1,000 - 5,000
                      </option>

                      <option value="5,001 - 10,000">
                        5,001 - 10,000
                      </option>

                      <option value="10,001 - 50,000">
                        10,001 - 50,000
                      </option>

                      <option value="50,001 - 100,000">
                        50,001 - 100,000
                      </option>

                      <option value="Above 100,000">
                        Above 100,000
                      </option>

                    </select>

                  </div>

                  {/* ADDITIONAL MESSAGE */}

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Tell Us About Your Platform (Optional)
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      maxLength={1500}
                      placeholder="What kind of content do you create? Who is your audience?"
                      className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                  {/* TERMS */}

                  <div className="rounded-lg bg-gray-50 p-4">

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="checkbox"
                        name="agreed_to_terms"
                        checked={formData.agreed_to_terms}
                        onChange={handleChange}
                        required
                        className="mt-1 h-4 w-4 accent-green-600"
                      />

                      <span className="text-sm leading-6 text-gray-600">
                        I confirm that the information provided is accurate
                        and agree to the GhanaConsumer affiliate application
                        terms and review process.
                      </span>

                    </label>

                  </div>

                  {/* SUBMIT BUTTON */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isSubmitting ? (

                      <>
                        <FiLoader className="animate-spin" />
                        Submitting Application...
                      </>

                    ) : (

                      <>
                        Submit Application
                        <FiSend />
                      </>

                    )}

                  </button>

                  <p className="text-center text-xs leading-5 text-gray-500">
                    Your information will be used by GhanaConsumer
                    to review your affiliate application.
                  </p>

                </form>

              )}

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default Affiliates;
