
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiMail,
  FiUsers,
  FiBook,
  FiDollarSign,
  FiShield,
  FiHelpCircle,
  FiThumbsUp,
  FiStar,
  FiMessageSquare,
  FiUser,
  FiX,
  FiArrowRight,
  FiCheckCircle,
  FiShare2,
  FiRefreshCw,
} from "react-icons/fi";

const categories = [
  { id: "all", name: "All Questions", icon: FiHelpCircle },
  { id: "general", name: "General", icon: FiUsers },
  { id: "account", name: "Account & Profile", icon: FiUser },
  { id: "content", name: "Content & Contributions", icon: FiBook },
  { id: "financial", name: "Financial", icon: FiDollarSign },
  { id: "safety", name: "Safety & Privacy", icon: FiShield },
];

const faqs = [
  {
    id: "what-is-ghana-consumer",
    question: "What is Ghana Consumer and how does it help Ghanaian shoppers?",
    answer:
      "Ghana Consumer is a consumer information platform designed to help people in Ghana make more informed decisions when buying products and using services. The platform aims to provide useful consumer information, educational resources, shopping guidance and practical tips.",
    category: "general",
    helpful: 42,
    featured: true,
  },
  {
    id: "contact-support",
    question: "How do I contact Ghana Consumer for support or inquiries?",
    answer:
      "You can contact the Ghana Consumer team through the official Contact Us page or the support email address published on the website. When contacting the team, explain your question clearly and include any relevant details. Do not send passwords, payment PINs or other sensitive account information.",
    category: "general",
    helpful: 28,
  },
  {
    id: "contribute-content",
    question: "Can I contribute content, reviews or articles to Ghana Consumer?",
    answer:
      "We welcome useful ideas and contributions that can help consumers. Depending on the available submission facilities, you may be able to suggest DIY guides, share consumer experiences, contribute educational articles or submit product reviews. Contributions should be honest, relevant and based on genuine experience. Submissions may be reviewed before publication.",
    category: "content",
    helpful: 35,
  },
  {
    id: "free-to-use",
    question: "Is Ghana Consumer free to use?",
    answer:
      "You can browse the publicly available information on the website without paying a subscription unless a particular service clearly states otherwise. If the platform introduces paid services, fees and applicable conditions should be explained before you use them.",
    category: "financial",
    helpful: 56,
    featured: true,
  },
  {
    id: "create-account",
    question: "How do I create an account and what are the benefits?",
    answer:
      "If account registration is available, use the Sign Up option on the website and follow the registration instructions. Depending on the features enabled, an account may allow you to manage your profile, save useful information or participate in community activities. Only provide information requested through the official website.",
    category: "account",
    helpful: 31,
  },
  {
    id: "review-accuracy",
    question: "How does Ghana Consumer ensure the accuracy of product reviews?",
    answer:
      "Product information and reviews should be assessed carefully before publication. Useful review standards include checking the source of information, distinguishing personal opinions from verified facts, identifying sponsored content and correcting errors when reliable new information becomes available. Readers should also check product specifications and seller information before making a purchase.",
    category: "safety",
    helpful: 47,
  },
  {
    id: "consumer-rights",
    question: "What should I do if I have a consumer rights issue in Ghana?",
    answer:
      "Start by keeping your receipt, order confirmation, photographs and communication with the seller. Contact the business and clearly explain the problem and the resolution you want. If the issue remains unresolved, consider contacting the relevant consumer protection or regulatory authority in Ghana. Keep copies of all reports and responses.",
    category: "safety",
    helpful: 39,
    featured: true,
  },
  {
    id: "price-updates",
    question: "How often is price information updated?",
    answer:
      "Prices can change frequently depending on the retailer, location, availability and market conditions. Always check the retailer's current price before making a purchase. Where price information is displayed on Ghana Consumer, check its stated update date and any conditions attached to the listing.",
    category: "general",
    helpful: 27,
  },
  {
    id: "regional-coverage",
    question: "Does Ghana Consumer cover products and services across all regions of Ghana?",
    answer:
      "Ghana Consumer aims to provide information relevant to consumers throughout Ghana. However, the availability of products, services and local information can differ from one region to another. Always confirm availability, delivery options and prices directly with the relevant business.",
    category: "general",
    helpful: 22,
  },
  {
    id: "business-partnerships",
    question: "How can businesses partner with Ghana Consumer?",
    answer:
      "Businesses interested in working with Ghana Consumer can use the official contact channel to introduce their organisation and explain the proposed partnership. Any advertising, sponsored content or commercial relationship should be clearly identified so consumers can distinguish promotional material from independent information.",
    category: "content",
    helpful: 19,
  },
  {
    id: "saved-information",
    question: "Can I save questions or information for later?",
    answer:
      "You can use your browser's bookmark feature to save the FAQ page. If a personal account and saved-content feature are introduced, follow the instructions provided on the website. Browser bookmarks are stored by your browser and may not appear on other devices.",
    category: "account",
    helpful: 16,
  },
  {
    id: "report-wrong-information",
    question: "What should I do if I find incorrect information on the website?",
    answer:
      "Please contact the website team through the official contact channel. Include the page address, explain what appears incorrect and, where possible, provide a reliable source that helps clarify the issue. This makes it easier for the team to review the information.",
    category: "safety",
    helpful: 24,
  },
];

const readHelpfulVotes = () => {
  try {
    return JSON.parse(localStorage.getItem("ghanaConsumerFAQHelpful")) || [];
  } catch {
    return [];
  }
};

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState(readHelpfulVotes);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "ghanaConsumerFAQHelpful",
      JSON.stringify(helpfulVotes)
    );
  }, [helpfulVotes]);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredFaqs = filteredFaqs.filter((faq) => faq.featured);
  const regularFaqs = filteredFaqs.filter((faq) => !faq.featured);

  const toggleFAQ = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const toggleHelpful = (id) => {
    setHelpfulVotes((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setNotice(
      helpfulVotes.includes(id)
        ? "Your helpful vote has been removed."
        : "Thank you for your feedback!"
    );

    setTimeout(() => setNotice(""), 2500);
  };

  const shareFAQ = async (faq) => {
    const shareData = {
      title: faq.question,
      text: faq.answer,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${faq.question}\n\n${faq.answer}\n\n${window.location.href}`
        );
        setNotice("Question and answer copied successfully.");
        setTimeout(() => setNotice(""), 2500);
      } else {
        setNotice("Sharing is not supported by this browser.");
        setTimeout(() => setNotice(""), 2500);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setNotice("Unable to share this question right now.");
        setTimeout(() => setNotice(""), 2500);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setOpenId(null);
  };

  const contactEmail = "support@ghanaconsumer.com";

  const openSupportEmail = () => {
    const subject = encodeURIComponent("Ghana Consumer Support Request");
    const body = encodeURIComponent(
      "Hello Ghana Consumer Team,\n\nI need assistance with the following:\n\n"
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const FAQCard = ({ faq, featured = false }) => {
    const isOpen = openId === faq.id;
    const hasVoted = helpfulVotes.includes(faq.id);
    const totalHelpful = faq.helpful + (hasVoted ? 1 : 0);

    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`overflow-hidden rounded-2xl border transition ${
          featured
            ? "border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm"
            : "border-slate-200 bg-white shadow-sm hover:shadow-md"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFAQ(faq.id)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
          className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
        >
          <div className="flex min-w-0 items-start gap-3">
            {featured && (
              <span className="mt-1 shrink-0 text-amber-500">
                <FiStar />
              </span>
            )}

            <span className="font-semibold leading-7 text-slate-900">
              {faq.question}
            </span>
          </div>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="shrink-0 text-slate-500"
          >
            <FiChevronDown className="text-xl" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${faq.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {faq.answer}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => toggleHelpful(faq.id)}
                      aria-pressed={hasVoted}
                      className={`inline-flex items-center gap-2 text-sm font-medium transition ${
                        hasVoted
                          ? "text-green-700"
                          : "text-slate-500 hover:text-green-700"
                      }`}
                    >
                      <FiThumbsUp />
                      {hasVoted ? "Helpful" : "Was this helpful?"}
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {totalHelpful}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => shareFAQ(faq)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-amber-700"
                    >
                      <FiShare2 /> Share
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <FiCheckCircle /> Answer available
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-green-50 px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/20">
            <FiHelpCircle className="text-3xl" />
          </div>

          <span className="inline-flex rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            Help Centre · Ghana Consumer
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Frequently Asked
            <span className="mt-2 block bg-gradient-to-r from-amber-600 via-green-700 to-red-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find helpful information about Ghana Consumer, our resources,
            consumer awareness and how to get support.
          </p>
        </motion.header>
      </section>

      {/* Search */}
      <section className="relative z-10 mx-auto -mt-5 max-w-5xl px-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg sm:p-7">
          <label
            htmlFor="faq-search"
            className="mb-3 block text-sm font-bold text-slate-800"
          >
            What would you like to know?
          </label>

          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
            <input
              id="faq-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, topics or answers..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-700">
                Browse by category
              </p>
              <p className="text-xs text-slate-500">
                {filteredFaqs.length} questions found
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenId(null);
                    }}
                    aria-pressed={active}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-amber-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Icon />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-10">
            {featuredFaqs.length > 0 && (
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <FiStar />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      Popular Questions
                    </h2>
                    <p className="text-sm text-slate-500">
                      Answers to some of the most important questions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {featuredFaqs.map((faq) => (
                    <FAQCard key={faq.id} faq={faq} featured />
                  ))}
                </div>
              </section>
            )}

            {regularFaqs.length > 0 && (
              <section>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {activeCategory === "all" && !searchQuery
                      ? "All Questions"
                      : "More Answers"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Browse the answers below to find what you need.
                  </p>
                </div>

                <div className="space-y-4">
                  {regularFaqs.map((faq) => (
                    <FAQCard key={faq.id} faq={faq} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FiSearch className="text-2xl" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              No questions found
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find an answer matching your search. Try different
              words or browse another category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-700"
            >
              <FiRefreshCw /> Clear filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Contact support */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 to-green-600 px-6 py-12 text-center text-white shadow-xl sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <FiMessageSquare className="text-2xl" />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
            Still need help?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-green-50">
            Can't find the answer you're looking for? Get in touch with the
            Ghana Consumer team through our official support channel.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openSupportEmail}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-green-700 transition hover:bg-green-50"
            >
              <FiMail /> Contact Support
            </button>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 font-bold text-white transition hover:bg-white hover:text-green-700"
            >
              Visit Contact Page <FiArrowRight />
            </a>
          </div>

          <p className="mt-5 text-xs text-green-100">
            Support email: {contactEmail}
          </p>
        </div>
      </section>

      {/* Notification */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            role="status"
            className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default FAQ;
