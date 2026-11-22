
import React from 'react';
import {
  FiShield,
  FiBookOpen,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';

import CallToAction from '../components/CallToAction';

const values = [
  {
    icon: FiShield,
    title: 'Consumer Protection',
    description:
      'We promote awareness of consumer rights and encourage fair, responsible business practices.',
  },
  {
    icon: FiBookOpen,
    title: 'Reliable Information',
    description:
      'We share useful information, product insights, reviews, and practical guides to support better decisions.',
  },
  {
    icon: FiUsers,
    title: 'Community Empowerment',
    description:
      'We encourage consumers to share experiences, exchange knowledge, and learn from one another.',
  },
];

const focusAreas = [
  'Product and service reviews',
  'Local and international brand comparisons',
  'Consumer rights and responsibilities',
  'Pricing trends and smart shopping tips',
  'Consumer protection news and updates',
];

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-gray-950 px-6 py-20 text-white sm:py-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-green-100">
            About GhanaConsumer
          </span>

          <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Empowering Consumers.
            <span className="mt-2 block text-green-300">
              Building Trust.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-200 sm:text-lg">
            Your trusted destination for consumer information, product
            insights, reviews, and advocacy in Ghana. We help everyday
            consumers make informed decisions with greater confidence.
          </p>
        </div>
      </section>

      {/* Main Introduction */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
              A smarter way to navigate the marketplace.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-600 dark:text-gray-300">
              <p>
                Welcome to{' '}
                <strong className="text-gray-900 dark:text-white">
                  GhanaConsumer
                </strong>
                , a platform created to help consumers access useful
                information about the products and services they use every day.
              </p>

              <p>
                We believe that people should have access to clear,
                understandable information before making purchasing
                decisions. From product reviews and brand comparisons to
                consumer rights and marketplace updates, our goal is to make
                information easier to find and understand.
              </p>

              <p>
                We also believe that consumer voices matter. By sharing
                experiences, knowledge, and feedback, we can encourage
                awareness and contribute to a more informed consumer
                community in Ghana.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <FiShield size={28} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h3>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
              To empower consumers in Ghana through accessible information,
              practical knowledge, and meaningful engagement, helping them
              make informed choices and understand their rights.
            </p>

            <div className="mt-7 border-t border-gray-100 pt-6 dark:border-gray-800">
              <p className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                Our guiding belief
              </p>
              <p className="mt-2 text-lg font-semibold italic text-gray-800 dark:text-gray-100">
                An informed consumer is an empowered consumer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white px-6 py-16 dark:bg-gray-900 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              What Drives Us
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              What We Stand For
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              Our work is guided by three important principles that shape
              the information and community we aim to build.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-green-800"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
              Explore Our Platform
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Information that helps you make better choices.
            </h2>

            <p className="mt-5 leading-8 text-gray-600 dark:text-gray-300">
              We focus on topics that matter to consumers, helping make
              everyday shopping decisions more informed and straightforward.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-9">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              What You Can Find Here
            </h3>

            <ul className="mt-6 space-y-5">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <FiCheckCircle
                    className="mt-1 shrink-0 text-green-600 dark:text-green-400"
                    size={19}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-green-50 px-6 py-16 dark:bg-green-950/20 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
            <FiUsers size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Your Voice Matters
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600 dark:text-gray-300">
            GhanaConsumer is more than an information platform. It is an
            opportunity for consumers to learn, share experiences, ask
            questions, and contribute to a stronger consumer culture.
            Your feedback and participation help make that possible.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <CallToAction />
        </div>
      </section>
    </main>
  );
}
