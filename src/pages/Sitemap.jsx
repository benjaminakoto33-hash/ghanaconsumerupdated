
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShield,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiTag,
  FiDollarSign,
  FiBookOpen,
  FiSend,
  FiLock,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const Sitemap = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const policies = [
    {
      number: "01",
      title: "Clear Front-of-Pack Warning Labels",
      description:
        "Introduce clear, easy-to-understand warning labels on food packaging to help consumers identify foods high in sugar, salt, unhealthy fats, and other harmful ingredients.",
      shortDescription:
        "Help people know what is really in their food.",
      icon: FiTag,
      color: "amber",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      number: "02",
      title: "Restrictions on Unhealthy Food Marketing",
      description:
        "Restrict the marketing and promotion of unhealthy foods, particularly advertising targeted at children, to protect them from harmful food influences.",
      shortDescription:
        "Protect children from unhealthy food marketing.",
      icon: FiShield,
      color: "rose",
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      number: "03",
      title: "Taxes on Unhealthy Foods and Subsidies for Healthy Foods",
      description:
        "Implement taxes on unhealthy foods while providing subsidies and incentives that make nutritious foods more affordable and accessible to everyone.",
      shortDescription:
        "Make nutritious food more affordable and accessible.",
      icon: FiDollarSign,
      color: "emerald",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      number: "04",
      title: "Nutritious Food Standards in Public Institutions",
      description:
        "Establish and enforce nutritious food standards in schools, hospitals, and other public institutions to ensure that healthy food is available where people learn, receive care, and access public services.",
      shortDescription:
        "Ensure healthier meals in schools and public institutions.",
      icon: FiBookOpen,
      color: "blue",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.country.trim()) {
      setError("Please enter your country.");
      return;
    }

    if (!formData.consent) {
      setError("Please confirm your support before signing.");
      return;
    }

    // This confirms the form locally.
    // Connect a backend or petition service to save signatures.
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      country: "",
      city: "",
      consent: false,
    });
    setSubmitted(false);
    setError("");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full border-[40px] border-white" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full border-[40px] border-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-green-100 text-sm font-semibold mb-7">
                <FiHeart className="text-red-300" />
                A HEALTHIER GHANA STARTS WITH US
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
            >
              A CALL FOR
              <span className="block text-green-300">
                HEALTHIER FOOD
              </span>
              ENVIRONMENTS
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-lg md:text-xl text-green-50 leading-relaxed max-w-3xl mx-auto"
            >
              We deserve healthier food choices, and our children
              deserve better. Join us in calling on policymakers,
              government officials, and relevant authorities to
              approve and implement the 4 Double-Duty Food Policies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#sign-petition"
                className="inline-flex justify-center items-center gap-3 px-8 py-4 rounded-xl bg-white text-green-900 font-bold shadow-xl hover:bg-green-50 transition-all hover:-translate-y-1"
              >
               <FiHeart />
                Sign the Petition
                <FiArrowRight />
              </a>

              <a
                href="#our-policies"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Explore the 4 Policies
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-green-100"
            >
              <span className="flex items-center gap-2">
                <FiShield /> Protect Our Health
              </span>
              <span className="flex items-center gap-2">
                <FiUsers /> Protect Our Children
              </span>
              <span className="flex items-center gap-2">
                <FiGlobe /> Protect Our Future
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CAMPAIGN INTRODUCTION */}
      <section className="py-16 md:py-20 px-5">
        <div className="max-w-5xl mx-auto text-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Our Call. Our Health. Our Future.
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
              Everyone Deserves Access to
              <span className="text-green-700"> Healthy Food</span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              We believe everyone deserves access to nutritious,
              affordable food and the right to make informed food
              choices. Our food environments should promote good
              health, prevent diet-related diseases, and protect
              the well-being of our communities, especially children.
            </p>

            <p className="mt-5 text-gray-700 font-semibold text-lg">
              We therefore call for the approval and implementation
              of the following four policies.
            </p>
          </motion.div>

        </div>
      </section>

      {/* FOUR POLICY CARDS */}
      <section
        id="our-policies"
        className="py-16 md:py-20 bg-gray-50 px-5 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-green-700">
              The Four Double-Duty Food Policies
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
              Four Policies. One Healthier Future.
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              These four policy actions can help create healthier
              food environments and make nutritious food choices
              more accessible to everyone.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {policies.map((policy) => {
              const Icon = policy.icon;

              return (
                <motion.article
                  key={policy.number}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl p-7 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">

                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl ${policy.bg} flex items-center justify-center`}>
                        <Icon className={`text-2xl ${policy.iconColor}`} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <span className="text-xs font-extrabold tracking-widest text-green-700">
                        POLICY {policy.number}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-gray-900 leading-snug">
                        {policy.title}
                      </h3>

                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {policy.description}
                      </p>

                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-green-800 flex items-start gap-2">
                          <FiCheckCircle className="mt-0.5 flex-shrink-0" />
                          {policy.shortDescription}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:block text-3xl font-black text-gray-100 group-hover:text-green-100 transition-colors">
                      {policy.number}
                    </span>

                  </div>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* PETITION CALL TO ACTION */}
      <section className="py-16 px-5 bg-green-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <FiHeart className="text-3xl text-green-300" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            IT'S TIME TO TAKE ACTION!
          </h2>

          <p className="mt-6 text-lg md:text-xl text-green-100 leading-relaxed max-w-3xl mx-auto">
            Our health matters. Our future matters! A healthier Ghana
            starts with the food we eat and the choices we make every day.
          </p>

          <p className="mt-5 text-xl md:text-2xl font-extrabold text-white">
            APPROVE THE 4 DOUBLE-DUTY FOOD POLICIES NOW!
          </p>

          <a
            href="#sign-petition"
            className="inline-flex items-center gap-3 mt-8 px-9 py-4 rounded-xl bg-white text-green-900 font-bold hover:bg-green-100 transition-all shadow-lg"
          >
            Add Your Voice
            <FiArrowRight />
          </a>
        </motion.div>
      </section>

      {/* PETITION FORM */}
      <section
        id="sign-petition"
        className="py-20 px-5 bg-gray-50 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-green-700">
              <FiUsers />
              Make Your Voice Count
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
              Sign the Petition
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Join us in calling for healthier food environments.
              Complete the form below to add your voice to the campaign.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* FORM INFORMATION */}
            <div className="lg:col-span-2 bg-green-900 text-white rounded-2xl p-8 shadow-lg">

              <span className="text-sm uppercase tracking-widest text-green-300 font-bold">
                Your Voice Matters
              </span>

              <h3 className="mt-4 text-3xl font-extrabold leading-tight">
                Be Part of the Change.
              </h3>

              <p className="mt-5 text-green-100 leading-relaxed">
                By signing this petition, you express your support
                for the approval and implementation of the four
                Double-Duty Food Policies.
              </p>

              <div className="mt-9 space-y-6">

                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                    <FiShield className="text-xl text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">Your Privacy Matters</h4>
                    <p className="text-sm text-green-100 mt-1">
                      Your personal information should not be
                      publicly displayed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                    <FiUsers className="text-xl text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">Stand Together</h4>
                    <p className="text-sm text-green-100 mt-1">
                      Add your voice to the call for healthier
                      food environments.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 flex-shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                    <FiHeart className="text-xl text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">Protect Our Future</h4>
                    <p className="text-sm text-green-100 mt-1">
                      Support healthier choices for present and
                      future generations.
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-10 pt-7 border-t border-white/20">
                <p className="font-extrabold text-lg">
                  HEALTHIER FOOD.
                </p>
                <p className="font-extrabold text-lg">
                  HEALTHIER PEOPLE.
                </p>
                <p className="font-extrabold text-lg text-green-300">
                  HEALTHIER FUTURE.
                </p>
              </div>

            </div>

            {/* SIGNATURE FORM */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-7 md:p-10 shadow-sm border border-gray-200">

              <AnimatePresence mode="wait">

                {submitted ? (

                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <FiCheck className="text-4xl text-green-700" />
                    </div>

                    <h3 className="mt-6 text-2xl font-extrabold text-gray-900">
                      Thank You for Your Support!
                    </h3>

                    <p className="mt-4 text-gray-600 leading-relaxed max-w-md mx-auto">
                      Your petition form has been completed successfully.
                      Your support for healthier food environments matters.
                    </p>

                    <p className="mt-5 text-green-800 font-bold">
                      APPROVE THE 4 DOUBLE-DUTY FOOD POLICIES!
                    </p>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-8 px-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition"
                    >
                      Return to Form
                    </button>

                    <p className="mt-5 text-xs text-gray-400">
                      This is a local confirmation only. Your signature
                      has not been transmitted or stored.
                    </p>
                  </motion.div>

                ) : (

                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >

                    <div className="mb-8">
                      <h3 className="text-2xl font-extrabold text-gray-900">
                        Petition Sign-Up Form
                      </h3>

                      <p className="text-gray-500 text-sm mt-2">
                        Please provide your details below.
                        Fields marked with * are required.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                      {/* FULL NAME */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                        />
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>

                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      {/* COUNTRY */}
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Country *
                        </label>

                        <div className="relative">
                          <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            id="country"
                            name="country"
                            type="text"
                            autoComplete="country-name"
                            placeholder="Enter your country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      {/* CITY / REGION */}
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          City / Region
                          <span className="font-normal text-gray-400 ml-2">
                            (Optional)
                          </span>
                        </label>

                        <div className="relative">
                          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            id="city"
                            name="city"
                            type="text"
                            autoComplete="address-level1"
                            placeholder="Enter your city or region"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      {/* DECLARATION */}
                      <div className="p-5 rounded-xl bg-green-50 border border-green-100">

                        <label className="flex items-start gap-3 cursor-pointer">

                          <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                            className="mt-1 w-5 h-5 accent-green-700 flex-shrink-0 cursor-pointer"
                          />

                          <span className="text-sm text-gray-700 leading-relaxed">
                            I support the approval and implementation
                            of the 4 Double-Duty Food Policies outlined
                            in this petition.
                            <span className="text-red-600 ml-1">*</span>
                          </span>

                        </label>
                      </div>

                      {/* PRIVACY */}
                      <div className="flex items-start gap-3 text-sm text-gray-500">
                        <FiLock className="text-green-700 text-lg flex-shrink-0 mt-0.5" />

                        <p className="leading-relaxed">
                          By signing, you consent to your information
                          being used for the purposes of recording and
                          presenting petition support. Your personal
                          information should not be publicly displayed.
                        </p>
                      </div>

                      {/* ERROR MESSAGE */}
                      {error && (
                        <div
                          role="alert"
                          className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                        >
                          <FiAlertCircle className="flex-shrink-0" />
                          {error}
                        </div>
                      )}

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-green-700 text-white font-bold text-lg shadow-lg hover:bg-green-800 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200"
                      >
                        <FiSend />
                        Sign the Petition
                        <FiArrowRight />
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        Every voice matters. Thank you for standing
                        for healthier food environments.
                      </p>

                    </form>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* FINAL CAMPAIGN MESSAGE */}
      <section className="py-20 px-5 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-green-700 font-bold uppercase tracking-widest text-sm">
            <FiHeart />
            Our Health. Our Future.
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Protect Our Food.
            <span className="block text-green-700">
              Protect Our People.
            </span>
            Protect Ghana's Future.
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A Greater Ghana begins with healthy food. These policies
            protect our health, prevent diet-related diseases, and
            build a stronger generation.
          </p>

          <div className="mt-10 p-8 md:p-12 rounded-2xl bg-green-950 text-white shadow-xl">
            <h3 className="text-2xl md:text-4xl font-black leading-tight">
              HEALTHIER FOOD.
              <span className="block text-green-300">
                HEALTHIER PEOPLE.
              </span>
              <span className="block">
                HEALTHIER FUTURE.
              </span>
            </h3>

            <p className="mt-6 text-green-100 text-lg font-semibold">
              APPROVE THE 4 DOUBLE-DUTY FOOD POLICIES TODAY!
            </p>

            <a
              href="#sign-petition"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-xl bg-white text-green-950 font-bold hover:bg-green-100 transition-all"
            >
              Sign the Petition
              <FiArrowRight />
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 py-8 px-5">
        <div className="max-w-7xl mx-auto text-center">

          <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
            <FiHeart className="text-green-400" />
            HEALTHIER FOOD. HEALTHIER PEOPLE.
          </div>

          <p className="mt-3 text-sm">
            A healthier future starts with healthier food environments.
          </p>

          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} | Protect Our Food,
            Protect Our People, Protect Ghana's Future.
          </p>

        </div>
      </footer>

    </main>
  );
};

// Retained original default export
export default Sitemap;
